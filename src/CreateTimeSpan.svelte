<script>
  import {newTimeSpan, eventBus} from './stores';

  let step = 'start';

  eventBus.subscribe(event => {

    if(step === 'start' && event.details) {
      $newTimeSpan.start = event.details.startDate;
      step = 'end';
      return;
    }

    if(step === 'end' && event.details) {
      $newTimeSpan.end = event.details.endDate;
      step = 'name';
      return;
    }
  });

  function createTimeSpan() {
    console.log('cTS', $newTimeSpan);
  }
</script>

<div class="create-time-span">
  <div class="title">Create time span</div>

  <div class="step" class:is-active={step === 'start'}>
    <p>1. Pick a start from the calendar: {$newTimeSpan.start}</p>
  </div>

  <div class="step" class:is-active={step === 'end'}>
    <p>
      2. Pick an end from the calendar: {$newTimeSpan.end}<br>
      or choose
      <button on:click={() => $newTimeSpan.end = 'ongoing'}>ongoing</button>
    </p>
  </div>

  <div class="step" class:is-active={step === 'name'}>
    <p>3. Pick a name: <input bind:value={$newTimeSpan.name}></p>
    <p>4. Pick an category: <input bind:value={$newTimeSpan.category}></p>
    <button on:click={createTimeSpan}>Create time span</button>
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
