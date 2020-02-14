import { Machine, assign } from "xstate"
import { set } from "lodash"
import { initialisePure } from "../builderStore/store";
import builderMachineConfig from "./builderStateMachines";

const appMachineConfig = {
  id: "root",
  initial: "uninitialized",
  states: {
    uninitialized: {
      invoke: {
        src: context => initialisePure(context),
        onDone: {
          target: "initialized",
          actions: (context, evt) => {
            console.log("initialized with", context, evt);
            assign(
              ...context,
              ...evt
            )
          } 
        }
      }
    },
    initialized: {
      ...builderMachineConfig
    }
  }
};

const appMachineOptions = {
  actions: {
    updateProp: assign({
      component: ({ component }, { category, value, key }) =>
        set(component, `_styles.${category}.${key}`, value),
    }),
  },
  activities: {},
  guards: {},
  services: {}
}

export default Machine(appMachineConfig, appMachineOptions);