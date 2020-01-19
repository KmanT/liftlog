<script>
  import { getContext } from "svelte";
  import { deleteExercise, getDayExercises } from "../providers/api";
  import { user } from "../store/auth";
  import { exercises, selectedDay } from "../store/workout";
  import { get } from "svelte/store";

  const { close } = getContext("simple-modal");

  export let index;
  export let exercise;

  async function deleteAndClose() {
      let u = get(user);

      const response = await deleteExercise(u.token, exercise.ID);
      const exerciseList = get(exercises).splice(index, 1);
      exercises.set(exerciseList);
      close();
  }

</script>

<style>
.confirm-container {
    padding-top: 1em;
}

.question-label {
    font-size: 1.5em;
    font-weight: bold;
    padding-bottom: 0.5em;
}

.yes {
    text-align: right;
}

.yes, .no {
    padding-left: .5em;
    padding-right: .5em;
}

</style>

<span class="question-label">Are you sure you want delete this exercise from workout list?</span>
<div class="pure-g confirm-container">
    <div class="pure-u-1-2">
        <button class="pure-button yes" on:click={deleteAndClose}>Yes</button>
    </div>
    <div class="pure-u-1-2">
        <button class="pure-button no" on:click={close}>No</button>
    </div>
</div>