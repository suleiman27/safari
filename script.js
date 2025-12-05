// Sample packages data (would normally come from server)
const packages = [
  {
    id: 'mara-3-mid',
    title: '3-Day Masai Mara Safari — Mid-range',
    budget: 'mid',
    days: 3,
    destination: 'Masai Mara',
    highlights: ['Big 5', 'Great Migration (seasonal)', 'Game drives', 'Balloon option'],
    price: null, // null => request quote
    season: 'Jul - Oct',
    image: 'mara.jpg',
    itinerary: [
      'Day 1: Drive to Masai Mara. Afternoon game drive.',
      'Day 2: Full day game drives. Optional balloon safari.',
      'Day 3: Morning game drive then return to Nairobi.'
    ]
  },
  {
    id: 'amb-2-budget',
    title: '2-Day Amboseli Safari — Budget',
    budget: 'budget',
    days: 2,
    destination: 'Amboseli',
    highlights: ['Elephant herds', 'Views of Kilimanjaro'],
    price: 220, // example per person
    season: 'Year-round',
    image: 'amboseli.jpg',
    itinerary: ['Day 1: Drive to Amboseli. Afternoon game drive.', 'Day 2: Morning game drive, return.']
  }
]

function $qs(sel){return document.querySelector(sel)}
function $qa(sel){return Array.from(document.querySelectorAll(sel))}

// Populate year in footer
$qs('#year').textContent = new Date().getFullYear()

// Mobile nav toggle
$qs('#nav-toggle').addEventListener('click', ()=>{
  $qs('#nav-links').classList.toggle('show')
})

// Render packages
function renderPackages(list){
  const grid = $qs('#packages-grid')
  grid.innerHTML = ''
  list.forEach(p => {
    const el = document.createElement('article')
    el.className = 'package'
    el.innerHTML = `
      <img src="${p.image}" alt="${p.title}">
      <h3>${p.title}</h3>
      <div class="meta">${p.days} days • ${p.destination} • ${p.season}</div>
      <p>${p.highlights.slice(0,3).join(' • ')}</p>
      <div style="display:flex;gap:8px;margin-top:10px">
        <button class="btn btn-outline" data-id="${p.id}" onclick="viewItinerary('${p.id}')">View Itinerary</button>
        <button class="btn btn-primary" onclick="openBooking('${p.title}')">Request Quote</button>
      </div>
    `
    grid.appendChild(el)
  })
}
renderPackages(packages)

// View itinerary modal
function viewItinerary(id){
  const p = packages.find(x=>x.id===id)
  if(!p) return
  const body = $qs('#itinerary-body')
  body.innerHTML = `<h3>${p.title}</h3><p><strong>Highlights:</strong> ${p.highlights.join(', ')}</p><ol>${p.itinerary.map(i=>`<li>${i}</li>`).join('')}</ol>`
  $qs('#itinerary-modal').style.display='flex'
}
$qs('#modal-close').addEventListener('click', ()=> $qs('#itinerary-modal').style.display='none')
$qs('#itinerary-modal').addEventListener('click', (e)=>{ if(e.target===$qs('#itinerary-modal')) $qs('#itinerary-modal').style.display='none'})

// Open booking prefill
function openBooking(title){
  window.location.hash = '#booking'
  const notes = $qs('textarea[name=notes]')
  if(notes) notes.value = `Interested in: ${title}`
  window.scrollTo({top: $qs('#booking').offsetTop-20, behavior: 'smooth'})
}

// Filters
$qs('#filter-budget').addEventListener('change', applyFilters)
$qs('#filter-duration').addEventListener('change', applyFilters)
$qs('#filter-destination').addEventListener('change', applyFilters)
$qs('#search-pack').addEventListener('input', applyFilters)

function applyFilters(){
  const b = $qs('#filter-budget').value
  const d = $qs('#filter-duration').value
  const dest = $qs('#filter-destination').value
  const q = $qs('#search-pack').value.toLowerCase()
  let list = packages.filter(p=>{
    if(b!=='all' && p.budget!==b) return false
    if(d!=='all' && String(p.days)!==d) return false
    if(dest!=='all' && p.destination!==dest) return false
    if(q && !p.title.toLowerCase().includes(q)) return false
    return true
  })
  renderPackages(list)
}

// Quick estimate calculator (simple)
$qs('#quick-estimate').addEventListener('click', ()=>{
  const people = Number($qs('input[name=travellers]').value) || 1
  const dest = $qs('select[name=destination]').value || 'Masai Mara'
  const days = Number($qs('#filter-duration').value) || 3
  // a naive per-person per-day rate
  const rate = dest.includes('Amboseli') ? 80 : 120
  const estimate = people * days * rate
  alert(`Quick estimate: approx $${estimate} (USD). This is a rough quote.`)
})

// Booking form submit
$qs('#booking-form').addEventListener('submit', (e)=>{
  e.preventDefault()
  const data = new FormData(e.target)
  // Here you would POST to your backend. For now: show success message
  alert('Thank you! Your enquiry has been received. We will respond via WhatsApp or email.')
  e.target.reset()
})

// Simple gallery & blog placeholders
const galleryGrid = $qs('#gallery-grid')
const sampleImgs = ['animals1.jpg','camps1.jpg','drive1.jpg','clients1.jpg','vehicles1.jpg']
sampleImgs.forEach(src=>{ const d = document.createElement('div'); d.className='img'; d.style.backgroundImage=`url(${src})`; d.style.backgroundSize='cover'; d.style.backgroundPosition='center'; galleryGrid.appendChild(d) })

const blogList = $qs('#blog-list')
const blogItems = ['Best time to visit Kenya','What to pack for safari','Masai Mara vs Amboseli','Kenya budget safari options','Hot-air balloon safari guide']
blogItems.forEach(b=>{ const li=document.createElement('li'); li.textContent=b; blogList.appendChild(li) })

// Multi-language toggle (very basic)
const langBtn = $qs('#lang-toggle')
langBtn.addEventListener('click', ()=>{
  langBtn.textContent = langBtn.textContent === 'EN' ? 'FR' : 'EN'
  alert('Language toggle sample — implement translations for full multilingual support.')
})

// Pre-fill destinations cards
const destCards = $qs('#dest-cards')
const destList = ['Masai Mara','Amboseli','Tsavo East','Tsavo West','Lake Nakuru','Samburu','Diani + Safari','Nairobi National Park']
destList.forEach(d=>{ const card=document.createElement('div'); card.className='dest-card'; card.textContent=d; card.addEventListener('click', ()=> window.location.href=`destinations/${d.toLowerCase().replace(/\s+/g,'-').replace('+','plus')}.html`); destCards.appendChild(card) })

// Reviews placeholders
const reviewsList = $qs('#reviews-list')
['Facebook','Google','TripAdvisor','WhatsApp screenshots'].forEach(r=>{ const el=document.createElement('div'); el.className='review-card'; el.textContent=r; reviewsList.appendChild(el) })

// SEO & performance notes (to implement on server):
// - Serve images with modern formats (webp)
// - Add gzip/brotli, caching headers
// - Acquire SSL certificate (Let's Encrypt)
