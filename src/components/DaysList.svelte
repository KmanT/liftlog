<script>
  import { get } from "svelte/store";
  import { formatDay } from "../providers/formatter";
  import { user } from "../store/auth";
  import { selectedDay, exercises } from "../store/workout";
  import { getDayExercises } from "../providers/api";
  export let days;

  async function selectDay(day) {
    selectedDay.set(day);
    let u = get(user);
    exercises.set(await getDayExercises(u.token, u.user.ID, day));
  }
</script>

<style>
  .day-row {
    background-color: rgba(138, 243, 255, 1);
    cursor: pointer;
    padding-top: 2em;
    padding-bottom: 2em;
    margin-bottom: 0.25em;
  }

  .day-row:nth-child(even) {
    background-color: #ccc;
  }

  .day-text {
    margin-left: 1em;
  }
</style>

{#if days === null || days.length === 0}
  No days to list here. Add an exercise to get started!
{:else}
  {#each days as day}
    <div class="day-row" on:click={selectDay(day)}>
      <span class="day-text">{formatDay(day)}</span>
    </div>
  {/each}
{/if}
