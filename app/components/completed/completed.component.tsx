import { ItemsContext } from '@/app/machine/itemsMachine';
import { ContextType, EventType } from '@/app/machine/shippingMachine';

type PaymentFormProps = {
  shippingState: ContextType;
  itemsState: ItemsContext;
  appSend: (event: { type: string }) => void;
};
export const Completed = ({ itemsState, shippingState, appSend }: PaymentFormProps) => {
  return <div>Completed</div>;
};
