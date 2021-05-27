<script>
  import {clone, add, stringify} from './DateUtils';

  let today = new Date();
  let dateOfBirth = new Date('1986-11-23');
  let yearIterator = clone(dateOfBirth);
  let allYears = [];

  for(let y = 0; y < 100; y++) {
    let startOfYear = yearIterator;
    let endOfYear = add(add(startOfYear, 1, 'years'), -1, 'days');

    let weekIterator = clone(startOfYear);
    const allWeeks = [];

    for(let w = 1; w <= 52; w++) {
      let startOfWeek = weekIterator;

      weekIterator = add(weekIterator, 6, 'days');
      let endOfWeek = weekIterator;

      while(w === 52 && stringify(endOfWeek) < stringify(endOfYear)) {
        weekIterator = add(weekIterator, 1, 'days');
        endOfWeek = weekIterator;
      }

      allWeeks.push({
        weekNumber: w,
        startDate: stringify(startOfWeek),
        endDate: stringify(endOfWeek),
      });

      weekIterator = add(weekIterator, 1, 'days');
    }

    allYears.push({
      year: yearIterator.getFullYear(),
      age: y,
      startDate: stringify(startOfYear),
      endDate: stringify(endOfYear),
      weeks: allWeeks,
    });

    yearIterator = add(yearIterator, 1, 'years');
  }
</script>

<main>
  <h1 class="title">YOUR LIFE</h1>

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
          <div class="week" class:is-past={week.startDate < stringify(today)}
               title={`${week.startDate} to ${week.endDate}`}></div>
        {/each}
      </div>
    {/each}
  </div>
</main>

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
        margin: 0 auto 3rem;
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
        margin: 0.2rem 0;
    }

    .week {
        border: 1px solid black;
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        margin: 0 0.1rem;
    }

    .week:hover {
        background: #999999 !important;
    }

    .is-past {
        background: #7bc1ff;
    }
</style>
