<script>
  import {timeSpans, categories, showStyles} from './stores';
  import {generateYears} from './DateUtils';
  import DobPicker from './DobPicker.svelte';
  import WeekDot from './WeekDot.svelte';
  import CurrentWeekDetails from './CurrentWeekDetails.svelte';

  let dobString = localStorage.getItem('dobString') || '1970-01-01';
  let dateOfBirth;
  let allYears;

  $: {
    dateOfBirth = new Date(dobString);
    allYears = generateYears(dateOfBirth);
  }

  $: console.log($timeSpans, $categories);

  $timeSpans = [
    ...$timeSpans,
    {
      category: 'Relationships',
    },
  ];
</script>

<main>
  <h1 class="title">YOUR LIFE</h1>

  <div>
    <input type="checkbox" bind:checked={$showStyles.past}> Show past
    <input type="checkbox" bind:checked={$showStyles.now}> Show now
  </div>

  <DobPicker bind:dobString={dobString}/>

  <div class="life">
    <div class="year">
      <div class="year-label">&nbsp;</div>
      <div style="flex: 1">weeks</div>
    </div>
    <div class="year">
      <div class="label year-label">age ↓</div>
      {#each [...Array(52).keys()] as week}
        <div class="label week-label">{week + 1}</div>
      {/each}
    </div>
    {#each allYears as year}
      <div class="year">
        <div class="label year-label">
          {year.age}
        </div>
        {#each year.weeks as week}
          <WeekDot week={week}/>
        {/each}
      </div>
    {/each}
  </div>
</main>

<CurrentWeekDetails/>

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

  .life {
    display: inline-block;
    margin: 0 2rem 2rem 0;
    font-family: monospace;
  }

  .label {
    height: 1rem;
    border: 1px solid transparent;
  }

  .year-label {
    width: 2.5rem;
    margin: 0 0.5rem 0 0;
    text-align: right;
    line-height: 1rem;
  }

  .week-label {
    width: 1rem;
    margin: 0 0.1rem;
    text-align: center;
  }

  .year {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
