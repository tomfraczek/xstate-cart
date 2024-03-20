'use client';
import { useEffect } from 'react';
import { itemsMachine } from '@/app/machine/itemsMachine';
import { createActorContext, useMachine } from '@xstate/react';
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

  const displayCartView = state.matches('cart');
  const displayAddressView = state.matches('shipping_selected') || state.matches('shipping_skipped');
  const displayPaymentView = state.matches('payment_selected') || state.matches('payment_skipped');
  const displayCompletedView = state.matches('completed');

  return (
    <div className='w-full'>
      {displayCartView && <CartForm itemsSend={itemsSend} itemsState={itemsState.context} appSend={send} />}
      {state.matches('addressed') && (
        <AddressForm shippingState={shippingState.context} shippingSend={shippingSend} appSend={send} />
      )}
      {displayAddressView && (
        <Shipping shippingState={shippingState.context} shippingSend={shippingSend} appSend={send} />
      )}
      {displayPaymentView && (
        <Payment shippingState={shippingState.context} shippingSend={shippingSend} appSend={send} />
      )}
      {displayCompletedView && (
        <Completed
          itemsSend={itemsSend}
          itemsState={itemsState.context}
          shippingState={shippingState.context}
          appSend={send}
        />
      )}
    </div>
  );
};
