import { Machine } from "xstate"

export const componentPanelMachine = Machine({
  id: "sidePanel",
  initial: "info",
  on: {
    INFO: "info",
    COMPONENTS: "components",
  },
  states: {
    info: {
      on: {
        PROPERTIES: "info.properties",
        LAYOUT: "info.layout",
        EVENTS: "info.events",
        CODE: "info.code",
      },
      states: {
        properties: {},
        layout: {},
        code: {
          initial: "showing",
          on: {
            SHOW: "code.showing",
            HIDE: "code.hidden",
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
})
