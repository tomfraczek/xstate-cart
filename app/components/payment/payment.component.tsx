import { ProgressEvents } from '@/app/machine/progressMachine';
import { ContextType, EventType } from '@/app/machine/shippingMachine';

type PaymentFormProps = {
  shippingSend: (event: EventType) => void;
  shippingState: ContextType;
  appSend: (event: { type: string }) => void;
  progressSend: (event: ProgressEvents) => void;
};

export const Payment = ({ shippingSend, shippingState, appSend, progressSend }: PaymentFormProps) => {
  const { payment } = shippingState;
  const displayCta = payment !== '';

  const handleContinue = () => {
    progressSend({ type: 'progress.update', value: 100 });
    appSend({ type: 'complete' });
  };
  const handleSkip = () => {
    progressSend({ type: 'progress.update', value: 100 });
    appSend({ type: 'complete' });
  };
  const handleBack = () => {
    progressSend({ type: 'progress.update', value: 75 });
    appSend({ type: 'skip_shipping' });
  };
  const handleEditShipping = () => {
    progressSend({ type: 'progress.update', value: 50 });
    appSend({ type: 'address' });
  };
  return (
    <div>
      <h2 className='text-xl text-center mb-4'>Payment Method</h2>
      <form>
        <div className='flex items-center justify-center gap-5 w-full mb-4'>
          <select
            value={payment}
            className='border p-1.5 w-full rounded'
            onChange={(event) => shippingSend({ type: 'set.payment', payment: event.target.value })}
          >
            <option value=''>Select shipping method</option>
            <option value='Credit/debit card payment'>Credit/debit card payment</option>
            <option value='Bank transfert'>Bank transfert</option>
            <option value='Cash on delivery'>Cash on delivery</option>
          </select>
        </div>
      </form>
      <div className='flex  items-start justify-between'>
        <div className='flex gap-2'>
          <button onClick={handleEditShipping}>Change shipping address</button>
          <button onClick={handleBack}>Back</button>
          <button onClick={handleSkip}>Skip</button>
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
