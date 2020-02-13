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
      },
      states: {
        properties: {},
        layout: {},
        events: {},
      },
    },
    components: {},
  },
})
