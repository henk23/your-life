<script>
  import {currentWeek} from './stores';
  import {stringify} from './DateUtils';

  export let week;
  let today = stringify(new Date());

  const classMap = {
    'is-past': () => week.startDate < today,
    'is-now': () => week.startDate <= today && week.endDate >= today,
  };

  function getClassNames() {
    let classNames = ['week'];

    for(let className in classMap) {
      if(classMap[className]()) {
        classNames.push(className);
      }
    }

    return classNames.join(' ');
  }
</script>

<div class="week-wrapper" on:mouseenter={() => $currentWeek = week} on:mouseleave={() => $currentWeek = null}>
  <div class={getClassNames()}/>
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
