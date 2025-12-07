/* ============================
   script.js — Full site behavior
   - nav toggle (mobile)
   - packages dropdown
   - hero slideshow
   - booking form submit
   - quick estimate helper
   - populate reviews sample
   - language toggle
   - update year
   ============================ */

document.addEventListener('DOMContentLoaded', () => {

  /* -------------------------
     Mobile nav toggle
     ------------------------- */
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  navToggle?.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    // close any dropdown inside when opening/closing
    const openDropdown = navLinks.querySelector('.open-dropdown');
    openDropdown?.classList.remove('open-dropdown');
  });

  // close mobile nav when clicking a link (good UX)
  navLinks?.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && window.innerWidth < 760) {
      navLinks.classList.remove('open');
    }
  });

  /* -------------------------
     Packages dropdown (desktop + mobile)
     HTML structure required:
     <li class="dropdown">
       <a class="dropbtn">Packages ▾</a>
       <ul class="dropdown-menu"> ... </ul>
     </li>
     ------------------------- */
  const dropdowns = document.querySelectorAll('.nav-links .dropdown');

  dropdowns.forEach(drop => {
    const btn = drop.querySelector('.dropbtn');
    const menu = drop.querySelector('.dropdown-menu');

    // toggle on click
    btn?.addEventListener('click', (ev) => {
      ev.preventDefault();
      ev.stopPropagation();

      // close other dropdowns first
      document.querySelectorAll('.nav-links .open-dropdown').forEach(d => {
        if (d !== drop) d.classList.remove('open-dropdown');
      });

      drop.classList.toggle('open-dropdown');

      // if we're on small screens, also ensure nav is open
      if (window.innerWidth < 760) {
        navLinks.classList.add('open');
      }
    });
  });

  // close dropdowns when clicking outside
  window.addEventListener('click', (e) => {
    // if click did not happen inside any dropdown
    if (!e.target.closest('.nav-links .dropdown')) {
      document.querySelectorAll('.nav-links .open-dropdown').forEach(d => d.classList.remove('open-dropdown'));
    }
  });

  /* -------------------------
     Hero slideshow
     - Finds elements with class "slide".
     - The first slide with class "active" is the starting slide.
     - Auto-rotates every X seconds. Also supports click-through by advancing with .nextSlide()
     ------------------------- */
  const slides = Array.from(document.querySelectorAll('.hero-slideshow .slide'));
  let slideIndex = slides.findIndex(s => s.classList.contains('active'));
  if (slideIndex < 0) slideIndex = 0;
  const SLIDE_INTERVAL = 6000; // ms

  function showSlide(n){
    slides.forEach((s, i) => {
      s.classList.toggle('active', i === n);
    });
  }

  function nextSlide(){
    if (!slides.length) return;
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
  }

  // start auto-rotate if there are multiple slides
  let slideTimer = null;
  if (slides.length > 1){
    slideTimer = setInterval(nextSlide, SLIDE_INTERVAL);

    // pause on hover (desktop)
    const hero = document.querySelector('.hero');
    hero?.addEventListener('mouseenter', () => { if (slideTimer) clearInterval(slideTimer); });
    hero?.addEventListener('mouseleave', () => { slideTimer = setInterval(nextSlide, SLIDE_INTERVAL); });
  }

  /* -------------------------
     Booking form handling
     - Simple client-side validation + friendly UI feedback.
     - Replace with AJAX or server endpoint integration as needed.
     ------------------------- */
  const bookingForm = document.getElementById('booking-form');
  if (bookingForm){
    bookingForm.addEventListener('submit', (ev) => {
      ev.preventDefault();
      // Basic gather
      const formData = new FormData(bookingForm);
      const name = formData.get('name') || '';
      const email = formData.get('email') || '';
      const phone = formData.get('phone') || '';
      const travellers = formData.get('travellers') || 1;
      const destination = formData.get('destination') || 'not set';

      // Minimal validation (HTML required already helps)
      // Show a friendly success message in place of submit (simple, non-blocking)
      const success = document.createElement('div');
      success.className = 'booking-success';
      success.style.marginTop = '12px';
      success.style.padding = '12px';
      success.style.borderRadius = '8px';
      success.style.background = '#ecfdf5';
      success.style.color = '#064e3b';
      success.innerText = `Thanks ${name || 'traveller'} — we received your inquiry for ${destination}. We will contact you at ${email || phone}.`;

      // remove prior messages
      const existing = bookingForm.querySelector('.booking-success');
      if (existing) existing.remove();

      bookingForm.appendChild(success);

      // Optionally: reset form after short delay
      setTimeout(() => {
        bookingForm.reset();
      }, 1600);

      // TODO: hook this into your server endpoint (fetch/axios) when ready.
      console.log('Booking form data:', Object.fromEntries(formData.entries()));
    });
  }

  /* -------------------------
     Quick estimate helper
     - Uses number of travellers and budget select to produce a rough estimate
     ------------------------- */
  const quickBtn = document.getElementById('quick-estimate');
  if (quickBtn){
    quickBtn.addEventListener('click', () => {
      const travellersEl = bookingForm?.querySelector('input[name="travellers"]');
      const travellers = Math.max(1, Number(travellersEl?.value || 2));
      const budget = bookingForm?.querySelector('select[name="budget"]')?.value || 'mid';
      // Rough per-person baseline (USD) — adjust to your pricing
      const baseline = { budget: 220, mid: 420, luxury: 920 };
      const perPerson = baseline[budget] || baseline.mid;
      const estimate = (perPerson * travellers).toLocaleString(undefined, { maximumFractionDigits: 0 });
      // Show estimate
      const msg = document.createElement('div');
      msg.className = 'quick-estimate-msg';
      msg.style.marginTop = '12px';
      msg.style.padding = '12px';
      msg.style.borderRadius = '8px';
      msg.style.background = '#fff7ed';
      msg.style.color = '#7c2d12';
      msg.innerText = `Quick estimate: ~USD ${estimate} for ${travellers} traveller(s) (${budget} tier). This is a ballpark — for exact pricing, submit the inquiry.`;

      // remove existing
      const prior = bookingForm.querySelector('.quick-estimate-msg');
      if (prior) prior.remove();
      bookingForm.appendChild(msg);
    });
  }

  /* -------------------------
     Quote button in hero (opens booking section)
     ------------------------- */
  const quoteBtn = document.getElementById('quote-btn');
  quoteBtn?.addEventListener('click', () => {
    const bookingSection = document.getElementById('booking');
    if (bookingSection){
      bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // focus first input
      const firstInput = bookingSection.querySelector('input, textarea, select');
      firstInput?.focus();
    }
  });

  /* -------------------------
     Populate reviews (sample)
     Replace with server data when available
     ------------------------- */
  const reviewsList = document.getElementById('reviews-list');
  if (reviewsList){
    const sample = [
      { name: 'Anna M.', text: 'Incredible experience — great guides and perfect logistics.' },
      { name: 'Paul K.', text: 'We saw the Big Five on day one. Highly recommended.' },
      { name: 'Lina R.', text: 'Friendly guides and lovely camps. Would book again.' }
    ];
    // Create simple cards
    const wrapper = document.createElement('div');
    wrapper.style.display = 'grid';
    wrapper.style.gridTemplateColumns = 'repeat(auto-fit,minmax(220px,1fr))';
    wrapper.style.gap = '12px';

    sample.forEach(r => {
      const card = document.createElement('div');
      card.style.padding = '14px';
      card.style.borderRadius = '10px';
      card.style.background = '#fff';
      card.style.boxShadow = '0 8px 24px rgba(8,20,16,0.06)';
      card.innerHTML = `<strong>${r.name}</strong><p style="margin:8px 0 0;color:#4b5563">${r.text}</p>`;
      wrapper.appendChild(card);
    });

    reviewsList.appendChild(wrapper);
  }

  /* -------------------------
     Language toggle (simple toggle)
     - Toggles text inside the button; extend to load strings
     ------------------------- */
  const langToggle = document.getElementById('lang-toggle');
  if (langToggle){
    langToggle.addEventListener('click', () => {
      const current = langToggle.innerText.trim().toUpperCase();
      langToggle.innerText = current === 'EN' ? 'SW' : 'EN'; // swap to Swahili short code
      // For full i18n: load text resources and replace copy across the page.
    });
  }

  /* -------------------------
     Update copyright year
     ------------------------- */
  const yearEl = document.getElementById('year');
  if (yearEl){
    const y = new Date().getFullYear();
    yearEl.textContent = y;
  }

  /* -------------------------
     Small accessibility: keyboard close for dropdowns / Escape key
     ------------------------- */
  window.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape'){
      // close nav on small screens
      if (navLinks?.classList.contains('open')) navLinks.classList.remove('open');
      // close any dropdowns
      document.querySelectorAll('.nav-links .open-dropdown').forEach(d => d.classList.remove('open-dropdown'));
    }
  });

});
