'use client';
import { CartItem } from '@/app/components/cartItem';
import { itemsMachine } from '@/app/machine/itemsMachine';
import { useMachine } from '@xstate/react';
import { appMachine } from '@/app/machine/appMachine';
import { CartForm } from '@/app/components/cartForm';
import { AddressForm } from '@/app/components/addressForm';
import { shippingMachine } from '@/app/machine/shippingMachine';
import { useEffect } from 'react';
import { Shipping } from '@/app/components/shipping';

export const Start = () => {
  const [state, send] = useMachine(appMachine);
  const [itemsState, itemsSend] = useMachine(itemsMachine);
  const [shippingState, shippingSend] = useMachine(shippingMachine);

  useEffect(() => {
    console.log(state.value);
  }, [state]);

  const renderComponent = (state: any) => {
    switch (state.value) {
      case 'cart':
        return <CartForm itemsSend={itemsSend} itemsState={itemsState.context} appSend={send} />;
      case 'addressed':
        return <AddressForm shippingState={shippingState.context} shippingSend={shippingSend} appSend={send} />;
      case 'shipping_selected':
        return <Shipping shippingState={shippingState.context} shippingSend={shippingSend} appSend={send} />;
      default:
        return null;
    }
  };

  return <div className='w-full'>{renderComponent(state)}</div>;
};
