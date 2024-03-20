import { ContextType, EventType } from '@/app/machine/shippingMachine';

type AddressFormProps = {
  shippingSend: (event: EventType) => void;
  shippingState: ContextType;
  appSend: (event: { type: string }) => void;
};

export const AddressForm = ({ shippingSend, shippingState, appSend }: AddressFormProps) => {
  const { country, city, street } = shippingState;
  const displayCta = country !== '' && city !== '' && street !== '';

  return (
    <div>
      <h2 className='text-xl text-center mb-4'>Shipping Address</h2>
      <form>
        <div className='flex items-center justify-center gap-5 w-full mb-4'>
          <select
            className='border p-1.5 w-full rounded'
            value={country}
            onChange={(event) => shippingSend({ type: 'set.country', country: event.target.value })}
          >
            <option value=''>Select country</option>
            <option value='pl'>Poland</option>
            <option value='usa'>United States</option>
          </select>

          <input
            className=' w-full'
            value={shippingState.city}
            type='text'
            onChange={(event) => shippingSend({ type: 'set.city', city: event.target.value })}
            placeholder='City'
          />
          <input
            className=' w-full'
            value={shippingState.street}
            type='text'
            onChange={(event) => shippingSend({ type: 'set.street', street: event.target.value })}
            placeholder='Street'
          />
        </div>
      </form>

      {displayCta && (
        <div className='flex flex-col items-end justify-end'>
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
