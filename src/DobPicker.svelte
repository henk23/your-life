<script>
  import {dobString} from './stores';
  import {add} from './dateUtils';
  import {save} from './storageService';

  let startYear = add(new Date(), -100, 'years').getFullYear();

  let birthyear = $dobString.substr(0, 4);
  let birthmonth = $dobString.substr(5, 2);
  let birthday = $dobString.substr(8, 2);

  $: {
    $dobString = `${birthyear}-${birthmonth}-${birthday}`;

    // Check for valid date
    const date = new Date($dobString);
    if(isNaN(date.getTime())) {
      birthday = '28';
      $dobString = `${birthyear}-${birthmonth}-${birthday}`;
    }

    save('dateOfBirth', $dobString);
  }
</script>

<div class="dob-picker">
  Your day of birth:
  <select bind:value={birthyear}>
    {#each [...Array(100).keys()].map(y => (startYear + y + 1).toString()) as year}
      <option value={year}>{year}</option>
    {/each}
  </select>
  -
  <select bind:value={birthmonth}>
    {#each [...Array(12).keys()].map(m => (m + 1).toString().padStart(2, '0')) as month}
      <option value={month}>{month}</option>
    {/each}
  </select>
  -
  <select bind:value={birthday}>
    {#each [...Array(31).keys()].map(d => (d + 1).toString().padStart(2, '0')) as day}
      <option value={day}>{day}</option>
    {/each}
  </select>
</div>

<style>
    .dob-picker {
        margin: 2rem 0;
    }
</style>
