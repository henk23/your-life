<script>
  import {makeStyleString} from './utils';

  export let timeSpan;
</script>

<div class="span">
  <div class="dot-wrapper">
    <div class="dot" style={makeStyleString(timeSpan.style)}/>
  </div>
  <div class="text">
    <div class="category">{timeSpan.category}</div>
    <strong>{timeSpan.name}</strong><br>
    {timeSpan.startDate} - {timeSpan.endDate}
    {#if timeSpan.description}
      <div class="description">{timeSpan.description}</div>
    {/if}
  </div>
</div>

<style>
  .span {
    display: flex;
    align-items: flex-start;
    font-size: 0.8rem;
  }

  .dot-wrapper {
    margin-top: 0.5rem;
  }

  .dot {
    border: 1px solid var(--black);
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    box-sizing: border-box;
    margin-right: 0.4rem;
  }

  .description {
    white-space: pre-wrap;
  }
</style>
