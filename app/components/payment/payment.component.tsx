import { AddressFormProps } from '@/app/components/addressForm/addressForm.component';

export const Payment = ({ shippingSend, shippingState, appSend }: AddressFormProps) => {
  const { shipping } = shippingState;
  const displayCta = shipping !== '';
  return (
    <div>
      <h2 className='text-xl text-center mb-4'>Payment Method</h2>
      <form>
        <div className='flex items-center justify-center gap-5 w-full mb-4'>
          <select
            value={shipping}
            className='border p-1.5 w-full rounded'
            onChange={(event) => shippingSend({ type: 'set.shipping', shipping: event.target.value })}
          >
            <option value=''>Select shipping method</option>
            <option value='creditCaerd'>Credit/debit card payment</option>
            <option value='transfer'>Bank transfert</option>
            <option value='cod'>Cash on delivery</option>
          </select>
        </div>
      </form>
      {displayCta && (
        <div className='flex  items-start justify-between'>
          <div className='flex flex-col gap-2'>
            <button className='' onClick={() => appSend({ type: 'address' })}>
              Edit shipping address
            </button>
          </div>
          <button
            className='bg-blue-500 text-white border-transparent'
            onClick={() => appSend({ type: 'select_payment' })}
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
};
