// script.js - handles navigation, packages dropdown, slideshow, gallery modal, forms, year

document.addEventListener('DOMContentLoaded', () => {
  /* ====== NAV - mobile toggle ====== */
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  navToggle?.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  /* ====== PACKAGES DROPDOWN (click toggle; closes on outside click) ====== */
  const packagesDropdown = document.getElementById('packages-dropdown');
  const packagesBtn = packagesDropdown?.querySelector('.dropbtn');
  const packagesMenu = document.getElementById('packages-menu');

  if (packagesBtn && packagesDropdown) {
    packagesBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const open = packagesDropdown.classList.toggle('open');
      packagesBtn.setAttribute('aria-expanded', String(open));
    });

    // Close dropdown when clicking outside
    window.addEventListener('click', (ev) => {
      if (!ev.target.closest('#packages-dropdown')) {
        packagesDropdown.classList.remove('open');
        packagesBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // close on Escape
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        packagesDropdown.classList.remove('open');
        packagesBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ====== HERO SLIDESHOW (auto + pause on hover) ====== */
  const slides = Array.from(document.querySelectorAll('.hero-slideshow .slide'));
  let slideIndex = slides.findIndex(s => s.classList.contains('active'));
  if (slideIndex < 0) slideIndex = 0;
  let slideTimer = null;
  const SLIDE_INTERVAL = 6000;

  function showSlide(i) {
    slides.forEach((s, idx) => s.classList.toggle('active', idx === i));
    slideIndex = i;
  }
  function nextSlide() { showSlide((slideIndex + 1) % slides.length); }
  function startSlides() { stopSlides(); slideTimer = setInterval(nextSlide, SLIDE_INTERVAL); }
  function stopSlides() { if (slideTimer) { clearInterval(slideTimer); slideTimer = null; } }

  if (slides.length > 0) {
    startSlides();
    const heroSlideshow = document.getElementById('hero-slideshow');
    heroSlideshow?.addEventListener('mouseenter', stopSlides);
    heroSlideshow?.addEventListener('mouseleave', startSlides);
  }

  /* ====== GALLERY - click to open modal ====== */
  const galleryGrid = document.getElementById('gallery-grid');
  const modal = document.getElementById('imgModal');
  const modalImage = document.getElementById('modalImage');
  const modalClose = document.getElementById('modal-close');

  if (galleryGrid && modal && modalImage) {
    galleryGrid.addEventListener('click', (e) => {
      const img = e.target.closest('img');
      if (!img) return;
      modalImage.src = img.src;
      modalImage.alt = img.alt || '';
      modal.style.display = 'flex';
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });

    modalClose?.addEventListener('click', closeModal);
    // click outside to close
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });

    function closeModal() {
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
      modalImage.src = '';
      document.body.style.overflow = '';
    }
  }

  /* ====== Footer year injection ====== */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ====== Booking Form (demo submit) ====== */
  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const form = new FormData(bookingForm);
      const name = form.get('name') || 'Guest';
      alert(`Thanks ${name}! We received your inquiry. We'll contact you soon.`);
      bookingForm.reset();
    });
  }

  /* ====== Quick Estimate (demo) ====== */
  const quickEstimateBtn = document.getElementById('quick-estimate');
  quickEstimateBtn?.addEventListener('click', () => {
    const travellers = Number(bookingForm?.querySelector('input[name="travellers"]')?.value || 1);
    const budget = bookingForm?.querySelector('select[name="budget"]')?.value || 'mid';
    const base = budget === 'budget' ? 320 : budget === 'luxury' ? 980 : 540;
    const estimate = travellers * base;
    alert(`Approx estimate for ${travellers} traveller(s): USD ${estimate.toLocaleString()}\n(This is a rough estimate.)`);
  });

});
