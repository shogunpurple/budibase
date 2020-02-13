<script>
  import PropsView from "./PropsView.svelte"
  import { store, stateMachineStore } from "../builderStore"
  import IconButton from "../common/IconButton.svelte"
  import {
    LayoutIcon,
    PaintIcon,
    TerminalIcon,
    CircleIndicator,
    EventsIcon,
  } from "../common/Icons/"
  import CodeEditor from "./CodeEditor.svelte"
  import LayoutEditor from "./LayoutEditor.svelte"
  import EventsEditor from "./EventsEditor"

  let current_view = "props"
  let codeEditor

  $: component = $store.currentComponentInfo
  $: originalName = component.name
  $: name = component.name
  $: description = component.description
  $: components = $store.components

  const onPropChanged = store.setComponentProp
  const onStyleChanged = store.setComponentStyle
</script>

<div class="root">
  <ul>
    <li>
      <button
        class:selected={$stateMachineStore.matches('info.properties')}
        on:click={() => stateMachineStore.send('PROPERTIES')}>
        <PaintIcon />
      </button>
    </li>
    <li>
      <button
        class:selected={$stateMachineStore.matches('info.layout')}
        on:click={() => stateMachineStore.send('LAYOUT')}>
        <LayoutIcon />
      </button>
    </li>
    <li>
      <button
        class:selected={$stateMachineStore.matches('info.code')}
        on:click={() => stateMachineStore.send('CODE')}>
        {#if component._code && component._code.trim().length > 0}
          <div class="button-indicator">
            <CircleIndicator />
          </div>
        {/if}
        <TerminalIcon />
      </button>
    </li>
    <li>
      <button
        class:selected={$stateMachineStore.matches('info.events')}
        on:click={() => stateMachineStore.send('EVENTS')}>
        <EventsIcon />
      </button>
    </li>
  </ul>
  {$store.currentFrontEndType}
  <div class="component-props-container">

    {#if $stateMachineStore.matches('info.properties')}
      <PropsView {component} {components} {onPropChanged} />
    {:else if $stateMachineStore.matches('info.layout')}
      <LayoutEditor
        onStyleChanged={prop => stateMachineStore.send('UPDATEPROP', prop)}
        {component} />
    {:else if $stateMachineStore.matches('info.events')}
      <EventsEditor {component} {components} {onPropChanged} />
    {/if}

    <CodeEditor
      showing={$stateMachineStore.matches('info.code.showing')}
      bind:this={codeEditor}
      code={component._code}
      onCodeChanged={store.setComponentCode}
      onSave={() => stateMachineStore.send('HIDE')} />

  </div>

</div>

<style>
  .root {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .title > div:nth-child(1) {
    grid-column-start: name;
    color: var(--secondary100);
  }

  .title > div:nth-child(2) {
    grid-column-start: actions;
  }

  .component-props-container {
    margin-top: 10px;
    flex: 1 1 auto;
    overflow-y: auto;
  }

  ul {
    list-style: none;
    display: flex;
    padding: 0;
  }

  li {
    margin-right: 20px;
    background: none;
    border-radius: 5px;
    width: 48px;
    height: 48px;
  }

  li button {
    width: 100%;
    height: 100%;
    background: none;
    border: none;
    border-radius: 5px;
    padding: 12px;
    outline: none;
    cursor: pointer;
    position: relative;
  }

  .selected {
    color: var(--button-text);
    background: var(--background-button) !important;
  }

  .button-indicator {
    position: absolute;
    top: 8px;
    right: 10px;
    color: var(--button-text);
  }
</style>
