import { ActorRefFrom, createMachine, assign, stopChild } from 'xstate';
import { itemMachine } from '@/app/machine/itemMachine';

const makeId = () => Math.random().toString(36).substring(7);

export const itemsMachine = createMachine({
  types: {} as {
    context: {
      newItemName: string;
      newItemPrice: string;
      newItemShipping: boolean;
      items: ActorRefFrom<typeof itemMachine>[];
    };
    events:
      | {
          type: 'ITEMS.ADD';
          name: string;
          price: string;
          shipping: boolean;
        }
      | {
          type: 'NEW_ITEM.CHANGE_NAME';
          name: string;
        }
      | {
          type: 'NEW_ITEM.CHANGE_PRICE';
          price: string;
        }
      | {
          type: 'NEW_ITEM.CHANGE_SHIPPING';
          shipping: boolean;
        }
      | {
          type: 'ITEM.REMOVE';
          index: number;
        };
  },
  id: 'items',
  context: {
    newItemName: '',
    newItemPrice: '',
    newItemShipping: false,
    items: [],
  },
  on: {
    'NEW_ITEM.CHANGE_NAME': {
      actions: assign({
        newItemName: ({ event }) => event.name,
      }),
    },
    'NEW_ITEM.CHANGE_PRICE': {
      actions: assign({
        newItemPrice: ({ event }) => event.price,
      }),
    },
    'NEW_ITEM.CHANGE_SHIPPING': {
      actions: assign({
        newItemShipping: ({ event }) => event.shipping,
      }),
    },
    'ITEMS.ADD': {
      guard: ({ event }) => event.name.trim().length > 0,
      actions: assign({
        items: ({ context, spawn }) =>
          context.items.concat(
            spawn(itemMachine, {
              id: `item-${makeId()}`,
              input: {
                name: context.newItemName,
                price: context.newItemPrice,
                shipping: context.newItemShipping,
              },
            })
          ),
        newItemName: '',
        newItemPrice: '',
        newItemShipping: false,
      }),
    },
    'ITEM.REMOVE': {
      actions: [
        // Stop the friend actor to unsubscribe
        stopChild(({ context, event }) => context.items[event.index]),
        // Remove the friend from the list by index
        assign({
          items: ({ context, event }) => context.items.filter((_, index) => index !== event.index),
        }),
      ],
    },
  },
});
