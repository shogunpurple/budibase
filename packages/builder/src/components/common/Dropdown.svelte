<script>
  import { createEventDispatcher } from "svelte"
  import Select from "../common/Select.svelte"

  export let selected
  export let label
  export let options
  export let valueMember
  export let textMember
  export let multiple = false
  export let width = "medium"
  export let size = "small"

  const dispatch = createEventDispatcher()
</script>

<div class="uk-margin">
  <label class="uk-form-label">{label}</label>
  <div class="uk-form-controls">
    {#if multiple}
      <Select
        class="uk-select uk-form-width-{width} uk-form-{size}"
        multiple
        bind:value={selected}
        on:change>
        {#each options as option}
          <option value={!valueMember ? option : valueMember(option)}>
            {!textMember ? option : textMember(option)}
          </option>
        {/each}
      </Select>
    {:else}
      <Select
        class="uk-select uk-form-width-{width} uk-form-{size}"
        bind:value={selected}
        on:change>
        {#each options as option}
          <option value={!valueMember ? option : valueMember(option)}>
            {!textMember ? option : textMember(option)}
          </option>
        {/each}
      </Select>
    {/if}
  </div>
</div>
