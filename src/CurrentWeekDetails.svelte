<script>
  import {currentWeek} from './stores';
  import SpanDetail from './SpanDetail.svelte';
</script>

{#if $currentWeek}
  <div class="current-week-details">
    <strong class="week">Age {$currentWeek.age}, Week {$currentWeek.weekNumber}</strong><br>
    {$currentWeek.startDate} - {$currentWeek.endDate}

    {#if $currentWeek.matchedTimeSpans?.length}
      <hr class="spacer">
      {#each $currentWeek.matchedTimeSpans as timeSpan}
        <div class="detail-wrapper">
          <SpanDetail timeSpan={timeSpan}/>
        </div>
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
    width: 16rem;
    background: var(--white);
    border-radius: 0.3rem;
    box-shadow: 0 0 2px 0 var(--black);
  }

  .week {
    font-weight: 900;
    text-transform: uppercase;
  }

  .spacer {
    border: 0;
    height: 0.3rem;
    background: var(--grey);
    margin: 1rem -1rem;
  }

  .detail-wrapper:not(:first-child) {
    margin-top: 1rem;
  }
</style>
