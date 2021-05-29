<script>
  import WeekDot from './WeekDot.svelte';
  import {generateYears, stringify} from './dateUtils';
  import {dobString, timeSpans} from './stores';

  let dateOfBirth;
  let allYears;

  let today = stringify(new Date());

  $: {
    dateOfBirth = new Date($dobString);
    allYears = generateYears(dateOfBirth);
  }

  $: {
    for(let timeSpan of $timeSpans) {
      for(let year of allYears) {
        for(let week of year.weeks) {
          week.matchedTimeSpans = [];
          if(
            week.startDate < (timeSpan.endDate === 'ongoing' ? today : timeSpan.endDate) &&
            week.endDate > timeSpan.startDate
          ) {
            week.matchedTimeSpans = [...week.matchedTimeSpans, timeSpan];
          }
        }
      }
    }
  }
</script>

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

<style>
  .life {
    display: inline-block;
    margin: 2rem 2rem 2rem 0;
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
