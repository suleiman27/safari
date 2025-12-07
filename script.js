// MOBILE NAV
const navToggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");

navToggle.onclick = () => {
  navLinks.classList.toggle("open");
};

// HERO SLIDESHOW
let index = 0;
const slides = document.querySelectorAll(".slide");

function changeSlide() {
  slides.forEach(s => s.classList.remove("active"));
  index = (index + 1) % slides.length;
  slides[index].classList.add("active");
}
setInterval(changeSlide, 4000);

// YEAR
document.getElementById("year").textContent = new Date().getFullYear();

// GALLERY MODAL
const modal = document.getElementById("img-modal");
const modalImg = document.getElementById("modal-img");
const modalClose = document.getElementById("modal-close");
const galleryImgs = document.querySelectorAll(".gallery-img");

galleryImgs.forEach(img => {
  img.onclick = () => {
    modal.style.display = "flex";
    modalImg.src = img.src;
  };
});

modalClose.onclick = () => modal.style.display = "none";
modal.onclick = (e) => {
  if (e.target === modal) modal.style.display = "none";
};
