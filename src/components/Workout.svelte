<script>
  import Icon from "svelte-awesome";
  import {
    faDumbbell,
    faStopwatch,
    faEdit,
    faTrash,
    faPlus
  } from "@fortawesome/free-solid-svg-icons";
  import { onMount, getContext } from "svelte";
  import AddExercise from "./AddExercise.svelte";
  import EditExercise from "./EditExercise.svelte";
  import ConfirmDelete from "./ConfirmDelete.svelte";
  import { formatDay, formatTime } from "../providers/formatter";
  import { readable, get } from "svelte/store";
  import { user } from "../store/auth";
  import { selectedDay, exercises } from "../store/workout";
  import { getDayExercises } from "../providers/api";

  const { open } = getContext("simple-modal");

  const modalStyle = {
    bg: {
      //position: "absolute",
      "overflow-y": "auto",
      "width": "100%",
      "height": "100%"
    }
  };

  onMount(async () => {
    let u = get(user);
    let date = get(selectedDay);
    exercises.set(await getDayExercises(u.token, u.user.ID, date));
  });

  function showAddExercise() {
    open(AddExercise, {}, modalStyle);
  }

  function showEditExercise(exercise, index) {
    open(EditExercise, { exercise, index }, modalStyle);
  }

  function showConfirmDelete(exercise, index) {
    open(ConfirmDelete, { exercise, index, styleBg }, modalStyle);
  }
</script>

<style>
  .current-day {
    padding-left: 0.5em;
  }

  .day-label,
  .exercise-row {
    display: block;
  }

  .day-label {
    font-size: 1.5em;
    font-weight: bold;
    padding-bottom: 0.5em;
  }
</style>

<div class="current-day">
  <span class="day-label">{formatDay($selectedDay)}</span>
  {#if $exercises.length <= 0}
    <p>No exercises added yet.</p>
  {/if}
  {#each $exercises as exercise, i}
    <div class="exercise-row">
      {#if exercise.reps > 0}
        <div class="pure-u-2-3">
          <Icon data={faDumbbell} scale={2} />
          {exercise.name}: {exercise.weight === 0 ? '' : exercise.weight}{exercise.unit}
          {exercise.sets} x {exercise.reps}
        </div>
      {:else if exercise.time > 0}
        <div class="pure-u-2-3">
          <Icon data={faStopwatch} scale={2} />
          {exercise.name}: {formatTime(exercise.time)}
        </div>
      {/if}
      <div class="pure-u-1-4">
        <button class="pure-button" on:click={showEditExercise(exercise, i)}>
          <Icon data={faEdit} />
          Edit
        </button>
        <button class="pure-button" on:click={showConfirmDelete(exercise, i)}>
          <Icon data={faTrash} />
          Delete
        </button>
      </div>
    </div>
  {/each}

  <button class="pure-button" on:click={showAddExercise}>
    <Icon data={faPlus} />
    Add Exercise
  </button>

</div>
