<script>
  import {appMode} from './stores';
  import CloseIcon from './img/close.svg';
</script>

<div class="edit-time-spans">
  <div class="title">Edit time spans</div>

  <a class="close" on:click={() => $appMode = 'default'}>
    {@html CloseIcon}
  </a>
</div>

<style>
  .edit-time-spans {
    position: fixed;
    left: 1rem;
    top: 1rem;
    border: 1px solid var(--black);
    padding: 1rem;
    min-width: 12rem;
    background: white;
    border-radius: 0.3rem;
    box-shadow: 0 0 2px 0 var(--black);
  }

  .title {
    font-weight: 900;
    text-transform: uppercase;
  }

  .close {
    position: absolute;
    right: 0.3rem;
    top: 0.3rem;
    cursor: pointer;
  }
</style>
