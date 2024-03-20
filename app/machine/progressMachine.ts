import { assign, createMachine, setup } from 'xstate';

export type ProgressContext = {
  progress: number;
};

export type ProgressEvents = { type: 'progress.update'; value: number };

export const progressBarMachine = createMachine({
  types: {} as {
    context: ProgressContext;
    events: ProgressEvents;
  },
  id: 'progressBar',
  context: {
    progress: 0,
  },
  on: {
    'progress.update': {
      actions: assign({
        progress: ({ event }) => event.value,
      }),
    },
  },
});
