<script>
  import { fade } from "svelte/transition";
  import { get } from "svelte/store";
  import { onMount } from "svelte";
  import DaysList from "../components/DaysList.svelte";
  import Workout from "../components/Workout.svelte";
  import { user } from "../store/auth";
  import { exercises, selectedDay, today } from "../store/workout";
  import { getUserDays, getDayExercises } from "../providers/api";

  let days = [];

  onMount(async () => {
    let u = get(user);
    days = await getUserDays(u.token, u.user.ID);
  });

  async function selectToday() {
    let u = get(user);
    let day = get(today);
    selectedDay.set(day);
    exercises.set(await getDayExercises(u.token, u.user.ID, day));
  }
</script>

<style>
  h2 {
    display: block;
  }
</style>

<div transition:fade={{ duration: 2000 }}>
  <h2>Welcome {$user.user.username}!</h2>
  <button on:click={selectToday}>Select Today</button>
  <div class="pure-g">
    <div class="pure-u-1 pure-u-md-1-3">
      <DaysList bind:days />
    </div>
    <div class="pure-u-1 pure-u-md-2-3">
      <Workout />
    </div>
  </div>

</div>
