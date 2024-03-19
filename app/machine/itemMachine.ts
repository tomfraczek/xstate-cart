import { assign, fromPromise, setup } from 'xstate';

export const itemMachine = setup({
  types: {
    context: {} as {
      prevName: string;
      name: string;
      price: string;
      shipping: boolean;
    },
    events: {} as
      | {
          type: 'SET_NAME';
          value: string;
        }
      | {
          type: 'SAVE';
        }
      | {
          type: 'EDIT';
        }
      | {
          type: 'CANCEL';
        },
    input: {} as {
      name: string;
      price: string;
      shipping: boolean;
    },
    tags: {} as 'read' | 'form' | 'saving',
  },
  actors: {
    saveUser: fromPromise(async () => {
      // Simulate network request
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return true;
    }),
  },
}).createMachine({
  id: 'item',
  initial: 'reading',
  context: ({ input }) => ({
    prevName: input.name,
    name: input.name,
    price: input.price,
    shipping: input.shipping,
  }),
  states: {
    reading: {
      tags: 'read',
      on: {
        EDIT: 'editing',
      },
    },
    editing: {
      tags: 'form',
      on: {
        SET_NAME: {
          actions: assign({ name: ({ event }) => event.value }),
        },
        SAVE: {
          target: 'saving',
        },
      },
    },
    saving: {
      tags: ['form', 'saving'],
      invoke: {
        src: 'saveUser',
        onDone: {
          target: 'reading',
          actions: assign({ prevName: ({ context }) => context.name }),
        },
      },
    },
  },
  on: {
    CANCEL: {
      actions: assign({ name: ({ context }) => context.prevName }),
      target: '.reading',
    },
  },
});
