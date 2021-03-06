<script>
  import { goto } from "@sveltech/routify"
  // import { tick } from "svelte"
  import ComponentsHierarchyChildren from "./ComponentsHierarchyChildren.svelte"

  import {
    last,
    sortBy,
    map,
    trimCharsStart,
    trimChars,
    join,
    compose,
  } from "lodash/fp"
  import ConfirmDialog from "components/common/ConfirmDialog.svelte"
  import { pipe } from "components/common/core"
  import { store } from "builderStore"
  import { ArrowDownIcon, GridIcon } from "components/common/Icons/"

  export let layout

  let confirmDeleteDialog
  let componentToDelete = ""

  const joinPath = join("/")

  const lastPartOfName = c =>
    c && last(c.name ? c.name.split("/") : c._component.split("/"))

  const isComponentSelected = (current, comp) => current === comp

  $: _layout = {
    component: layout,
    title: lastPartOfName(layout),
  }

  const isScreenSelected = component =>
    component.component &&
    $store.currentPreviewItem &&
    component.component.name === $store.currentPreviewItem.name

  const confirmDeleteComponent = async component => {
    componentToDelete = component
    confirmDeleteDialog.show()
  }

  const setCurrentScreenToLayout = () => {
    store.setScreenType("page")
    $goto("./:page/page-layout")
  }
</script>

<div class="pagelayoutSection">
  <div class="components-nav-page">Page Layout</div>
  <div
    class="budibase__nav-item root"
    class:selected={$store.currentComponentInfo._id === _layout.component.props._id}
    on:click|stopPropagation={setCurrentScreenToLayout}>
    <span
      class="icon"
      class:rotate={$store.currentPreviewItem.name !== _layout.title}>
      <ArrowDownIcon />
    </span>

    <span class="icon">
      <GridIcon />
    </span>

    <span class="title">Page Layout</span>
  </div>

  {#if $store.currentPreviewItem.name === _layout.title && _layout.component.props._children}
    <ComponentsHierarchyChildren
      thisComponent={_layout.component.props}
      components={_layout.component.props._children}
      currentComponent={$store.currentComponentInfo}
      onDeleteComponent={confirmDeleteComponent}
      onMoveUpComponent={store.moveUpComponent}
      onMoveDownComponent={store.moveDownComponent}
      onCopyComponent={store.copyComponent} />
  {/if}
</div>

<ConfirmDialog
  bind:this={confirmDeleteDialog}
  title="Confirm Delete"
  body={`Are you sure you wish to delete this '${lastPartOfName(componentToDelete)}' component?`}
  okText="Delete Component"
  onOk={() => store.deleteComponent(componentToDelete)} />

<style>
  .components-nav-page {
    font-size: 13px;
    color: #000333;
    text-transform: uppercase;
    margin-bottom: 10px;
    padding-left: 20px;
    font-weight: 600;
    opacity: 0.4;
    letter-spacing: 1px;
  }

  .pagelayoutSection {
    margin: 20px 0px 20px 0px;
  }
  .title {
    margin-left: 10px;
    font-size: 13px;
  }

  .icon {
    display: inline-block;
    transition: 0.2s;
    width: 20px;
    margin-top: 2px;
    color: #000333;
  }

  .icon:nth-of-type(2) {
    width: 14px;
    margin: 0 0 0 5px;
  }

  :global(svg) {
    transition: 0.2s;
  }

  .rotate :global(svg) {
    transform: rotate(-90deg);
  }
</style>
