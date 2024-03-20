'use client';
import { useEffect } from 'react';
import { itemsMachine } from '@/app/machine/itemsMachine';
import { useMachine } from '@xstate/react';
import { appMachine } from '@/app/machine/appMachine';
import { CartForm } from '@/app/components/cartForm';
import { AddressForm } from '@/app/components/addressForm';
import { shippingMachine } from '@/app/machine/shippingMachine';
import { Shipping } from '@/app/components/shipping';
import { Payment } from '@/app/components/payment';
import { Completed } from '@/app/components/completed';

export const Start = () => {
  const [state, send] = useMachine(appMachine);
  const [itemsState, itemsSend] = useMachine(itemsMachine);
  const [shippingState, shippingSend] = useMachine(shippingMachine);

  useEffect(() => {
    console.log(state.value);
  }, [state]);

  return (
    <div className='w-full'>
      {state.matches('cart') && <CartForm itemsSend={itemsSend} itemsState={itemsState.context} appSend={send} />}
      {state.matches('addressed') && (
        <AddressForm shippingState={shippingState.context} shippingSend={shippingSend} appSend={send} />
      )}
      {state.matches('shipping_selected') && (
        <Shipping shippingState={shippingState.context} shippingSend={shippingSend} appSend={send} />
      )}
      {state.matches('payment_selected') && (
        <Payment shippingState={shippingState.context} shippingSend={shippingSend} appSend={send} />
      )}
      {state.matches('completed') && (
        <Completed itemsState={itemsState.context} shippingState={shippingState.context} appSend={send} />
      )}
    </div>
  );
};
