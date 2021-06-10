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
  </div>
</div>

<style>
  .span {
    margin-top: 1rem;
    display: flex;
    align-items: center;
    font-size: 0.8rem;
  }

  .dot {
    border: 1px solid var(--black);
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    box-sizing: border-box;
    margin-right: 0.4rem;
  }
</style>
