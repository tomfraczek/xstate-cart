import { itemMachine } from '@/app/machine/itemMachine';
import { ActorRefFrom } from 'xstate';
import { useSelector } from '@xstate/react';

type CartItemProps = {
  itemRef: ActorRefFrom<typeof itemMachine>;
  index?: number;
  onRemove?: () => void;
};

export const CartItem = ({ itemRef, index, onRemove }: CartItemProps) => {
  const state = useSelector(itemRef, (s) => s);
  const { name, price, shipping } = state.context;
  return (
    <tr
      className={`${
        index && (index + 1) % 2 === 0 ? 'bg-gray-100' : 'bg-white'
      } flex items-baseline justify-between w-full border-b p-5`}
      style={{
        opacity: state.matches('saving') ? 0.5 : 1,
      }}
    >
      <td width='100%'>
        <div>
          <div className='flex items-center justify-between'>
            <p>
              Name: <strong>{name}</strong>
            </p>
            <p>
              Price: <strong>${price}</strong>
            </p>
          </div>
          <p>
            Shipping required:
            <strong> {shipping ? 'yes' : 'no'}</strong>
          </p>
        </div>

        <form
          className='itemForm'
          hidden={!state.hasTag('form')}
          onSubmit={(event) => {
            event.preventDefault();

            itemRef.send({ type: 'save' });
          }}
        >
          <label className='field' htmlFor='item.name'>
            <div className='flex items-center'>
              <label className='mr-2'>Name</label>
              <input
                type='text'
                id='item.name'
                value={name}
                onChange={(event) => {
                  itemRef.send({ type: 'set.name', value: event.target.value });
                }}
              />
            </div>
            <div className='flex items-center'>
              <label className='mr-2'>Price</label>
              <input
                type='number'
                min={1}
                id='item.price'
                value={price}
                onChange={(event) => {
                  itemRef.send({ type: 'set.price', value: event.target.value });
                }}
              />
            </div>
            <div className='flex items-center'>
              <label className='mr-2'>Shipping required?</label>
              <input
                type='checkbox'
                id='item.shipping'
                checked={shipping}
                onChange={(event) => {
                  itemRef.send({ type: 'set.shipping', value: event.target.checked });
                }}
              />
            </div>
          </label>
        </form>
      </td>
      {state.hasTag('form') && (
        <td className='actionsCell ml-4'>
          <div className='actions'>
            <>
              <button
                disabled={state.hasTag('saving')}
                onClick={() => {
                  itemRef.send({ type: 'save' });
                }}
              >
                Save
              </button>
              <button onClick={() => itemRef.send({ type: 'cancel' })} type='button'>
                Cancel
              </button>
            </>
            {state.hasTag('read') && onRemove && (
              <>
                <button onClick={() => itemRef.send({ type: 'edit' })}>Edit</button>
                <button className='remove' onClick={onRemove}>
                  Remove
                </button>
              </>
            )}
          </div>
        </td>
      )}
    </tr>
  );
};
