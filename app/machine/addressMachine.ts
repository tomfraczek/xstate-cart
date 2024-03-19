import { assign, fromPromise, setup } from 'xstate';

export const addressMachine = setup({
  types: {
    context: {} as {
      country: string;
      city: string;
      street: string;
    },
    events: {} as
      | {
          type: 'SET_COUNTRY';
          country: string;
        }
      | {
          type: 'SET_CITY';
          city: string;
        }
      | {
          type: 'SET_STREET';
          street: string;
        },
    input: {} as {
      country: string;
      city: string;
      street: string;
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
  },
  on: {
    SET_COUNTRY: {
      actions: assign({
        country: ({ event }) => event.country,
      }),
    },
    SET_CITY: {
      actions: assign({
        city: ({ event }) => event.city,
      }),
    },
    SET_STREET: {
      actions: assign({
        street: ({ event }) => event.street,
      }),
    },
  },
});
