// Show dropdown on click
document.querySelector(".dropbtn").addEventListener("click", () => {
  document.querySelector(".dropdown-content").classList.toggle("show");
});

// Close dropdown when clicking outside
window.addEventListener("click", function(e) {
  if (!e.target.matches(".dropbtn")) {
    document.querySelector(".dropdown-content").classList.remove("show");
  }
});
