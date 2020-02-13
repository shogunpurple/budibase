import { readable } from "svelte/store";
import { interpret } from "xstate";

export function createStore(machine, options) {
  const service = interpret(machine, options);

  const { subscribe } = readable(machine.initialState, set => {
    service.onTransition(state => {
      if (state.changed) {
        set(state);
      }
    });

    service.start();

    return () => {
      service.stop();
    };
  });

  return {
    subscribe,
    send: service.send
  };
}
