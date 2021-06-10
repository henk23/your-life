<script>
  export let dateString;
  export let startYear;

  let year = dateString.substr(0, 4);
  let month = dateString.substr(5, 2);
  let day = dateString.substr(8, 2);

  $: {
    dateString = `${year}-${month}-${day}`;

    // Check for valid date
    const date = new Date(dateString);
    if(isNaN(date.getTime())) {
      day = '28';
      dateString = `${year}-${month}-${day}`;
    }
  }
</script>

<select bind:value={year}>
  {#each [...Array(100).keys()].map(y => (startYear + y).toString()) as year}
    <option>{year}</option>
  {/each}
</select>
-
<select bind:value={month}>
  {#each [...Array(12).keys()].map(m => (m + 1).toString().padStart(2, '0')) as month}
    <option>{month}</option>
  {/each}
</select>
-
<select bind:value={day}>
  {#each [...Array(31).keys()].map(d => (d + 1).toString().padStart(2, '0')) as day}
    <option>{day}</option>
  {/each}
</select>
