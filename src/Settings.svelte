<script>
  import {showStyles, showSettings} from './stores';

  let domNode;

  function close(event) {
    if(!domNode.contains(event.target)) {
      $showSettings = false;
    }
  }
</script>

<svelte:body on:click={close}/>

<div class="settings" bind:this={domNode}>
  <div class="title">Settings</div>

  <div class="checkboxes">
    <label>
      <input type="checkbox" bind:checked={$showStyles.past}> Show past
    </label>
    <label>
      <input type="checkbox" bind:checked={$showStyles.now}> Blink current week
    </label>
  </div>
</div>

<style>
  .settings {
    position: fixed;
    right: 1rem;
    top: 1rem;
    border: 1px solid var(--black);
    padding: 1rem;
    min-width: 12rem;
    background: white;
    border-radius: 0.5rem;
    box-shadow: 0 0 2px 0 var(--black);
  }

  .title {
    font-size: 0.8rem;
    font-weight: bold;
  }

  .checkboxes {
    margin: 0.5rem 0 0;
  }

  .checkboxes label {
    display: block;
  }
</style>
