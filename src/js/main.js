import { loadHeaderFooter } from "./utils.mjs";
import { submissionConfirmation } from "./utils.mjs";

document.addEventListener("DOMContentLoaded", async function () {
  await loadHeaderFooter();
});

document.addEventListener("DOMContentLoaded", submissionConfirmation());
