<script>
  import {tick, onDestroy} from 'svelte';
  import {appMode, timeSpans, categories, newTimeSpan, clickedWeek} from './stores';
  import {save} from './storageService';
  import CloseIcon from './img/close.svg?raw';

  let step = 'start';
  let nameInput;
  let catInput;
  let categoryInputType = 'select';

  $clickedWeek = null;
  $newTimeSpan = {
    startDate: null,
    endDate: null,
    name: '',
    description: '',
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

  function setNull(key) {
    $newTimeSpan.style[key] = null;
  }
</script>

<div class="create-time-span">
  <div class="title">Create time span</div>

  <a class="close" on:click={() => $appMode = 'default'}>
    {@html CloseIcon}
  </a>

  <div class="step" class:is-active={step === 'start'}>
    {#if !$newTimeSpan.startDate}
      <div class="substep">Pick a start date from the calendar</div>
    {:else}
      <div class="substep">Start: {$newTimeSpan.startDate}</div>
    {/if}
  </div>

  <div class="step" class:is-active={step === 'end'}>
    <div class="substep">
      {#if !$newTimeSpan.endDate}
        Pick an end date or click
        <button on:click={() => $clickedWeek = {endDate: 'ongoing'}} class="ongoing">ongoing</button>
      {:else}
        End: {$newTimeSpan.endDate}
      {/if}
    </div>
  </div>

  <div class="step" class:is-active={step === 'name'}>
    <div class="substep">
      <label class="substep-head" for="name">Name</label>
      <input bind:value={$newTimeSpan.name} bind:this={nameInput} id="name">
    </div>
    <div class="substep">
      <label class="substep-head" for="description">Description</label>
      <textarea bind:value={$newTimeSpan.description} id="description" rows="3"></textarea>
    </div>
    <div class="substep">
      <label class="substep-head" for="category">Category</label>
      {#if categoryInputType === 'select'}
        <select on:change={handleCategoryChange} id="category">
          {#each $categories as category}
            <option>{category}</option>
          {/each}
          <option value="$$createNew">Create new category...</option>
        </select>
      {:else}
        <input bind:value={$newTimeSpan.category} bind:this={catInput} on:blur={handleCatBlur} id="category">
      {/if}
    </div>
    <div class="substep">
      <div class="substep-head">Styling</div>
      <div class="style-row">
        {#if $newTimeSpan.style['background-color'] !== null}
          <input type="color" bind:value={$newTimeSpan.style['background-color']} id="bg-color">
          <div>
            <label for="bg-color">Background color</label>
            <a href="#" on:click|preventDefault={() => setNull('background-color')}>unset</a>
          </div>
        {:else}
          <a href="#" on:click|preventDefault={() => $newTimeSpan.style['background-color'] = '#00c3ff'}>
            Set background color
          </a>
        {/if}
      </div>
      <div class="style-row">
        {#if $newTimeSpan.style['border-color'] !== null}
          <input type="color" bind:value={$newTimeSpan.style['border-color']} id="b-color">
          <div>
            <label for="b-color">Border color</label>
            <a href="#" on:click|preventDefault={() => setNull('border-color')}>unset</a>
          </div>
        {:else}
          <a href="#" on:click|preventDefault={() => $newTimeSpan.style['border-color'] = '#000000'}>
            Set border color
          </a>
        {/if}
      </div>
      <div class="style-row">
        {#if $newTimeSpan.style['border-width'] !== null}
          <input type="range" min="0" max="9" bind:value={$newTimeSpan.style['border-width']} id="b-width">
          <div>
            <label for="b-width">Border width</label>
            <a href="#" on:click|preventDefault={() => setNull('border-width')}>unset</a>
          </div>
        {:else}
          <a href="#" on:click|preventDefault={() => $newTimeSpan.style['border-width'] = 1}>
            Set border width
          </a>
        {/if}
      </div>
    </div>

    <button on:click={createTimeSpan} class="create-button"
            disabled={!$newTimeSpan.name?.trim() || !$newTimeSpan.category?.trim()}>
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
    width: 18rem;
    background: white;
    border-radius: 0.3rem;
    box-shadow: 0 0 2px 0 var(--black);
  }

  .title {
    font-weight: 900;
    text-transform: uppercase;
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

  .ongoing {
    padding: 0.2rem 1rem;
  }

  .substep-head {
    margin-bottom: 0.5rem;
    font-weight: 600;
    font-size: 0.8rem;
    text-transform: uppercase;
  }

  label.substep-head {
    display: block;
  }

  input {
    vertical-align: middle;
  }

  #name, #description {
    width: 15rem;
  }

  #description {
    resize: vertical;
    font-family: inherit;
    font-size: 0.8rem;
    line-height: 1.2;
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

  .style-row a {
    font-size: 0.8rem;
  }

  .create-button {
    margin-top: 1rem;
  }

  .close {
    position: absolute;
    right: 0.3rem;
    top: 0.3rem;
    cursor: pointer;
  }
</style>
