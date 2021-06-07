<script>
  import {appMode, currentWeek, showStyles, clickedWeek, newTimeSpan} from './stores';
  import {stringify} from './dateUtils';
  import {isMarked, isDisabled} from './utils';

  export let week;
  let today = stringify(new Date());
  let classNames;
  let style = '';

  $: {
    const classMap = {
      'is-past': $showStyles.past && week.endDate <= today,
      'is-now': $showStyles.now && week.startDate <= today && week.endDate >= today,
      'is-hovered': $currentWeek && week.startDate <= $currentWeek.endDate && week.endDate >= $currentWeek.startDate,
      'is-disabled': isDisabled($appMode, $newTimeSpan, week),
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
    const stylesMap = {
      'background-color': null,
      'border-color': null,
      'border-width': null,
    };

    for(let span of week.matchedTimeSpans) {
      for(let key in stylesMap) {
        if(span.style[key]) {
          stylesMap[key] = span.style[key];
        }
      }
    }

    style = '';
    for(let key in stylesMap) {
      style += stylesMap[key] ? key.replace(/[A-Z]/, l => '-' + l.toLowerCase()) + ':' + stylesMap[key] + ';' : '';
    }
  }

  $: {
    if(isMarked($appMode, $newTimeSpan, $currentWeek, week)) {
      // TODO: Marked style...
      style = 'background: #00c3ff;';
    }
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
    background: var(--grey);
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
    outline: 2px solid var(--black);
  }

  .is-disabled {
    pointer-events: none;
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
