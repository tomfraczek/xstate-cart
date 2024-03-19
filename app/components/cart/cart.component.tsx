'use client';
import { CartItem } from '@/app/components/cartItem';
import { itemsMachine } from '@/app/machine/itemsMachine';
import { useMachine } from '@xstate/react';
import { appMachine } from '@/app/machine/appMachine';
import { CartForm } from '@/app/components/cartForm';

export const Cart = () => {
  const [itemsState, itemsSend] = useMachine(itemsMachine);
  const [state, send] = useMachine(appMachine);

  const renderComponent = (state: any) => {
    switch (state.value) {
      case 'cart':
        return <CartForm itemsSend={itemsSend} itemsState={itemsState.context} appSend={send} />;
      case 'addressed':
        return <p>address</p>;
      default:
        return null;
    }
  };

  return <div className='w-full'>{renderComponent(state)}</div>;
};
