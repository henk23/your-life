<script>
  import {dobString} from './stores';
  import {add} from './dateUtils';
  import {save} from './storageService';
  import DatePicker from './DatePicker.svelte';

  let startYear = add(new Date(), -99, 'years').getFullYear();

  $: {
    save('dateOfBirth', $dobString);
  }
</script>

<div class="dob-picker">
  Your day of birth: <DatePicker bind:dateString={$dobString} startYear={startYear}/>
</div>
