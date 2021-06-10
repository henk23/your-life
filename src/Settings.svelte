<script>
  import {settings, showSettings} from './stores';
  import CloseIcon from './img/close.svg';
  import {save} from './storageService';

  let domNode;

  function close(event) {
    $showSettings = false;
  }

  $: {
    save('settings', $settings);
  }
</script>

<div class="settings" bind:this={domNode}>
  <div class="title">Settings</div>

  <a class="close" on:click={close}>
    {@html CloseIcon}
  </a>

  <div class="checkboxes">
    <label>
      <input type="checkbox" bind:checked={$settings.showPast}> Show past
    </label>
    <label>
      <input type="checkbox" bind:checked={$settings.blinkNow}> Blink current week
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
    border-radius: 0.3rem;
    box-shadow: 0 0 2px 0 var(--black);
  }

  .title {
    font-weight: 900;
    text-transform: uppercase;
  }

  .checkboxes {
    margin: 0.5rem 0 0;
  }

  .checkboxes label {
    display: block;
  }

  .close {
    position: absolute;
    right: 0.3rem;
    top: 0.3rem;
    cursor: pointer;
  }
</style>
