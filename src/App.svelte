<script>
  import {appMode, timeSpans, showSettings, editIdx} from './stores';
  import DobPicker from './DobPicker.svelte';
  import CurrentWeekDetails from './CurrentWeekDetails.svelte';
  import CreateTimeSpan from './CreateTimeSpan.svelte';
  import Calendar from './Calendar.svelte';
  import Settings from './Settings.svelte';
  import EditTimeSpans from './EditTimeSpans.svelte';
  import EditTimeSpan from './EditTimeSpan.svelte';
</script>

<main>
  <h1 class="title">YOUR LIFE</h1>

  <DobPicker/>

  <div class="create-button-wrapper">
    <div>
      <button on:click|stopPropagation={() => $appMode = 'create-time-span'}>Create time span</button>
    </div>
    {#if $timeSpans.length}
      <div>
        <button on:click|stopPropagation={() => $appMode = 'edit-time-spans'}>Edit time spans</button>
      </div>
    {/if}
  </div>

  <div class="settings-button-wrapper">
    <button on:click|stopPropagation={() => $showSettings = true}>Settings</button>
  </div>

  <Calendar/>
</main>

<CurrentWeekDetails/>

{#if $showSettings}
  <Settings/>
{/if}

{#if $appMode === 'create-time-span'}
  <CreateTimeSpan/>
{/if}

{#if $appMode === 'edit-time-spans'}
  <EditTimeSpans/>
{/if}

{#if $editIdx !== null}
  <EditTimeSpan/>
{/if}

<style>
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
    font-size: 0.7rem;
  }

  .title {
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  .create-button-wrapper {
    position: fixed;
    left: 1.2rem;
    top: 1.2rem;
    text-align: left;
  }

  .create-button-wrapper button {
    margin-bottom: 1rem;
  }

  .settings-button-wrapper {
    position: fixed;
    right: 1.2rem;
    top: 1.2rem;
  }
</style>
