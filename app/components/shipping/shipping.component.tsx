import { AddressFormProps } from '@/app/components/addressForm/addressForm.component';

export const Shipping = ({ shippingSend, shippingState, appSend }: AddressFormProps) => {
  const { shipping } = shippingState;
  const displayCta = shipping !== '';
  return (
    <div>
      <h2 className='text-xl text-center mb-4'>Shipping Method</h2>
      <form>
        <div className='flex items-center justify-center gap-5 w-full mb-4'>
          <select
            value={shipping}
            className='border p-1.5 w-full rounded'
            onChange={(event) => shippingSend({ type: 'SET_SHIPPING', shipping: event.target.value })}
          >
            <option value=''>Select shipping method</option>
            <option value='americanExpress'>American Express</option>
            <option value='inPost'>InPost</option>
          </select>
        </div>
      </form>
      {displayCta && (
        <div className='flex  items-start justify-between'>
          <div className='flex flex-col gap-2'>
            <button className='' onClick={() => appSend({ type: 'address' })}>
              Edit shipping address
            </button>
            <button onClick={() => appSend({ type: 'address' })}>Edit shipping method</button>
          </div>
          <button
            className='bg-blue-500 text-white border-transparent'
            onClick={() => appSend({ type: 'select_shipping' })}
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
};
