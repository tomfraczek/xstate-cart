import { createMachine } from 'xstate';

export const appMachine = createMachine({
  context: {},
  id: 'Shopping',
  initial: 'cart',
  states: {
    cart: {
      on: {
        address: {
          target: 'addressed',
        },
      },
    },
    addressed: {
      on: {
        select_shipping: {
          target: 'shipping_selected',
        },
        skip_shipping: {
          target: 'shipping_skipped',
        },
      },
    },
    shipping_selected: {
      on: {
        select_paymen: {
          target: 'payment_selected',
        },
        address: {
          target: 'addressed',
        },
        skip_payment: {
          target: 'payment_skipped',
        },
      },
    },
    shipping_skipped: {
      on: {
        select_payment: {
          target: 'payment_selected',
        },
        skip_payment: {
          target: 'payment_skipped',
        },
        address: {
          target: 'addressed',
        },
      },
    },
    payment_selected: {
      on: {
        skip_shipping: {
          target: 'shipping_skipped',
        },
        complete: {
          target: 'completed',
        },
        address: {
          target: 'addressed',
        },
        select_shipping: {
          target: 'shipping_selected',
        },
      },
    },
    payment_skipped: {
      on: {
        complete: {
          target: 'completed',
        },
        address: {
          target: 'addressed',
        },
        skip_shipping: {
          target: 'shipping_skipped',
        },
        select_shipping: {
          target: 'shipping_selected',
        },
      },
    },
    completed: {},
  },
});
