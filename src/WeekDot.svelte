<script>
  import {appMode, currentWeek, showStyles, clickedWeek, newTimeSpan} from './stores';
  import {stringify} from './dateUtils';

  export let week;
  let today = stringify(new Date());
  let classNames;

  function isMarked(appMode, newTimeSpan, currentWeek) {

    // Mark only once the start date was clicked.
    if(appMode !== 'create-time-span' || !newTimeSpan.startDate) {
      return false;
    }

    let endDateCondition;

    // Mark all hovered until end date is clicked
    if(!newTimeSpan.endDate) {
      endDateCondition = currentWeek && week.startDate < currentWeek.endDate;
    } else {
      endDateCondition = week.startDate < newTimeSpan.endDate;
    }

    return endDateCondition && week.endDate > newTimeSpan.startDate;
  }

  function isDisabled(appMode, newTimeSpan) {
    if(appMode !== 'create-time-span' || !newTimeSpan.startDate || newTimeSpan.endDate) {
      return false;
    }

    return week.endDate < newTimeSpan.startDate;
  }

  $: {
    const classMap = {
      'is-past': $appMode === 'default' && $showStyles.past && week.endDate <= today,
      'is-now': $appMode === 'default' && $showStyles.now && week.startDate <= today && week.endDate >= today,
      'is-hovered': $currentWeek && week.startDate <= $currentWeek.endDate && week.endDate >= $currentWeek.startDate,
      'is-marked': isMarked($appMode, $newTimeSpan, $currentWeek),
      'is-disabled': isDisabled($appMode, $newTimeSpan),
    };

    let classCollection = ['week-wrapper'];

    for(let className in classMap) {
      if(classMap[className]) {
        classCollection.push(className);
      }
    }

    for(let timeSpan of week.matchedTimeSpans) {
      classCollection.push(timeSpan.id);
    }

    classNames = classCollection.join(' ');
  }
</script>

<div class={classNames}
     on:mouseenter={() => $currentWeek = week} on:mouseleave={() => $currentWeek = null}
     on:click={() => $clickedWeek = week}>
  <div class="week"/>
</div>

<style>
  .week-wrapper {
    padding: 0.1rem;
  }

  .week {
    border: 1px solid var(--black);
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
  }

  .is-past .week {
    background: var(--green-light);
  }

  @keyframes blinkNow {
    0%, 49% {
      opacity: 1;
    }
    50%, 100% {
      opacity: 0;
    }
  }

  .is-now .week {
    animation: blinkNow 2s infinite;
  }

  .is-marked .week {
    background: #00c3ff;
  }

  .is-hovered .week {
    background: #00c3ff !important;
  }

  .is-disabled {
    pointer-events: none;
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
