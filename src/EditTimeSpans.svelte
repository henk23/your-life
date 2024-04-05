<script>
  import {appMode, timeSpans, editIdx} from './stores';
  import {save} from './storageService';
  import SpanDetail from './SpanDetail.svelte';

  import CloseIcon from './img/close.svg?raw';
  import EditIcon from './img/edit.svg?raw';
  import TrashIcon from './img/trash.svg?raw';
  import UpIcon from './img/arrow-up.svg?raw';
  import DownIcon from './img/arrow-down.svg?raw';

  function move(idx, direction) {
    [$timeSpans[idx + direction], $timeSpans[idx]] = [$timeSpans[idx], $timeSpans[idx + direction]];
    save('timeSpans', $timeSpans);
  }

  function remove(idx) {
    if(!window.confirm('Really delete?')) {
      return;
    }

    $timeSpans = [
      ...$timeSpans.slice(0, idx),
      ...$timeSpans.slice(idx + 1),
    ];

    save('timeSpans', $timeSpans);
  }
</script>

<div class="edit-time-spans">
  <div class="title">Edit time spans</div>

  <p class="info">
    For overlapping time spans, styles farther down will appear "on top".
  </p>

  <a class="close" on:click={() => $appMode = 'default'}>
    {@html CloseIcon}
  </a>

  <div class="spans-list" class:is-disabled={$editIdx !== null}>
    {#each $timeSpans as timeSpan, idx}
      <div class="list-item">
        <SpanDetail timeSpan={timeSpan}/>
        <div class="buttons">
          <button on:click={() => $editIdx = idx}>{@html EditIcon}</button>
          <button on:click={() => remove(idx)}>{@html TrashIcon}</button>
          {#if idx > 0}
            <button on:click={() => move(idx, -1)}>{@html UpIcon}</button>
          {/if}
          {#if idx < $timeSpans.length - 1}
           <button on:click={() => move(idx, 1)}>{@html DownIcon}</button>
          {/if}
        </div>
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
    width: 18rem;
    background: white;
    border-radius: 0.3rem;
    box-shadow: 0 0 2px 0 var(--black);
  }

  .spans-list {
    overflow: auto;
    max-height: calc(100vh - 9rem);
  }

  .list-item {
    margin-bottom: 1rem;
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
    width: 1em;
  }
</style>
