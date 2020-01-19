<script>
  import { getContext } from "svelte";
  import { editExercise, getDayExercises } from "../providers/api";
  import { secondsToTime, timeToSeconds } from "../providers/formatter";
  import { user } from "../store/auth";
  import { exercises, selectedDay } from "../store/workout";
  import { get } from "svelte/store";

  export let index;
  export let exercise;

  const { close } = getContext("simple-modal");
  const timed = exercise.time !== 0;
  const units = ["LB", "KG", "none"];
  let time = secondsToTime(exercise.time);
  let selectedUnit = exercise.unit;

  async function submitExercise() {
    let u = get(user);

    if (timed) {
      exercise.time = timeToSeconds(time);
    } else {
      exercise.unit = selectedUnit;
      selectedUnit === "none"
        ? (exercise.unit = "")
        : (exercise.unit = selectedUnit);
    }

    const newExercise = await editExercise(u.token, exercise);
    let exerciseList = get(exercises)
    exerciseList[index] = await newExercise;
    exercises.set(await exerciseList);
    close();
  }
</script>

<form
  class="pure-form pure-form-aligned"
  on:submit|preventDefault={submitExercise}>
  <div class="pure-control-group">
    <label for="exName">Exercise Name</label>
    <input required type="text" bind:value={exercise.name} name="exName" />
  </div>

  <!-- <div class="pure-control-group">
    <label for="signupbox">Timed?</label>
    <input type="checkbox" bind:checked={timed} name="signupbox" />
  </div> -->

  <div class="pure-control-group">
    <label for="sets">Sets</label>
    <input required type="number" bind:value={exercise.sets} name="sets" />
  </div>

  {#if timed}
    <div class="pure-control-group">
      <label for="hours">Hours</label>
      <input type="number" bind:value={time.hours} name="hours" />
    </div>
    <div class="pure-control-group">
      <label for="minutes">Minutes</label>
      <input type="number" bind:value={time.minutes} name="minutes" />
    </div>
    <div class="pure-control-group">
      <label for="seconds">Seconds</label>
      <input type="number" bind:value={time.seconds} name="seconds" />
    </div>
  {:else}
    <div class="pure-control-group">
      <label for="weight">Weight</label>
      <input type="number" bind:value={exercise.weight} name="hours" />
    </div>
    <div class="pure-control-group">
      <label for="unit">Unit</label>
      <select bind:value={selectedUnit}>
        {#each units as unit}
          <option value={unit}>{unit}</option>
        {/each}
      </select>
    </div>
    <div class="pure-control-group">
      <label for="reps">Reps</label>
      <input type="number" bind:value={exercise.reps} name="reps" />
    </div>
  {/if}
  <input type="submit" value="Submit" class="pure-button" />
</form>
