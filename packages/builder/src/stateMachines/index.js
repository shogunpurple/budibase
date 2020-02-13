import { Machine, assign } from "xstate"
import { set } from "lodash"

export const componentPanelMachine = Machine(
  {
    id: "sidePanel",
    initial: "info",
    on: {
      INFO: "info",
      COMPONENTS: "components",
      CHANGECOMPONENT: {
        actions: assign({
          component: (_, { component }) => component,
        }),
      },
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
      components: {},
    },
  },
  {
    actions: {
      updateProp: assign({
        component: ({ component }, { category, value, key }) =>
          set(component, `_styles.${category}.${key}`, value),
      }),
    },
  }
)
