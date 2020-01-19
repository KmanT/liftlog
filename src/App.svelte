<script>
  import Icon from "svelte-awesome";
  import { faDumbbell } from "@fortawesome/free-solid-svg-icons";
  import PureCcs from "../node_modules/purecss/build/pure-min.css";
  import PureGrids from "../node_modules/purecss/build/grids-responsive-min.css";
  import Modal from "svelte-simple-modal";
  import { cookiesToJson } from "./providers/cookies";
  import { user, cookiesAgreed, token, loggedIn } from "./store/auth";
  import LoginForm from "./pages/LoginForm.svelte";
  import Main from "./pages/Main.svelte";
  import CookieConsent from "./components/CookieConsent.svelte";

  let cookies = cookiesToJson(document.cookie);
  cookiesAgreed.set(cookies.cookiesAgreed);
</script>

<style>
  .menu-bar {
    background-color: rgba(216, 17, 89, 1);
    display: block;
  }
  .pure-menu-heading {
    color: #fff;
    font-size: 1.5em;
  }
  .container {
    margin-top: 20%;
  }
  .login-form {
    width: 100%;
    padding: 1em;
    margin: 0 auto;
  }

  .days {
    width: 100%;
    padding: 1em;
    margin: 0 auto;
  }
  :global(.pure-button) {
    /*background-color: rgba(24, 169, 153, 1);*/
    background-color: rgba(216, 17, 89, 1);
    color: #fff;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }

    .container {
      margin-top: 10%;
    }

    .days, .login-form {
      width: 75%;
    }
  }
</style>

<Modal>
  <main>
    <div class="pure-menu pure-menu-horizontal pure-menu-fixed menu-bar">
      <h1 class="pure-menu-heading">
        <Icon data={faDumbbell} scale={2} />
        LiftLog
      </h1>
    </div>

    <div class="container">
      {#if !$loggedIn}
        <div class="login-form">
          <LoginForm />
        </div>
      {:else}
        <div class="days">
          <Main />
        </div>
      {/if}
    </div>

    {#if !$cookiesAgreed}
      <CookieConsent />
    {/if}
  </main>
</Modal>
