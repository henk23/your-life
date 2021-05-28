<script>
  import {currentWeek, showStyles, timeSpans, eventBus} from './stores';
  import {stringify} from './dateUtils';

  export let week;
  let today = stringify(new Date());
  let classNames;

  $: {
    const classMap = {
      'is-past': $showStyles.past && week.endDate < today,
      'is-now': $showStyles.now && week.startDate <= today && week.endDate >= today,
    };

    let classCollection = ['week'];

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

<div class="week-wrapper"
     on:mouseenter={() => $currentWeek = week} on:mouseleave={() => $currentWeek = null}
     on:click={() => eventBus.dispatch('click', week)}>
  <div class={classNames}/>
</div>

<style>
  .week-wrapper {
    padding: 0.1rem;
  }

  .week-wrapper:hover .week {
    background: var(--red-dark) !important;
  }

  .week {
    border: 1px solid var(--black);
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
  }

  .is-past {
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

  .is-now {
    animation: blinkNow 2s infinite;
  }

  .bloop {
    background: red !important;
  }
</style>
