<script>
  import { onMount } from 'svelte';
  import { settings, showSettings } from './stores';
  import CloseIcon from './img/close.svg?raw';
  import { save, load } from './storageService';

  let domNode;
  let fileInput;

  function close(event) {
    $showSettings = false;
  }

  $: {
    save('settings', $settings);
  }

  function exportFile() {
    const exp = {
      dateOfBirth: load('dateOfBirth'),
      timeSpans: load('timeSpans'),
      settings: load('settings'),
    };

    const tmpElm = document.createElement('a');
    tmpElm.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(exp)));
    tmpElm.setAttribute('download', 'your-life.json');

    tmpElm.style.display = 'none';
    document.body.appendChild(tmpElm);

    tmpElm.click();

    document.body.removeChild(tmpElm);
  }

  onMount(() => {
    fileInput.addEventListener('change', event => {
      const reader = new FileReader();

      reader.addEventListener('load', event => {
        try {
          const imp = JSON.parse(event.target.result);

          save('dateOfBirth', imp.dateOfBirth);
          save('timeSpans', imp.timeSpans);
          save('settings', imp.settings);

          alert('Import successful. Reloading page.');
          location.reload();
        } catch(e) {
          alert('Error importing file: ' + e.message);
        }
      });

      reader.readAsText(event.target.files[0], 'UTF-8');
    });
  });

  function importFile() {
    if(window.confirm('Do you really want to irreversibly overwrite your current data?')) {
      fileInput.click();
    }
  }
</script>

<div class="settings" bind:this={domNode}>
  <div class="title">Settings</div>

  <a class="close" on:click={close}>
    {@html CloseIcon}
  </a>

  <div class="checkboxes">
    <label>
      <input type="checkbox" bind:checked={$settings.showPast}> Paint past weeks in gray
    </label>
    <label>
      <input type="checkbox" bind:checked={$settings.blinkNow}> Blink current week
    </label>
  </div>

  <div class="title">Export</div>

  <div class="impex">
    <p class="small">Export your data to a .json file</p>
    <button on:click={exportFile}>
      Export to file
    </button>
  </div>

  <div class="title">Import</div>

  <div class="impex">
    <p class="small">
      Import your data from a previously exported .json file
    </p>
    <p class="small">
      <strong>
        WARNING: All current data will be irreversibly overwritten
        by the contents of the import file.
      </strong>
    </p>
    <button on:click={importFile}>
      Import from file
    </button>
    <input bind:this={fileInput} type="file" style="display: none;"/>
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
    max-width: 16rem;
    background: white;
    border-radius: 0.3rem;
    box-shadow: 0 0 2px 0 var(--black);
  }

  .title {
    font-weight: 900;
    text-transform: uppercase;
  }

  .title:not(:first-child) {
    margin-top: 1rem;
  }

  .checkboxes, .impex {
    margin: 0.5rem 0 0;
  }

  .checkboxes label {
    display: block;
  }

  .small {
    font-size: 0.8rem;
  }

  .close {
    position: absolute;
    right: 0.3rem;
    top: 0.3rem;
    cursor: pointer;
  }
</style>
