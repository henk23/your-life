<script>
  import {tick, onDestroy} from 'svelte';
  import {appMode, timeSpans, categories, newTimeSpan, clickedWeek} from './stores';
  import {save} from './storageService';

  let step = 'start';
  let nameInput;
  let catInput;
  let categoryInputType = 'select';

  $clickedWeek = null;
  $newTimeSpan = {
    startDate: null,
    endDate: null,
    name: '',
    category: $categories[0],
    style: {
      'background-color': '#00c3ff',
      'border-color': null,
      'border-width': null,
    },
  };

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

  function handleCatBlur(event) {
    if(!event.target.value.trim()) {
      $newTimeSpan.category = $categories[0];
      categoryInputType = 'select';
    }
  }
</script>

<div class="create-time-span">
  <div class="title">Create time span</div>

  <div class="step" class:is-active={step === 'start'}>
    {#if !$newTimeSpan.startDate}
      <div class="substep">1. Pick a start date from the calendar</div>
    {:else}
      <div class="substep">1. Start: {$newTimeSpan.startDate}</div>
    {/if}
  </div>

  <div class="step" class:is-active={step === 'end'}>
    <div class="substep">
      {#if !$newTimeSpan.endDate}
        2. Pick an end date or click
        <button on:click={() => $clickedWeek = {endDate: 'ongoing'}}>ongoing</button>
      {:else}
        2. End: {$newTimeSpan.endDate}
      {/if}
    </div>
  </div>

  <div class="step" class:is-active={step === 'name'}>
    <div class="substep">
      <div class="substep-head">3. Name</div>
      <input bind:value={$newTimeSpan.name} bind:this={nameInput}>
    </div>
    <div class="substep">
      <div class="substep-head">4. Category</div>
      {#if categoryInputType === 'select'}
        <select on:change={handleCategoryChange}>
          {#each $categories as category}
            <option>{category}</option>
          {/each}
          <option value="$$createNew">Create new category...</option>
        </select>
      {:else}
        <input bind:value={$newTimeSpan.category} bind:this={catInput} on:blur={handleCatBlur}>
      {/if}
    </div>
    <div class="substep">
      <div class="substep-head">5. Styling</div>
      <div class="style-row">
        <input type="color" bind:value={$newTimeSpan.style['background-color']} id="bg-color">
        <label for="bg-color">Background color</label>
      </div>
      <div class="style-row">
        <input type="color" bind:value={$newTimeSpan.style['border-color']} id="b-color">
        <label for="b-color">Border color</label>
      </div>
      <div class="style-row">
        <input type="range" min="0" max="9" bind:value={$newTimeSpan.style['border-width']} id="b-width">
        <label for="b-width">Border width</label>
      </div>
    </div>

    <button on:click={createTimeSpan} disabled={!$newTimeSpan.name?.trim() || !$newTimeSpan.category?.trim()}>
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

  .substep {
    margin: 0.6rem 0;
  }

  .substep-head {
    margin-bottom: 0.5rem;
  }

  input {
    vertical-align: middle;
  }

  .style-row {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .style-row input {
    width: 6rem;
    margin: 0 0.5rem 0 0;
  }
</style>
