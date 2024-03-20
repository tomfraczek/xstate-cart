import { ContextType, EventType } from '@/app/machine/shippingMachine';

type PaymentFormProps = {
  shippingSend: (event: EventType) => void;
  shippingState: ContextType;
  appSend: (event: { type: string }) => void;
};

export const Payment = ({ shippingSend, shippingState, appSend }: PaymentFormProps) => {
  const { payment } = shippingState;
  const displayCta = payment !== '';
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
          <button onClick={() => appSend({ type: 'address' })}>Change shipping address</button>
          <button onClick={() => appSend({ type: 'skip_shipping' })}>Back</button>
          <button onClick={() => appSend({ type: 'complete' })}>Skip</button>
        </div>
        {displayCta && (
          <button className='bg-blue-500 text-white border-transparent' onClick={() => appSend({ type: 'complete' })}>
            Continue
          </button>
        )}
      </div>
    </div>
  );
};
