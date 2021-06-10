<script>
  import {appMode, timeSpans, editIdx} from './stores';
  import {save} from './storageService';
  import SpanDetail from './SpanDetail.svelte';

  import CloseIcon from './img/close.svg';
  import EditIcon from './img/edit.svg';
  import UpIcon from './img/arrow-up.svg';
  import DownIcon from './img/arrow-down.svg';

  function move(idx, direction) {
    [$timeSpans[idx + direction], $timeSpans[idx]] = [$timeSpans[idx], $timeSpans[idx + direction]];
    save('timeSpans', $timeSpans);
  }
</script>

<div class="edit-time-spans">
  <div class="title">Edit time spans</div>

  <p class="info">
    For overlapping time spans, styles from farther down in this list will appear "on top".
  </p>

  <a class="close" on:click={() => $appMode = 'default'}>
    {@html CloseIcon}
  </a>

  <div class="spans-list" class:is-disabled={$editIdx !== null}>
    {#each $timeSpans as timeSpan, idx}
      <SpanDetail timeSpan={timeSpan}/>
      <div class="buttons">
        <button on:click={() => $editIdx = idx}>{@html EditIcon}</button>
        {#if idx > 0}
          <button on:click={() => move(idx, -1)}>{@html UpIcon}</button>
        {/if}
        {#if idx < $timeSpans.length - 1}
         <button on:click={() => move(idx, 1)}>{@html DownIcon}</button>
        {/if}
      </div>
    {/each}
  </div>
</div>

<style>
  .edit-time-spans {
    position: fixed;
    left: 1rem;
    top: 1rem;
    border: 1px solid var(--black);
    padding: 1rem;
    width: 15rem;
    background: white;
    border-radius: 0.3rem;
    box-shadow: 0 0 2px 0 var(--black);
    max-height: calc(100vh - 4rem);
    overflow: auto;
  }

  .is-disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  .title {
    font-weight: 900;
    text-transform: uppercase;
  }

  .info {
    font-size: 0.8rem;
  }

  .close {
    position: absolute;
    right: 0.3rem;
    top: 0.3rem;
    cursor: pointer;
  }

  .buttons {
    padding-left: 1.6rem;
    padding-top: 0.2rem;
  }

  .buttons button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.3rem;
  }

  .buttons :global(svg) {
    height: 1em;
  }
</style>
