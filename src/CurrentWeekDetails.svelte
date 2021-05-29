<script>
  import {currentWeek} from './stores';
</script>

{#if $currentWeek}
  <div class="current-week-details">
    <strong>Year {$currentWeek.age}, Week {$currentWeek.weekNumber}</strong><br>
    {$currentWeek.startDate} - {$currentWeek.endDate}

    {#if $currentWeek.matchedTimeSpans?.length}
      <hr class="spacer">
      {#each $currentWeek.matchedTimeSpans as timeSpan}
        <p class="span">
          <strong>{timeSpan.name} ({timeSpan.category})</strong><br>
          {timeSpan.startDate} - {timeSpan.endDate}
        </p>
      {/each}
    {/if}
  </div>
{/if}

<style>
  .current-week-details {
    position: fixed;
    right: 1rem;
    top: 1rem;
    border: 1px solid var(--black);
    padding: 1rem;
    min-width: 12rem;
    font-size: 0.8rem;
    background: var(--white);
    border-radius: 0.5rem;
    box-shadow: 0 0 2px 0 var(--black);
  }

  .spacer {
    margin: 1rem 0;
  }

  .span {
    margin-top: 1rem;
    margin-bottom: 0;
  }
</style>
