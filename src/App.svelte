<script>
  import {appMode, showStyles} from './stores';
  import DobPicker from './DobPicker.svelte';
  import CurrentWeekDetails from './CurrentWeekDetails.svelte';
  import CreateTimeSpan from './CreateTimeSpan.svelte';
  import Calendar from './Calendar.svelte';
</script>

<main>
  <h1 class="title">YOUR LIFE</h1>

  <div>
    <input type="checkbox" bind:checked={$showStyles.past}> Show past
    <input type="checkbox" bind:checked={$showStyles.now}> Blink current week
  </div>

  <DobPicker/>

  <div>
    <button on:click={() => $appMode = 'create-time-span'}>Create time span</button>
  </div>

  <Calendar/>
</main>

<CurrentWeekDetails/>

{#if $appMode === 'create-time-span'}
  <CreateTimeSpan/>
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
</style>
