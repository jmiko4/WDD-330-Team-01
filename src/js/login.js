import { login } from "./auth.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();
const redirect = getParam("redirect");

document.querySelector("#loginButton").addEventListener("click", () => {
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  login({ email, password }, redirect);
});
