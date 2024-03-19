'use client';
import { CartItem } from '@/app/components/cartItem';
import { itemsMachine } from '@/app/machine/itemsMachine';
import { useMachine } from '@xstate/react';
import { appMachine } from '@/app/machine/appMachine';

export const Cart = () => {
  const [itemsState, itemsSend] = useMachine(itemsMachine);
  const [current, send] = useMachine(appMachine);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { newItemName, newItemPrice, newItemShipping } = itemsState.context;

    // Validation for name
    if (!newItemName || newItemName.trim().length === 0 || newItemName.length > 20) {
      alert('Please enter a valid item name (up to 20 characters).');
      return;
    }

    // Validation for price
    const parsedPrice = parseFloat(newItemPrice);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      alert('Please enter a valid positive price.');
      return;
    }

    // All validations passed, proceed with adding the item
    itemsSend({
      type: 'ITEMS.ADD',
      name: newItemName,
      price: parsedPrice.toString(),
      shipping: newItemShipping,
    });
  };

  const renderComponent = (current: any) => {
    switch (current.value) {
      case 'cart':
        return (
          <div>
            <form className='newItem mb-10' onSubmit={(event) => handleSubmit(event)}>
              <input
                value={itemsState.context.newItemName}
                onChange={(event) => itemsSend({ type: 'NEW_ITEM.CHANGE_NAME', name: event.target.value })}
                placeholder='Item name'
              />
              <input
                value={itemsState.context.newItemPrice}
                type='number'
                min='1'
                onChange={(event) => itemsSend({ type: 'NEW_ITEM.CHANGE_PRICE', price: event.target.value })}
                placeholder='Item price'
              />
              <div className='flex items-center'>
                <label className='mr-2'>Shipping required?</label>
                <input
                  checked={itemsState.context.newItemShipping}
                  type='checkbox'
                  onChange={(event) => itemsSend({ type: 'NEW_ITEM.CHANGE_SHIPPING', shipping: event.target.checked })}
                />
              </div>
              <button>Add item</button>
            </form>

            <table className='itemsTable w-full'>
              <tbody>
                {itemsState.context.items.map((item, index) => {
                  return (
                    <CartItem key={item.id} itemRef={item} onRemove={() => itemsSend({ type: 'ITEM.REMOVE', index })} />
                  );
                })}
              </tbody>
            </table>
            {itemsState.context.items.length > 0 && (
              <div className='flex flex-col items-end justify-end'>
                <p>Next step: Shipping Address</p>
                <button onClick={() => send({ type: 'address' })}>Next</button>
              </div>
            )}
          </div>
        );
      case 'addressed':
        return <p>address</p>;
      default:
        return null;
    }
  };

  return <div className='w-full'>{renderComponent(current)}</div>;
};
