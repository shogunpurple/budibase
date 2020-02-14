import { assign } from "xstate";

const componentPanelStates = {
    initial: "info",
    on: {
      INFO: ".info",
      COMPONENTS: ".components",
      CHANGE_COMPONENT: {
        actions: assign({
          component: (_, { component }) => component,
        })
      },
    },
    states: {
      info: {
        initial: "properties",
        on: {
          PROPERTIES: ".properties",
          LAYOUT: ".layout",
          EVENTS: ".events",
          CODE: ".code",
        },
        states: {
          properties: {},
          layout: {
            on: {
              UPDATEPROP: {
                actions: "updateProp",
              },
            },
          },
          code: {
            initial: "showing",
            on: {
              SHOW: ".showing",
              HIDE: ".hidden",
            },
            states: {
              showing: {},
              hidden: {},
            },
          },
          events: {
            initial: "viewing",
            on: {
              VIEWING: ".viewing",
              EDITING: ".editing",
            },
            states: {
              viewing: {},
              editing: {},
            },
          },
        },
      },
      components: {
        on: {
          INFO: "info"
        }
      },
    }
};

const builderFrontendMachineConfig = {
  initial: "pageSelected",
  on: {
    BACKEND: "backend",
  },
  states: {
    pageSelected: {
      ...componentPanelStates
    }
  }
};

const builderMachineConfig = {
  id: "builder",
  initial: "backend",
  states: {
    backend: {
      on: {
        FRONTEND: "frontend",
      }
    },
    frontend: {
      ...builderFrontendMachineConfig
    },
  }
};

export default builderMachineConfig;