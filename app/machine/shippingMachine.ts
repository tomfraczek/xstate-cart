import { assign, fromPromise, setup } from 'xstate';

export const shippingMachine = setup({
  types: {
    context: {} as {
      country: string;
      city: string;
      street: string;
      shipping: string;
    },
    events: {} as
      | {
          type: 'set.country';
          country: string;
        }
      | {
          type: 'set.city';
          city: string;
        }
      | {
          type: 'set.street';
          street: string;
        }
      | {
          type: 'set.shipping';
          shipping: string;
        },
    input: {} as {
      country: string;
      city: string;
      street: string;
      shipping: string;
    },
  },
  actors: {
    saveUser: fromPromise(async () => {
      // Simulate network request
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return true;
    }),
  },
}).createMachine({
  id: 'address',
  context: {
    country: '',
    city: '',
    street: '',
    shipping: '',
  },
  on: {
    'set.country': {
      actions: assign({
        country: ({ event }) => event.country,
      }),
    },
    'set.city': {
      actions: assign({
        city: ({ event }) => event.city,
      }),
    },
    'set.street': {
      actions: assign({
        street: ({ event }) => event.street,
      }),
    },
    'set.shipping': {
      actions: assign({
        shipping: ({ event }) => event.shipping,
      }),
    },
  },
});
