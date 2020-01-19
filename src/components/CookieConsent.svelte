<script>
import {createCookieExp} from '../providers/cookies';
let clicked;

function closeCookieConsent() {
    clicked = true;
    let expires = createCookieExp(new Date());
    document.cookie = "cookiesAgreed=true; expires=" + expires;
}


</script>
<style>
  /*Cookie Consent Begin*/
  #cookieConsent {
    background-color: rgba(20, 20, 20, 0.8);
    min-height: 26px;
    font-size: 14px;
    color: #ccc;
    line-height: 26px;
    padding: 8px 0 8px 30px;
    position: fixed;
    display: block;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999;
  }
  #cookieConsent a {
    color: #4b8ee7;
    text-decoration: none;
  }
  #closeCookieConsent {
    float: right;
    display: inline-block;
    cursor: pointer;
    height: 20px;
    width: 20px;
    margin: -15px 0 0 0;
    font-weight: bold;
  }
  #closeCookieConsent:hover {
    color: #fff;
  }
  #cookieConsent button.cookieConsentOK {
    background-color: #f1d600;
    color: #000;
    display: inline-block;
    padding: 0 20px;
    cursor: pointer;
    float: right;
    margin: 0 60px 0 10px;
  }
  #cookieConsent button.cookieConsentOK:hover {
    background-color: #e0c91f;
  }
  /*Cookie Consent End*/
</style>

<div id="cookieConsent" style="display: {clicked ? 'none' : 'block'}">
  <span id="closeCookieConsent" on:click={closeCookieConsent}>x</span>
  This website is using cookies. By continuing to use this site, you consent to the privacy policy.
  <a
    href="https://html-online.com/privacy-terms-and-conditions/"
    target="_blank">
    More info
  </a>
  .
  <button class="cookieConsentOK pure-button" on:click={closeCookieConsent}>That's Fine</button>
</div>
