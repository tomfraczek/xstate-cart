import { assign, fromPromise, setup } from 'xstate';

export type ItemContext = {
  prevName: string;
  name: string;
  price: string;
  shipping: boolean;
};

export type IventEvent =
  | {
      type: 'set.name';
      value: string;
    }
  | {
      type: 'set.price';
      value: string;
    }
  | {
      type: 'set.shipping';
      value: boolean;
    }
  | {
      type: 'save';
    }
  | {
      type: 'edit';
    }
  | {
      type: 'cancel';
    };

export type ItemInput = {
  name: string;
  price: string;
  shipping: boolean;
};

export const itemMachine = setup({
  types: {
    context: {} as ItemContext,
    events: {} as IventEvent,
    input: {} as ItemInput,
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
        edit: 'editing',
      },
    },
    editing: {
      tags: 'form',
      on: {
        'set.name': {
          actions: assign({ name: ({ event }) => event.value }),
        },
        'set.price': {
          actions: assign({ price: ({ event }) => event.value }),
        },
        'set.shipping': {
          actions: assign({ shipping: ({ event }) => event.value }),
        },
        save: {
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
    cancel: {
      actions: assign({ name: ({ context }) => context.prevName }),
      target: '.reading',
    },
  },
});
