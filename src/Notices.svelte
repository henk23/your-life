<script>
  import {load, save} from './storageService';

  let hideMobileNotice = load('hideMobileNotice');
  let hidePrivacyNotice = load('hidePrivacyNotice');

  function removeMobileNotice() {
    hideMobileNotice = true;
    save('hideMobileNotice', true);
  }

  function removePrivacyNotice() {
    hidePrivacyNotice = true;
    save('hidePrivacyNotice', true);
  }
</script>

{#if !hidePrivacyNotice}
  <div class="prv-notice">
    This app does not collect or store any personal data.
    Everything will be saved in your browserʼs memory.<br>
    <strong>If you delete your cookies, all will be gone.</strong><br>
    <button on:click={removePrivacyNotice}>Ok</button>
  </div>
{/if}

{#if !hideMobileNotice}
  <div class="mobile-notice">
    While this app should theoretically work on mobile devices,
    you'll have a much better experience on screens with at least 1280 pixels in width.<br>
    <button on:click={removeMobileNotice}>Ok</button>
  </div>
{/if}

<style>
  .prv-notice {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    background: var(--sky);
    text-align: center;
    padding: 1rem;
    z-index: 10;
    box-sizing: border-box;
  }

  .prv-notice button {
    padding: 0.3rem;
    margin-top: 0.5rem;
  }

  .mobile-notice {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    background: salmon;
    text-align: center;
    padding: 1rem;
    z-index: 20;
    box-sizing: border-box;
  }

  .mobile-notice button {
    padding: 0.3rem;
    margin-top: 0.5rem;
  }

  @media (min-width: 1280px) {

    .mobile-notice {
      display: none;
    }
  }
</style>
