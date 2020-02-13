import { Machine } from "xstate"

export const componentPanelMachine = Machine(
  {
    id: "sidePanel",
    initial: "info",
    on: {
      INFO: "info",
      COMPONENTS: "components",
    },
    states: {
      info: {
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
          events: {},
        },
      },
      components: {},
    },
  },
  {
    actions: {
      updateProp: (ctx, e) => console.log("updateProp", e),
    },
  }
)
