<script>
  import {currentWeek, showStyles, timeSpans} from './stores';
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

    classNames = classCollection.join(' ');
  }
</script>

<div class="week-wrapper" on:mouseenter={() => $currentWeek = week} on:mouseleave={() => $currentWeek = null}>
  <div class={classNames}/>
</div>

<style>
  .week-wrapper {
    padding: 0.1rem;
  }

  .week-wrapper:hover .week {
    background: var(--green-dark);
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
      background: var(--green-light);
    }
    50%, 100% {
      background: transparent;
    }
  }

  .is-now {
    animation: blinkNow 1s infinite;
  }
</style>
