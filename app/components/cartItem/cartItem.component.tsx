import { itemMachine } from '@/app/machine/itemMachine';
import { ActorRefFrom } from 'xstate';
import { useSelector } from '@xstate/react';

type CartItemProps = {
  itemRef: ActorRefFrom<typeof itemMachine>;
  onRemove: () => void;
};

export const CartItem = ({ itemRef, onRemove }: CartItemProps) => {
  const state = useSelector(itemRef, (s) => s);
  const { name, price, shipping } = state.context;
  return (
    <tr
      className='flex items-center justify-between w-full border-b mb-2 pb-2'
      style={{
        opacity: state.matches('saving') ? 0.5 : 1,
      }}
    >
      <td width='100%'>
        <div>
          <p>
            Name: <strong>{name}</strong>
          </p>
          <p>
            Price: <strong>${price}</strong>
          </p>
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

            itemRef.send({ type: 'SAVE' });
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
                  itemRef.send({ type: 'SET_NAME', value: event.target.value });
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
                  itemRef.send({ type: 'SET_PRICE', value: event.target.value });
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
                  itemRef.send({ type: 'SET_SHIPPING', value: event.target.checked });
                }}
              />
            </div>
          </label>
        </form>
      </td>
      <td className='actionsCell'>
        <div className='actions'>
          {state.hasTag('form') && (
            <>
              <button
                disabled={state.hasTag('saving')}
                onClick={() => {
                  itemRef.send({ type: 'SAVE' });
                }}
              >
                Save
              </button>
              <button onClick={() => itemRef.send({ type: 'CANCEL' })} type='button'>
                Cancel
              </button>
            </>
          )}
          {state.hasTag('read') && (
            <>
              <button onClick={() => itemRef.send({ type: 'EDIT' })}>Edit</button>
              <button className='remove' onClick={onRemove}>
                Remove
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};
