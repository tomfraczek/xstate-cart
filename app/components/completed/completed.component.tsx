import { itemMachine } from '@/app/machine/itemMachine';
import { ItemsContext } from '@/app/machine/itemsMachine';
import { ContextType, EventType } from '@/app/machine/shippingMachine';

import { useSelector } from '@xstate/react';
import { ActorRefFrom } from 'xstate';
import { CartItem } from '../cartItem';

type PaymentFormProps = {
  shippingState: ContextType;
  itemsState: ItemsContext;
  appSend: (event: { type: string }) => void;
};
export const Completed = ({ itemsState, shippingState, appSend }: PaymentFormProps) => {
  console.log(shippingState);
  const { city, country, payment, shipping, street } = shippingState;

  return (
    <div className='mb-32'>
      <h2 className='text-xl text-center mb-4'>Cart Summary</h2>
      <table className='itemsTable w-full'>
        <tbody>
          {itemsState.items.map((item, i) => (
            <CartItem key={i} index={i} itemRef={item} />
          ))}
        </tbody>
      </table>

      <h2 className='text-xl text-center mb-4 mt-14'>Shipping Summary</h2>
      <table className='itemsTable w-full'>
        <tbody>
          <tr className='flex items-baseline justify-between w-full border-b p-5 bg-gray-100'>
            <td width='100%'>
              <p>Country:</p>
            </td>
            <td className='actionsCell ml-4'>
              <strong>{country}</strong>
            </td>
          </tr>
          <tr className='flex items-baseline justify-between w-full border-b p-5'>
            <td width='100%'>
              <p>City:</p>
            </td>
            <td className='actionsCell ml-4'>
              <strong>{city}</strong>
            </td>
          </tr>
          <tr className='flex items-baseline justify-between w-full border-b p-5 bg-gray-100'>
            <td width='100%'>
              <p>Street:</p>
            </td>
            <td className='actionsCell ml-4'>
              <strong>{street}</strong>
            </td>
          </tr>
          <tr className='flex items-baseline justify-between w-full border-b p-5'>
            <td width='100%'>
              <p>Payment method:</p>
            </td>
            <td className='actionsCell ml-4'>
              <strong>{payment}</strong>
            </td>
          </tr>
          <tr className='flex items-baseline justify-between w-full border-b p-5 bg-gray-100'>
            <td width='100%'>
              <p>Shipping method:</p>
            </td>
            <td className='actionsCell ml-4'>
              <strong>{shipping}</strong>
            </td>
          </tr>
        </tbody>
      </table>

      <div className='flex flex-col items-end justify-end mt-16'>
        <button className='bg-blue-500 text-white border-transparent' onClick={() => appSend({ type: 'address' })}>
          Submit the order
        </button>
      </div>
    </div>
  );
};
