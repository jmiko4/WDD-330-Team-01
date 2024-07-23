document.addEventListener("DOMContentLoaded", function () {
  const banner = document.getElementById("promoBanner");
  const closeButton = document.getElementById("closeBanner");

  // Show the banner (example: always show until closed)
  banner.style.display = "block";

  // Close button functionality
  closeButton.addEventListener("click", function () {
    banner.style.display = "none";
  });
});
