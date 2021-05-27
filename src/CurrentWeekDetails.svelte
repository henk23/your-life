<script>
  import {currentWeek} from './stores';
</script>

{#if $currentWeek}
  <div class="current-week-details">
    <div class="title">Year {$currentWeek.age}, Week {$currentWeek.weekNumber}</div>
    <div class="dates">{$currentWeek.startDate} - {$currentWeek.endDate}</div>
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
    background: white;
    border-radius: 0.5rem;
    box-shadow: 0 0 2px 0 var(--black);
  }

  .title {
    font-size: 0.8rem;
    font-weight: bold;
  }

  .dates {
    font-size: 0.8rem;
  }
</style>
