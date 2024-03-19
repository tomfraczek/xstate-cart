import { itemMachine } from '@/app/machine/itemMachine';
import { ActorRefFrom } from 'xstate';
import { CartItem } from '@/app/components/cartItem';

type CartFormProps = {
  itemsSend: (
    event:
      | { type: 'ITEMS.ADD'; name: string; price: string; shipping: boolean }
      | { type: 'NEW_ITEM.CHANGE_NAME'; name: string }
      | { type: 'NEW_ITEM.CHANGE_PRICE'; price: string }
      | { type: 'NEW_ITEM.CHANGE_SHIPPING'; shipping: boolean }
      | { type: 'ITEM.REMOVE'; index: number }
  ) => void;
  appSend: (event: { type: string }) => void;
  itemsState: {
    newItemName: string;
    newItemPrice: string;
    newItemShipping: boolean;
    items: ActorRefFrom<typeof itemMachine>[];
  };
};

export const CartForm = ({ itemsState, itemsSend, appSend }: CartFormProps) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { newItemName, newItemPrice, newItemShipping } = itemsState;

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

  return (
    <div>
      <form className='form mb-10' onSubmit={(event) => handleSubmit(event)}>
        <input
          value={itemsState.newItemName}
          onChange={(event) => itemsSend({ type: 'NEW_ITEM.CHANGE_NAME', name: event.target.value })}
          placeholder='Item name'
        />
        <input
          value={itemsState.newItemPrice}
          type='number'
          min='1'
          onChange={(event) => itemsSend({ type: 'NEW_ITEM.CHANGE_PRICE', price: event.target.value })}
          placeholder='Item price'
        />
        <div className='flex items-center'>
          <label className='mr-2'>Shipping required?</label>
          <input
            checked={itemsState.newItemShipping}
            type='checkbox'
            onChange={(event) => itemsSend({ type: 'NEW_ITEM.CHANGE_SHIPPING', shipping: event.target.checked })}
          />
        </div>
        <button>Add item</button>
      </form>

      <table className='itemsTable w-full'>
        <tbody>
          {itemsState.items.map((item, index) => {
            return <CartItem key={item.id} itemRef={item} onRemove={() => itemsSend({ type: 'ITEM.REMOVE', index })} />;
          })}
        </tbody>
      </table>
      {itemsState.items.length > 0 && (
        <div className='flex flex-col items-end justify-end'>
          <button className='bg-blue-500 text-white border-transparent' onClick={() => appSend({ type: 'address' })}>
            Continue
          </button>
        </div>
      )}
    </div>
  );
};
