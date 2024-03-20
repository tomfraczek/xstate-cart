import { ProgressEvents } from '@/app/machine/progressMachine';
import { ContextType, EventType } from '@/app/machine/shippingMachine';

type AddressFormProps = {
  shippingSend: (event: EventType) => void;
  shippingState: ContextType;
  appSend: (event: { type: string }) => void;
  progressSend: (event: ProgressEvents) => void;
};

export const AddressForm = ({ shippingSend, shippingState, appSend, progressSend }: AddressFormProps) => {
  const { country, city, street } = shippingState;
  const displayCta = country !== '' && city !== '' && street !== '';

  const handleContinue = () => {
    progressSend({ type: 'progress.update', value: 50 });
    appSend({ type: 'select_shipping' });
  };

  const handleSkip = () => {
    progressSend({ type: 'progress.update', value: 50 });
    appSend({ type: 'skip_shipping' });
  };
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
            <option value='Poland'>Poland</option>
            <option value='United States'>United States</option>
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
      <div className='flex  items-start justify-between'>
        <div className='flex gap-2'>
          <button className='bg-red-600 text-white border-transparent' onClick={handleSkip}>
            Skip
          </button>
        </div>
        {displayCta && (
          <button className='bg-blue-500 text-white border-transparent' onClick={handleContinue}>
            Continue
          </button>
        )}
      </div>
    </div>
  );
};
