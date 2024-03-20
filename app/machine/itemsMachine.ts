import { ActorRefFrom, createMachine, assign, stopChild } from 'xstate';
import { itemMachine } from '@/app/machine/itemMachine';

export type ItemsContext = {
  newItemName: string;
  newItemPrice: string;
  newItemShipping: boolean;
  items: ActorRefFrom<typeof itemMachine>[];
};

export type ItemsEvent =
  | { type: 'items.add'; name: string; price: string; shipping: boolean }
  | { type: 'new_item.change_name'; name: string }
  | { type: 'new_item.change_price'; price: string }
  | { type: 'new_item.change_shipping'; shipping: boolean }
  | { type: 'item.remove'; index: number }
  | { type: 'items.clear_state' };

const makeId = () => Math.random().toString(36).substring(7);

export const itemsMachine = createMachine({
  types: {} as {
    context: ItemsContext;
    events: ItemsEvent;
  },
  id: 'items',
  context: {
    newItemName: '',
    newItemPrice: '',
    newItemShipping: false,
    items: [],
  },
  on: {
    'new_item.change_name': {
      actions: assign({
        newItemName: ({ event }) => event.name,
      }),
    },
    'new_item.change_price': {
      actions: assign({
        newItemPrice: ({ event }) => event.price,
      }),
    },
    'new_item.change_shipping': {
      actions: assign({
        newItemShipping: ({ event }) => event.shipping,
      }),
    },
    'items.add': {
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
    'item.remove': {
      actions: [
        // Stop the friend actor to unsubscribe
        stopChild(({ context, event }) => context.items[event.index]),
        // Remove the friend from the list by index
        assign({
          items: ({ context, event }) => context.items.filter((_, index) => index !== event.index),
        }),
      ],
    },
    'items.clear_state': {
      actions: assign({
        newItemName: '',
        newItemPrice: '',
        newItemShipping: false,
        items: [],
      }),
    },
  },
});
