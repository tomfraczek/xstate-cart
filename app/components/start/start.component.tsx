'use client';
import { CartItem } from '@/app/components/cartItem';
import { itemsMachine } from '@/app/machine/itemsMachine';
import { useMachine } from '@xstate/react';
import { appMachine } from '@/app/machine/appMachine';
import { CartForm } from '@/app/components/cartForm';
import { AddressForm } from '@/app/components/addressForm';
import { addressMachine } from '@/app/machine/addressMachine';

export const Start = () => {
  const [state, send] = useMachine(appMachine);
  const [itemsState, itemsSend] = useMachine(itemsMachine);
  const [addressState, addressSend] = useMachine(addressMachine);

  const renderComponent = (state: any) => {
    switch (state.value) {
      case 'cart':
        return <CartForm itemsSend={itemsSend} itemsState={itemsState.context} appSend={send} />;
      case 'addressed':
        return <AddressForm addressState={addressState.context} addressSend={addressSend} appSend={send} />;
      default:
        return null;
    }
  };

  return <div className='w-full'>{renderComponent(state)}</div>;
};
