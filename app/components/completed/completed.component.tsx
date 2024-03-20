'use client';
import { ItemContext } from '@/app/machine/itemMachine';
import { ItemsContext, ItemsEvent } from '@/app/machine/itemsMachine';
import { ContextType } from '@/app/machine/shippingMachine';

import { CartItem } from '@/app/components/cartItem';
import { useState } from 'react';
import { ProgressEvents } from '@/app/machine/progressMachine';

type PaymentFormProps = {
  shippingState: ContextType;
  itemsState: ItemsContext;
  appSend: (event: { type: string }) => void;
  itemsSend: (event: ItemsEvent) => void;
  progressSend: (event: ProgressEvents) => void;
};
export const Completed = ({ itemsState, shippingState, appSend, itemsSend, progressSend }: PaymentFormProps) => {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { city, country, payment, shipping, street } = shippingState;
  const displayAddress = city !== '' && country !== '' && street;
  const displayPayment = payment !== '';
  const displayShipping = shipping !== '';
  const items = itemsState.items;
  const elements: ItemContext[] = [];

  items.map((item) => {
    elements.push(item.getSnapshot().context);
  });

  const totalPrice = elements.reduce((acc, item) => acc + parseInt(item.price), 0);

  const handleSubmit = () => {
    setLoading(true);
    setSent(false);
    setError(false);

    const payload = {
      city,
      country,
      payment,
      shipping,
      street,
      elements,
      totalPrice,
    };

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const options: RequestInit = {
      method: 'POST',
      headers,
      mode: 'cors', // Specify the mode here
      body: JSON.stringify(payload),
    };

    fetch('https://eox1ur7re06qn4o.m.pipedream.net', options)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => {
        setLoading(false);
        setSent(true);
        progressSend({ type: 'progress.update', value: 0 });
        itemsSend({ type: 'items.clear_state' });
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
        console.error('Error:', error);
        // Handle error
      });
  };

  const handleAddNewOrder = () => {
    progressSend({ type: 'progress.update', value: 0 });
    appSend({ type: 'complete' });
  };

  return (
    <div className='mb-32 relative'>
      <h2 className='text-xl text-center mb-4'>Cart Summary</h2>
      <table className='itemsTable w-full'>
        <tbody>
          {itemsState.items.map((item, i) => (
            <CartItem key={i} index={i} itemRef={item} />
          ))}
        </tbody>
      </table>

      <div className='w-full flex justify-end pr-5'>
        <p>
          Total price: <strong>${totalPrice}</strong>
        </p>
      </div>
      {displayAddress && (
        <>
          <h2 className='text-xl text-center mb-4 mt-14'>Address Summary</h2>
          <table className='itemsTable w-full'>
            <tbody>
              <tr className='flex items-baseline justify-between w-full border-b p-5'>
                <td>
                  <p>Country:</p>
                </td>
                <td className='actionsCell ml-4'>
                  <strong>{country}</strong>
                </td>
              </tr>
              <tr className='flex items-baseline justify-between w-full border-b p-5 bg-gray-100'>
                <td>
                  <p>City:</p>
                </td>
                <td className='actionsCell ml-4'>
                  <strong>{city}</strong>
                </td>
              </tr>
              <tr className='flex items-baseline justify-between w-full border-b p-5'>
                <td>
                  <p>Street:</p>
                </td>
                <td className='actionsCell ml-4'>
                  <strong>{street}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </>
      )}
      {displayPayment && (
        <>
          <h2 className='text-xl text-center mb-4 mt-14'>Payment Summary</h2>
          <table className='itemsTable w-full'>
            <tbody>
              <tr className='flex items-baseline justify-between w-full border-b p-5'>
                <td>
                  <p>Payment method:</p>
                </td>
                <td className='actionsCell ml-4'>
                  <strong>{payment}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </>
      )}
      {displayShipping && (
        <>
          <h2 className='text-xl text-center mb-4 mt-14'>Shipping Summary</h2>
          <table className='itemsTable w-full'>
            <tbody>
              <tr className='flex items-baseline justify-between w-full border-b p-5'>
                <td>
                  <p>Shipping method:</p>
                </td>
                <td className='actionsCell ml-4'>
                  <strong>{shipping}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </>
      )}

      <div className='flex flex-col items-end justify-end mt-16'>
        {loading ? (
          <div
            className='mr-10 animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-gray-400 rounded-full'
            role='status'
            aria-label='loading'
          >
            <span className='sr-only'>Loading...</span>
          </div>
        ) : (
          <button onClick={handleSubmit} className='bg-blue-500 text-white border-transparent'>
            Submit the order
          </button>
        )}
      </div>

      {sent && (
        <div className='absolute inset-0 p-32 border rounded-lg border-gray-400 bg-white flex flex-col items-center justify-center'>
          <h2 className={`${error ? 'text-red-600' : 'text-green-600'} text-3xl`}>Done!</h2>
          <h2 className={`${error ? 'text-red-600' : 'text-green-600'} text-2xl`}>
            {error ? 'But something went wrong! Try again. :(' : 'The order has been succesfully added.'}
          </h2>
          <button className='mt-4' onClick={handleAddNewOrder}>
            Add new order
          </button>
        </div>
      )}
    </div>
  );
};
