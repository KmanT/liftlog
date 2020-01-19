<script>
  import { signup } from "../providers/api";
  import { user, loggedIn } from "../store/auth";
  //export let loggedIn;
  //export let user;
  let userInfo = {
    username: null,
    email: null,
    password: null
  };

  async function handleSignup() {
    user.set(await signup(userInfo.email, userInfo.password, userInfo.username));
    loggedIn.set(true);
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

<div id="signup">
  <h2>Sign up</h2>
  <form
    on:submit|preventDefault={handleSignup}
    on:invalid={validateMessageEmail}
    on:changed={validateMessageEmail}
    on:input={validateMessageEmail}>

    <div class="pure-control-group">
      <label for="txtName">Username</label>
      <input required type="text" id="txtName" bind:value={userInfo.username} />
    </div>
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

    <input type="submit" value="Sign up" class="pure-button" />
  </form>

</div>
