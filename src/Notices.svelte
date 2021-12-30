<script>
  import {load, save} from './storageService';

  let hideMobileNotice = load('hideMobileNotice');
  let hidePrivacyNotice = load('hidePrivacyNotice');
  let hideUpdatesUntil = load('hideUpdatesUntil');

  let updateDate = '2021-12-30';
  let isUpdateVisible = !hideUpdatesUntil || hideUpdatesUntil < updateDate;

  function removeMobileNotice() {
    hideMobileNotice = true;
    save('hideMobileNotice', true);
  }

  function removePrivacyNotice() {
    hidePrivacyNotice = true;
    save('hidePrivacyNotice', true);
  }

  function hideUpdatesNotice() {
    isUpdateVisible = false;
    save('hideUpdatesUntil', updateDate);
  }
</script>

{#if !hidePrivacyNotice}
  <div class="prv-notice">
    I do not collect or store any of your personal data.
    Everything is saved in your browser’s memory for your eyes only.<br>
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

{#if isUpdateVisible}
  <div class="update-notice">
    <div class="update-head">Update {updateDate}</div>
    <p>
      Hey you!
    </p>
    <p>
      It's been over 6 months since this app was launched and people still seem to be using it,
      which makes me really happy. :)
      So thank you! I'm hoping you have a good time keeping track of your life!
    </p>
    <p>
      I decided to implement <strong>two little updates:</strong>
    </p>
    <p>
      You can now <strong>import and export</strong> your data via the settings menu.
      This way you can easily backup everything and switch to another browser or computer.
    </p>
    <p>
      Also, for each time span, you can now add a short <strong>description</strong> which was a feature request
      I received multiple times.
    </p>
    <p>
      For feedback, write me an email to mail (at) heiko-salmon (dot) de
    </p>
    <button on:click={hideUpdatesNotice}>Hide until next update</button>
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

  .update-notice {
    position: fixed;
    left: 1rem;
    bottom: 1rem;
    border: 1px solid var(--black);
    padding: 1rem;
    min-width: 12rem;
    max-width: 16rem;
    background: white;
    border-radius: 0.3rem;
    box-shadow: 0 0 2px 0 var(--black);
  }

  .update-head {
    font-weight: 600;
    margin-bottom: 1rem;
  }
</style>
