import { ProgressEvents } from '@/app/machine/progressMachine';
import { ContextType, EventType } from '@/app/machine/shippingMachine';

type AddressFormProps = {
  shippingSend: (event: EventType) => void;
  shippingState: ContextType;
  appSend: (event: { type: string }) => void;
  progressSend: (event: ProgressEvents) => void;
};

export const Shipping = ({ shippingSend, shippingState, appSend, progressSend }: AddressFormProps) => {
  const { shipping, country } = shippingState;
  const displayCta = shipping !== '';

  const handleContinue = () => {
    progressSend({ type: 'progress.update', value: 75 });
    appSend({ type: 'select_payment' });
  };
  const handleSkip = () => {
    progressSend({ type: 'progress.update', value: 75 });
    appSend({ type: 'skip_payment' });
  };
  const handleEditShipping = () => {
    progressSend({ type: 'progress.update', value: 25 });
    appSend({ type: 'address' });
  };
  return (
    <div>
      <h2 className='text-xl text-center mb-4'>Shipping Method</h2>
      <form>
        <div className='flex items-center justify-center gap-5 w-full mb-4'>
          <select
            value={shipping}
            className='border p-1.5 w-full rounded'
            onChange={(event) => shippingSend({ type: 'set.shipping', shipping: event.target.value })}
          >
            <option value=''>Select shipping method</option>
            {country === 'Poland' ? (
              <>
                <option value='InPost'>InPost</option>
                <option value='Poczta Polska'>Poczta Polska</option>
              </>
            ) : (
              <>
                <option value='American Express'>American Express</option>
                <option value='DPD'>DPD</option>
              </>
            )}
          </select>
        </div>
      </form>
      <div className='flex  items-start justify-between'>
        <div className='flex gap-2'>
          <button className='' onClick={handleEditShipping}>
            Change shipping address
          </button>
          <button className='' onClick={handleSkip}>
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
