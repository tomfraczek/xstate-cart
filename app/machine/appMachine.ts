import { createMachine } from 'xstate';

export const appMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QGUAWB7ADpglgOygDoBjAQwCcAXAYlIgnLlgG0AGAXUVE3Vh0pzo8XEAA9EANgCcAJkKsJMgKwAaEAE9EAZhlaAvnrVosuAoToMmkarDAAbMMUoB9WKhzZ8UNpyQgefAJCIuII0nIKymqaCEoSACyESgZGGJ5mFoywthA2ANYeru7p3hwiAfyCwn6hAIystVpJWlKRqhqSrFKE8bUS-QODAOwpIMYlhG4eplCu9o6U1rYOTs6YpOoAtmB4PuW8lcE12rUAHIRnQ+0xcUOEulqPT8-6hmNpM5PFM3Mri7mZJh7PwVILVUChcLyRTXSS1ZJvcafKYlX4LJYFTBrDbbPCUYHcA5gkLaGQSQhDLTxLRXaJwu6Ul5M0ZIrxfaZeVyYzBLeardZbHb4sogolVEkIeqNZqtGF0hAyVhyZQsj5slE-WDcjGFAW44W+QmBcXHSVKhlSCSnWkdM19HqnJkvVUmdXfTla6bWQHZAn+MVHCGIepDWqEGmw2JKc5SPqDeMjRFqsx6oVopw6rEarx+0EmoMILTS06yqK205hhGpV0pnFp5bo3LEdCbTAORa5gPgsQnJoltry0PnRlOp4uiapvHp-60ehZFgio2HbuhIt90uR+LUilV941oiTlwNjO5Y9H90ETvGwM9wvFjfy+JSRIqpP7wiHrlepstttgDuLv614rr2hD9nKtpDNI9yjs846fJ+nrYN6c5AoBeY3qu94DuW8RKDBsGPPBbKIdqp6YkUHKXuhXYSmuYEPuWUj4SOsHEbWgpTkhPKnny55UaUhpAcudHYRBMT9OcDyEQYbx4OgEBwCIrIEPswESgAtBI8paexRBkFQakiaaEisE0cRljEOjmXp5iodkkBGcSprWt0SpUhG8pxLuKlENmBDTo5orqaaSisKwYFKPC4mIEoQwRdGhHxLZ-mzNxQVLs5Ba1DItRhrG8Q4TcEjmcxuinF0SjlbUtmIXxGXCVlt7xDI8pSHctRDKccW1C13WhtStV1lxZFOfmzXknhRaWZIWgRbGtStPEUGLaw8SnLZzatu2DUYSBsThZF0UzQgQxkg6hGvAYQA */
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
        select_payment: {
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
    completed: {
      on: {
        complete: {
          target: 'cart',
        },
      },
    },
  },
});
