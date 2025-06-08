// active-link.js// This script highlights the active link in the navigation bar based on the current URL path.

const path = window.location.pathname.replace(/\/$/, "").replace(".html", "");

document.querySelectorAll("nav a").forEach(link => {
  const linkPath = new URL(link.href).pathname.replace(/\/$/, "").replace(".html", "");

  if (path === linkPath) {
    link.classList.add("text-teal-700", "font-bold");
  }
});

