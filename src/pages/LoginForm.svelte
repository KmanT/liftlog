<script>
  import { fade } from 'svelte/transition';
  import Login from "../components/Login.svelte";
  import Signup from "../components/Signup.svelte";
  
  let signup = false;
</script>

<style>
  .container {
    text-align: left;
  }
</style>

<div transition:fade="{{duration: 10}}" class="container pure-form pure-form-aligned">
  {#if signup}
    <Signup />
  {:else}
    <Login />
  {/if}
  <div class="pure-control-group">
    <label for="signupbox">Sign up</label>
    <input type="checkbox" bind:checked={signup} name="signupbox" />
  </div>

</div>
