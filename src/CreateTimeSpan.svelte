<script>
  import {newTimeSpan, clickedWeek} from './stores';

  let step = 'start';
  let nameInput;

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
    console.log('TODO:', $newTimeSpan);
  }
</script>

<div class="create-time-span">
  <div class="title">Create time span</div>

  <div class="step" class:is-active={step === 'start'}>
    <p>1. Pick a start from the calendar: {$newTimeSpan.startDate}</p>
  </div>

  <div class="step" class:is-active={step === 'end'}>
    <p>
      2. Pick an end from the calendar: {$newTimeSpan.endDate}<br>
      or choose
      <button on:click={() => $clickedWeek = {endDate: 'ongoing'}}>ongoing</button>
    </p>
  </div>

  <div class="step" class:is-active={step === 'name'}>
    <p>3. Pick a name: <input bind:value={$newTimeSpan.name} bind:this={nameInput}></p>
    <p>4. Pick a category: <input bind:value={$newTimeSpan.category}></p>
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
