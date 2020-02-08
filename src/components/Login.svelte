<script>
  import { login } from "../providers/api";
  import { user, loggedIn } from "../store/auth";
  //export let user;

  let userInfo = {
    email: null,
    password: null
  };

  let wrong = false;

  async function handleLogin() {
    const res = await login(userInfo.email, userInfo.password, userInfo.username);

    if (await res.message === "Invalid login credentials. Please try again") {
      wrong = true;
    } else {
      user.set(await res);
      wrong = false;
      loggedIn.set(true); 
    }
    
  }

  function validateMessageEmail(event) {
    let textbox = event.target;
    if (textbox.value === "") {
      textbox.setCustomValidity("Required email address");
    } else if (textbox.validity.typeMismatch) {
      textbox.setCustomValidity("please enter a valid email address");
    } else {
      textbox.setCustomValidity("");
    }
    return true;
  }
</script>

<div id="login">
  <h2>Login</h2>
  <form
    on:submit|preventDefault={handleLogin}
    on:invalid={validateMessageEmail}
    on:changed={validateMessageEmail}
    on:input={validateMessageEmail}>
    <div class="pure-control-group">
      <label for="txtEmail">Email</label>
      <input required type="email" id="txtEmail" bind:value={userInfo.email} />
    </div>
    <div class="pure-control-group">
      <label for="txtPassword">Password</label>
      <input
        required
        type="password"
        id="txtPassword"
        bind:value={userInfo.password} />
    </div>

    <input type="submit" value="Log in" class="pure-button" />
  </form>
  {#if wrong}
     <p class="err-message">Wrong username or password.</p>
  {/if}
</div>
