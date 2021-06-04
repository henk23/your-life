<script>
  import {appMode, currentWeek, showStyles, clickedWeek, newTimeSpan} from './stores';
  import {stringify} from './dateUtils';

  export let week;
  let today = stringify(new Date());
  let classNames;
  let style = '';

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
      'is-past': $showStyles.past && week.endDate <= today,
      'is-now': $showStyles.now && week.startDate <= today && week.endDate >= today,
      'is-hovered': $currentWeek && week.startDate <= $currentWeek.endDate && week.endDate >= $currentWeek.startDate,
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

  $: {
    style = '';

    let styleSource = week.matchedTimeSpans[0]?.style;

    if(isMarked($appMode, $newTimeSpan, $currentWeek)) {
      styleSource = $newTimeSpan.style;
    }

    if(!styleSource) {
      break $;
    }

    style += 'background-color: ' + styleSource.backgroundColor + ';';
    style += 'border-color: ' + styleSource.borderColor + ';';
    style += 'border-width: ' + styleSource.borderWidth + 'px;';
  }
</script>

<div class={classNames}
     on:mouseenter={() => $currentWeek = week} on:mouseleave={() => $currentWeek = null}
     on:click={() => $clickedWeek = week}>
  <div class="week" style={style}/>
</div>

<style>
  .week-wrapper {
    padding: 0.1rem;
  }

  .week {
    border: 1px solid var(--black);
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    box-sizing: border-box;
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
    animation: blinkNow 1s infinite;
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
