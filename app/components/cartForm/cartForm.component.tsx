import { itemMachine } from '@/app/machine/itemMachine';
import { ActorRefFrom } from 'xstate';
import { CartItem } from '@/app/components/cartItem';
import { ItemsEvent } from '@/app/machine/itemsMachine';

type CartFormProps = {
  itemsSend: (event: ItemsEvent) => void;
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
      type: 'items.add',
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
          onChange={(event) => itemsSend({ type: 'new_item.change_name', name: event.target.value })}
          placeholder='Item name'
        />
        <input
          value={itemsState.newItemPrice}
          type='number'
          step='any'
          min='1'
          onChange={(event) => itemsSend({ type: 'new_item.change_price', price: event.target.value })}
          placeholder='Item price'
        />
        <div className='flex items-center'>
          <label className='mr-2'>Shipping required?</label>
          <input
            checked={itemsState.newItemShipping}
            type='checkbox'
            onChange={(event) => itemsSend({ type: 'new_item.change_shipping', shipping: event.target.checked })}
          />
        </div>
        <button>Add item</button>
      </form>

      <table className='itemsTable w-full'>
        <tbody className='tableBody'>
          {itemsState.items.map((item, index) => (
            <CartItem
              key={item.id}
              index={index}
              itemRef={item}
              onRemove={() => itemsSend({ type: 'item.remove', index })}
            />
          ))}
        </tbody>
      </table>

      {itemsState.items.length > 0 && (
        <div className='flex flex-col items-end justify-end mt-6'>
          <button className='bg-blue-500 text-white border-transparent' onClick={() => appSend({ type: 'address' })}>
            Continue
          </button>
        </div>
      )}
    </div>
  );
};
