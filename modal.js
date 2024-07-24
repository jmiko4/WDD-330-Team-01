document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("registerModal");
  const closeModal = document.getElementsByClassName("close")[0];

  function isFirstVisit() {
    return !localStorage.getItem("visited");
  }

  function markVisited() {
    localStorage.setItem("visited", "true");
  }

  if (isFirstVisit()) {
    modal.style.display = "block";
    markVisited();
  }

  closeModal.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
});
