<script>
  import {appMode, timeSpans, newTimeSpan, clickedWeek} from './stores';
  import {save} from './storageService';

  let step = 'start';
  let nameInput;

  $clickedWeek = null;

  clickedWeek.subscribe(week => {
    if(!week) {
      return;
    }

    if(step === 'start') {
      $newTimeSpan.startDate = week.startDate;
      step = 'end';
      return;
    }

    if(step === 'end') {
      $newTimeSpan.endDate = week.endDate;
      step = 'name';
      nameInput.focus();
    }
  });

  function createTimeSpan() {
    $timeSpans = [
      ...$timeSpans,
      $newTimeSpan,
    ];

    save('timeSpans', $timeSpans);

    $appMode = 'default';
  }
</script>

<div class="create-time-span">
  <div class="title">Create time span</div>

  <div class="step" class:is-active={step === 'start'}>
    {#if !$newTimeSpan.startDate}
      <p>1. Pick a start date from the calendar</p>
    {:else}
      <p>1. Start: {$newTimeSpan.startDate}</p>
    {/if}
  </div>

  <div class="step" class:is-active={step === 'end'}>
    <p>
      {#if !$newTimeSpan.endDate}
        2. Pick an end date or click
        <button on:click={() => $clickedWeek = {endDate: 'ongoing'}}>ongoing</button>
      {:else}
        2. End: {$newTimeSpan.endDate}
      {/if}
    </p>
  </div>

  <div class="step" class:is-active={step === 'name'}>
    <p>3. Name: <input bind:value={$newTimeSpan.name} bind:this={nameInput}></p>
    <p>4. Category: <input bind:value={$newTimeSpan.category}></p>
    <button on:click={createTimeSpan} disabled={!$newTimeSpan.name || !$newTimeSpan.category}>Create time span</button>
  </div>
</div>

<style>
  .create-time-span {
    position: fixed;
    left: 1rem;
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

  .step {
    pointer-events: none;
    opacity: 0.4;
    transition: all 0.2s ease-out;
  }

  .step.is-active {
    pointer-events: all;
    opacity: 1;
  }
</style>
