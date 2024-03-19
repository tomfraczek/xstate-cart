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
      style={{
        opacity: state.matches('saving') ? 0.5 : 1,
      }}
    >
      <td width='100%'>
        <strong>{name}</strong>
        <strong>{price}</strong>
        <strong>{shipping ? 'yes' : 'no'}</strong>
        <form
          className='itemForm'
          hidden={!state.hasTag('form')}
          onSubmit={(event) => {
            event.preventDefault();

            itemRef.send({ type: 'SAVE' });
          }}
        >
          <label className='field' htmlFor='item.name'>
            <div className='label'>Name</div>
            <input
              type='text'
              id='item.name'
              value={state.context.name}
              onChange={(event) => {
                itemRef.send({ type: 'SET_NAME', value: event.target.value });
              }}
            />
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
