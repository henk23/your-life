<script>
  import {tick, onDestroy} from 'svelte';
  import {appMode, timeSpans, categories, newTimeSpan, clickedWeek} from './stores';
  import {save} from './storageService';

  let step = 'start';
  let nameInput;
  let catInput;
  let categoryInputType = 'select';

  $clickedWeek = null;
  $newTimeSpan.category = $categories[0].name;

  const unsubscribeClickedWeek = clickedWeek.subscribe(week => {
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

  onDestroy(unsubscribeClickedWeek);

  function createTimeSpan() {
    $timeSpans = [
      ...$timeSpans,
      $newTimeSpan,
    ];

    save('timeSpans', $timeSpans);

    $appMode = 'default';
  }

  async function handleCategoryChange(event) {
    if(event.target.value === '$$createNew') {
      $newTimeSpan.category = '';
      categoryInputType = 'input';
      await tick();
      catInput.focus();
    } else {
      $newTimeSpan.category = event.target.value;
    }
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
    <p>
      3. Name: <input bind:value={$newTimeSpan.name} bind:this={nameInput}>
    </p>
    <p>
      4. Category:
      {#if categoryInputType === 'select'}
        <select on:blur={handleCategoryChange}>
          {#each $categories as category}
            <option>{category.name}</option>
          {/each}
          <option value="$$createNew">Create new category...</option>
        </select>
      {:else}
        <input bind:value={$newTimeSpan.category} bind:this={catInput}>
      {/if}
    </p>
    <button on:click={createTimeSpan} disabled={!$newTimeSpan.name || !$newTimeSpan.category}>
      Create time span
    </button>
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
