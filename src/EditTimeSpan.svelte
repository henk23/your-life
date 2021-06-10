<script>
  import {tick} from 'svelte';
  import {timeSpans, editIdx, categories, dobString} from './stores';
  import {save, load} from './storageService';
  import CloseIcon from './img/close.svg';
  import DatePicker from './DatePicker.svelte';

  let nameInput;
  let catInput;
  let categoryInputType = 'select';

  function saveTimeSpan() {
    save('timeSpans', $timeSpans);
    $editIdx = null;
  }

  function discard() {
    $timeSpans = load('timeSpans');
    $editIdx = null;
  }

  async function handleCategoryChange(event) {
    if(event.target.value === '$$createNew') {
      $timeSpans[$editIdx].category = '';
      categoryInputType = 'input';
      await tick();
      catInput.focus();
    } else {
      $timeSpans[$editIdx].category = event.target.value;
    }
  }

  function handleCatBlur(event) {
    if(!event.target.value.trim()) {
      $timeSpans[$editIdx].category = $categories[0];
      categoryInputType = 'select';
    }
  }

  function setNull(key) {
    $timeSpans[$editIdx].style[key] = null;
  }
</script>

<div class="edit-time-span">
  <div class="title">Change time span</div>

  <a class="close" on:click={discard}>
    {@html CloseIcon}
  </a>

  <div class="step">
    <div class="substep">
      <div class="substep-head">Start</div>
      <DatePicker bind:dateString={$timeSpans[$editIdx].startDate} startYear={parseInt($dobString.substr(0, 4))}/>
    </div>
  </div>

  <div class="step">
    <div class="substep">
      <div class="substep-head">End</div>
      <DatePicker bind:dateString={$timeSpans[$editIdx].endDate} startYear={parseInt($dobString.substr(0, 4))}/>
    </div>
  </div>

  <div class="step">
    <div class="substep">
      <label class="substep-head" for="name">Name</label>
      <input bind:value={$timeSpans[$editIdx].name} bind:this={nameInput} id="name">
    </div>
    <div class="substep">
      <label class="substep-head" for="category">Category</label>
      {#if categoryInputType === 'select'}
        <select on:change={handleCategoryChange} value={$timeSpans[$editIdx].category} id="category">
          {#each $categories as category}
            <option>{category}</option>
          {/each}
          <option value="$$createNew">Create new category...</option>
        </select>
      {:else}
        <input bind:value={$timeSpans[$editIdx].category} bind:this={catInput} on:blur={handleCatBlur} id="category">
      {/if}
    </div>
    <div class="substep">
      <div class="substep-head">Styling</div>
      <div class="style-row">
        {#if $timeSpans[$editIdx].style['background-color'] !== null}
          <input type="color" bind:value={$timeSpans[$editIdx].style['background-color']} id="bg-color">
          <div>
            <label for="bg-color">Background color</label>
            <a href="#" on:click|preventDefault={() => setNull('background-color')}>unset</a>
          </div>
        {:else}
          <a href="#" on:click|preventDefault={() => $timeSpans[$editIdx].style['background-color'] = '#00c3ff'}>
            Set background color
          </a>
        {/if}
      </div>
      <div class="style-row">
        {#if $timeSpans[$editIdx].style['border-color'] !== null}
          <input type="color" bind:value={$timeSpans[$editIdx].style['border-color']} id="b-color">
          <div>
            <label for="b-color">Border color</label>
            <a href="#" on:click|preventDefault={() => setNull('border-color')}>unset</a>
          </div>
        {:else}
          <a href="#" on:click|preventDefault={() => $timeSpans[$editIdx].style['border-color'] = '#000000'}>
            Set border color
          </a>
        {/if}
      </div>
      <div class="style-row">
        {#if $timeSpans[$editIdx].style['border-width'] !== null}
          <input type="range" min="0" max="9" bind:value={$timeSpans[$editIdx].style['border-width']} id="b-width">
          <div>
            <label for="b-width">Border width</label>
            <a href="#" on:click|preventDefault={() => setNull('border-width')}>unset</a>
          </div>
        {:else}
          <a href="#" on:click|preventDefault={() => $timeSpans[$editIdx].style['border-width'] = 1}>
            Set border width
          </a>
        {/if}
      </div>
    </div>

    <button on:click={saveTimeSpan} class="create-button"
            disabled={!$timeSpans[$editIdx].name?.trim() || !$timeSpans[$editIdx].category?.trim()}>
      Save changes
    </button>
  </div>
</div>

<style>
  .edit-time-span {
    position: fixed;
    right: 1rem;
    bottom: 1rem;
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

  .substep {
    margin: 0.6rem 0;
  }

  .ongoing {
    padding: 0.2rem 1rem;
  }

  .substep-head {
    margin-bottom: 0.5rem;
  }

  label.substep-head {
    display: block;
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
