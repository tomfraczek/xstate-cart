'use client';
import { ItemContext } from '@/app/machine/itemMachine';
import { ItemsContext } from '@/app/machine/itemsMachine';
import { ContextType } from '@/app/machine/shippingMachine';

import { CartItem } from '@/app/components/cartItem';

type PaymentFormProps = {
  shippingState: ContextType;
  itemsState: ItemsContext;
  appSend: (event: { type: string }) => void;
};
export const Completed = ({ itemsState, shippingState, appSend }: PaymentFormProps) => {
  const { city, country, payment, shipping, street } = shippingState;
  const displayAddress = city !== '' && country !== '' && street;
  const displayPayment = payment !== '';
  const displayShipping = shipping !== '';
  const items = itemsState.items;
  const elements: ItemContext[] = [];

  items.map((item) => {
    elements.push(item.getSnapshot().context);
  });

  const handleSubmit = () => {
    const payload = {
      city,
      country,
      payment,
      shipping,
      street,
      elements,
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
      .then((data) => {
        console.log('Success:', data);
        // Handle success
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle error
      });
  };

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
        <button onClick={handleSubmit} className='bg-blue-500 text-white border-transparent'>
          Submit the order
        </button>
      </div>
    </div>
  );
};
