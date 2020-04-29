import awsmobile from "./aws-exports";

const { host } = window.location;

// Fix issues with multiple redirect urls.
// Try to figure out which one to use...
if (awsmobile.oauth.redirectSignIn.includes(",")) {
  const filterHost = (url) => new URL(url).host === host;
  awsmobile.oauth.redirectSignIn = awsmobile.oauth.redirectSignIn.split(",").filter(filterHost).shift();
  awsmobile.oauth.redirectSignOut = awsmobile.oauth.redirectSignOut.split(",").filter(filterHost).shift();
}
export default awsmobile;
