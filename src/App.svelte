<script>
  let years = [...Array(100).keys()];
  let weeks = [...Array(52).keys()];

  let today = new Date();
  let dateOfBirth = new Date('1986-11-23');

  let diff = (today - dateOfBirth) / 1000 / 60 / 60 / 24 / 7;
  console.log(diff);
</script>

<main>
  <h1>YOUR LIFE</h1>

  <div class="life">
    <div class="year">
      <div class="label year-label">&nbsp;</div>
      {#each weeks as week}
        <div class="label week-label">{week+1}</div>
      {/each}
    </div>
    {#each years as year}
      <div class="year">
        <div class="label year-label">{year+1}</div>
        {#each weeks as week}
          <div class="week" title={`Year ${year+1}, week ${week+1}`}></div>
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
    font-family: monospace;
    font-size: 0.7rem;
  }

  h1 {
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  .life {
    display: inline-block;
    margin: 0 auto;
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
    background: black;
  }

</style>
