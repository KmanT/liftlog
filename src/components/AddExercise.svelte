<script>
  import { getContext } from "svelte";
  import { addExercise, getDayExercises } from "../providers/api";
  import { timeToSeconds } from "../providers/formatter";
  import { user } from "../store/auth";
  import { exercises, selectedDay } from "../store/workout";
  import { get } from "svelte/store";

  const { close } = getContext("simple-modal");
  const units = ["LB", "KG", "none"];

  let timed = false;
  let name = "";
  let weight = 0;
  let sets = 0;
  let reps = 0;

  let selectedUnit = "LB";
  let time = {
    hours: 0,
    minutes: 0,
    seconds: 0
  };

  async function submitExercise() {
    let u = get(user);
    let day = get(selectedDay);
    let exercise = {
      user_id: u.user.ID,
      date: day,
      name,
      sets
    };
    if (timed) {
      exercise.time = timeToSeconds(time);
    } else {
      exercise.reps = reps;
      exercise.weight = weight;
      selectedUnit === "none"
        ? (exercise.unit = "")
        : (exercise.unit = selectedUnit);
    }

    const newExercise = await addExercise(u.token, exercise);
    const newList = [await newExercise.Value, ...get(exercises)];
    exercises.set(await newList);

    close();
  }
</script>

<form
  class="pure-form pure-form-aligned"
  on:submit|preventDefault={submitExercise}>
  <div class="pure-control-group">
    <label for="exName">Exercise Name</label>
    <input required type="text" bind:value={name} name="exName" />
  </div>

  <div class="pure-control-group">
    <label for="signupbox">Timed?</label>
    <input type="checkbox" bind:checked={timed} name="signupbox" />
  </div>

  <div class="pure-control-group">
    <label for="sets">Sets</label>
    <input required type="number" bind:value={sets} name="sets" />
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
      <input type="number" bind:value={weight} name="hours" />
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
      <input type="number" bind:value={reps} name="reps" />
    </div>
  {/if}
  <input type="submit" value="Submit" class="pure-button" />
</form>
