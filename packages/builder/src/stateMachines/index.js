import { Machine } from "xstate";

export const componentPanelMachine = Machine({
  id: "sidePanel",
  initial: "properties",
  on: {
    PROPERTIES: "properties",
    LAYOUT: "layout"
  },
  states: {
    properties: {},
    layout: {}
  }
});