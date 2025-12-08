/* -------------------- NAV TOGGLE -------------------- */
const navToggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");

navToggle && navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
});

/* -------------------- DROPDOWN (click to open) -------------------- */
document.querySelectorAll(".dropdown-btn").forEach(btn => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    const parent = this.parentElement;

    // Close other dropdowns
    document.querySelectorAll(".dropdown").forEach(d => {
      if (d !== parent) d.classList.remove("show");
    });

    // Toggle this one
    parent.classList.toggle("show");

    // Update aria-expanded
    const expanded = parent.classList.contains("show");
    this.setAttribute("aria-expanded", expanded ? "true" : "false");
  });
});

// Close dropdowns when clicking outside
document.addEventListener("click", (e) => {
  if (!e.target.closest(".dropdown")) {
    document.querySelectorAll(".dropdown").forEach(d => d.classList.remove("show"));
    document.querySelectorAll(".dropdown-btn").forEach(b => b.setAttribute("aria-expanded","false"));
  }
});

/* -------------------- HERO SLIDESHOW -------------------- */
(function () {
  const slides = document.querySelectorAll(".hero-slideshow .slide");
  if (!slides || slides.length === 0) return;
  let idx = 0;
  function showNext() {
    slides.forEach(s => s.classList.remove("active"));
    idx = (idx + 1) % slides.length;
    slides[idx].classList.add("active");
  }
  setInterval(showNext, 5000);
})();

/* -------------------- GALLERY MODAL -------------------- */
const galleryItems = document.querySelectorAll(".gallery-item");
const modal = document.getElementById("img-modal");
const modalImg = document.getElementById("modal-img");
const modalClose = document.getElementById("modal-close");

galleryItems.forEach(img => {
  img.addEventListener("click", () => {
    modalImg.src = img.src;
    modalImg.alt = img.alt || '';
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
  });
});

modalClose && modalClose.addEventListener("click", () => {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  modalImg.src = "";
});

modal && modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    modalImg.src = "";
  }
});

/* -------------------- FOOTER YEAR -------------------- */
document.getElementById("year").textContent = new Date().getFullYear();

/* -------------------- BOOKING FORM (simple handler) -------------------- */
const bookingForm = document.getElementById("booking-form");
if (bookingForm) {
  bookingForm.addEventListener("submit", function (e) {
    e.preventDefault();
    // Simple client-side acknowledge
    alert("Thank you! Your inquiry has been received. We'll contact you shortly.");
    bookingForm.reset();
  });
}

/* -------------------- QUICK ESTIMATE (example) -------------------- */
const quickBtn = document.getElementById("quick-estimate");
quickBtn && quickBtn.addEventListener("click", () => {
  alert("Quick estimate: Please provide travel dates and number of travellers for a tailored quote.");
});

/* -------------------- Optional: Close open menus on ESC -------------------- */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll(".dropdown").forEach(d => d.classList.remove("show"));
    if (modal) modal.classList.remove("show");
  }
});
