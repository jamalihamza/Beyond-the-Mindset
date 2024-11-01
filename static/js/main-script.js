document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll(".w-nav-link");

  navLinks.forEach(link => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("w--current"); // Adds the active style class
    } else {
      link.classList.remove("w--current"); // Ensures no extra links have it
    }
  });
});

// Function to check screen width and redirect
function checkScreenWidth() {
  if (window.innerWidth < 991) {
    window.location.href = "/device-soon"; // Change to the URL of your "Mobile Coming Soon" page
  }
}

// Check screen width on page load
window.onload = checkScreenWidth;

// Check screen width whenever the window is resized
window.onresize = checkScreenWidth;
