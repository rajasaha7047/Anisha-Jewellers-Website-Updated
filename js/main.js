/* ============ CONFIG ============ */
const WA = '916295721021';
const WA2 = '916297813053';

/* ============ DATA ============ */
const products = [
  {id:'NA-R-001',name:'Classic Gold Bangle',category:'Bangles',metal:'Gold',img:'images/catalogue/enhanced/gold-bangle.webp',hoverImg:'images/catalogue/enhanced/real-bangles.webp',imgs:['images/catalogue/enhanced/gold-bangle.webp','images/catalogue/enhanced/real-bangles.webp','images/catalogue/enhanced/traditional-bangle.webp'],tag:'Bestseller'},
  {id:'NA-R-002',name:'White Flower Bangle',category:'Bangles',metal:'Gold',img:'images/catalogue/enhanced/white-flower-bangle.webp',hoverImg:'images/catalogue/enhanced/traditional-bangle.webp',imgs:['images/catalogue/enhanced/white-flower-bangle.webp','images/catalogue/enhanced/traditional-bangle.webp','images/catalogue/enhanced/gold-bangle.webp'],tag:'New'},
  {id:'NA-R-003',name:'Red & Silver Bangle Set',category:'Silver',metal:'Silver',img:'images/catalogue/enhanced/red-silver-bangles.webp',hoverImg:'images/catalogue/enhanced/traditional-bangle.webp',imgs:['images/catalogue/enhanced/red-silver-bangles.webp','images/catalogue/enhanced/traditional-bangle.webp']},
  {id:'NA-R-004',name:'Traditional Motif Bangle',category:'Bangles',metal:'Gold',img:'images/catalogue/enhanced/traditional-bangle.webp',hoverImg:'images/catalogue/enhanced/gold-bangle.webp',imgs:['images/catalogue/enhanced/traditional-bangle.webp','images/catalogue/enhanced/gold-bangle.webp']},
  {id:'NA-R-005',name:'Pearl Choker',category:'Necklaces',metal:'Gold',img:'images/catalogue/enhanced/pearl-choker.webp',hoverImg:'images/catalogue/enhanced/pearl-choker-detail.webp',imgs:['images/catalogue/enhanced/pearl-choker.webp','images/catalogue/enhanced/pearl-choker-detail.webp','images/catalogue/enhanced/real-necklace.webp'],tag:'Trending'},
  {id:'NA-R-006',name:'Pearl Choker Detail',category:'Necklaces',metal:'Gold',img:'images/catalogue/enhanced/pearl-choker-detail.webp',hoverImg:'images/catalogue/enhanced/pearl-choker.webp',imgs:['images/catalogue/enhanced/pearl-choker-detail.webp','images/catalogue/enhanced/pearl-choker.webp']},
  {id:'NA-R-007',name:'Silver Ring Collection',category:'Silver',metal:'Silver',img:'images/catalogue/enhanced/silver-rings.webp',hoverImg:'images/catalogue/enhanced/real-rings.webp',imgs:['images/catalogue/enhanced/silver-rings.webp','images/catalogue/enhanced/real-rings.webp']},
  {id:'NA-R-008',name:'Silver Ring Display',category:'Rings',metal:'Silver',img:'images/catalogue/enhanced/real-rings.webp',hoverImg:'images/catalogue/enhanced/silver-rings.webp',imgs:['images/catalogue/enhanced/real-rings.webp','images/catalogue/enhanced/silver-rings.webp']},
  {id:'NA-R-009',name:'Gold Bangle Display',category:'Bangles',metal:'Gold',img:'images/catalogue/enhanced/real-bangles.webp',hoverImg:'images/catalogue/enhanced/gold-bangle.webp',imgs:['images/catalogue/enhanced/real-bangles.webp','images/catalogue/enhanced/gold-bangle.webp']},
  {id:'NA-R-010',name:'Gold Earring',category:'Earrings',metal:'Gold',img:'images/catalogue/enhanced/real-earrings.webp',hoverImg:'images/catalogue/enhanced/real-necklace.webp',imgs:['images/catalogue/enhanced/real-earrings.webp','images/catalogue/enhanced/real-necklace.webp']},
  {id:'NA-R-011',name:'Gold Necklace',category:'Necklaces',metal:'Gold',img:'images/catalogue/enhanced/real-necklace.webp',hoverImg:'images/catalogue/enhanced/pearl-choker.webp',imgs:['images/catalogue/enhanced/real-necklace.webp','images/catalogue/enhanced/pearl-choker.webp']},
  {id:'NA-R-013',name:'Gold Ring Detail',category:'Rings',metal:'Gold',img:'images/catalogue/enhanced/real-ring-detail.webp',hoverImg:'images/catalogue/enhanced/silver-rings.webp',imgs:['images/catalogue/enhanced/real-ring-detail.webp','images/catalogue/enhanced/silver-rings.webp']}
];

const faqs = [
  {q:'Do you sell BIS Hallmark certified jewellery?',a:'Yes. Every gold piece we sell is BIS Hallmark certified with proper HUID marking for authenticity.'},
  {q:'How can I check the price of a product?',a:'Click the "Enquire" button on any product or message us on WhatsApp. Our team will share the current price, weight, and purity.'},
  {q:'Do you offer custom jewellery design?',a:'Yes. Share a reference image with us on WhatsApp and we will craft it for you.'},
  {q:'What are your store timings?',a:'We are open daily from 9:00 AM to 8:00 PM. You can also book an appointment in advance.'},
  {q:'Do you deliver outside Bikour?',a:'Yes, we can arrange delivery. Please contact us on WhatsApp for shipping details and charges.'},
  {q:'What is your return/exchange policy?',a:'We offer easy exchange within 7 days of purchase with original receipt and packaging.'}
];

/* ============ STATE ============ */
let currentCategory = 'All';
let currentSearch = '';
let shortlist = JSON.parse(localStorage.getItem('anishaShortlist') || '[]');
let currentPage = 'home';

const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

/* ============ ROUTER ============ */
function parseHash() {
  const h = (location.hash || '#home').slice(1);
  const parts = h.split('/');
  return { page: parts[0] || 'home', param: parts[1] ? decodeURIComponent(parts[1]) : null };
}

function navigate(page, param) {
  const hash = param ? `#${page}/${param}` : `#${page}`;
  if (location.hash === hash) handleRoute();
  else location.hash = hash;
}

function handleRoute() {
  const { page, param } = parseHash();
  const validPages = ['home','collections','product','bridal','gallery','gold-rate','reviews','faq','appointment','about','visit'];
  const targetPage = validPages.includes(page) ? page : 'notfound';

  closeMobileMenu();
  closeDrawer();
  closeLightbox();
  closeSearch();
  hideStickyBar();

  $$('.page-section').forEach(s => s.classList.remove('active'));
  const target = $(`#${targetPage}-page`);
  if (!target) return;
  target.classList.add('active');
  currentPage = targetPage;

  $$('[data-nav]').forEach(el => {
    el.classList.toggle('active', el.dataset.nav === targetPage);
  });

  if (targetPage === 'collections') {
    if (param) {
      currentCategory = param;
      $$('.filter-btn').forEach(b => b.classList.toggle('active', b.dataset.category === param));
    }
    renderProducts();
  }
  if (targetPage === 'product' && param) openProduct(param);
  if (targetPage === 'faq') renderFAQ();
  if (targetPage === 'home') renderFeatured();

  const saved = sessionStorage.getItem(`scroll-${page}`);
  window.scrollTo({ top: saved ? parseInt(saved) : 0, behavior: 'instant' });
  requestAnimationFrame(() => initReveal());
}

window.addEventListener('hashchange', handleRoute);
window.addEventListener('scroll', () => {
  sessionStorage.setItem(`scroll-${currentPage}`, window.scrollY);
}, { passive: true });

/* ============ MOBILE MENU ============ */
function toggleMobileMenu() {
  const m = $('#mobile-menu');
  if (m.classList.contains('open')) closeMobileMenu();
  else { m.classList.add('open'); document.body.classList.add('lock'); }
}
function closeMobileMenu() {
  $('#mobile-menu')?.classList.remove('open');
  document.body.classList.remove('lock');
}

/* ============ HEADER SCROLL ============ */
let ticking = false;
window.addEventListener('scroll', () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const y = window.scrollY;
    $('#site-header')?.classList.toggle('scrolled', y > 30);
    const p = $('#scroll-progress');
    if (p) {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      p.style.width = h > 0 ? `${(y / h) * 100}%` : '0';
    }
    // Sticky product bar
    const sb = $('#sticky-bar');
    if (sb && currentPage === 'product') {
      const info = $('.product-detail-info');
      if (info) {
        const rect = info.getBoundingClientRect();
        sb.classList.toggle('show', rect.top < -100);
      }
    }
    ticking = false;
  });
}, { passive: true });

/* ============ PRODUCT RENDER ============ */
function renderCard(p) {
  const saved = shortlist.includes(p.id);
  const wa = waForProduct(p);
  const tagCls = p.tag === 'New' ? 'gold' : p.tag === 'Trending' ? 'rose' : 'emerald';
  const hover = p.hoverImg ? `<img class="img-hover" src="${p.hoverImg}" alt="" loading="lazy">` : '';
  return `<article class="product-card">
    <div class="product-photo" data-view="${p.id}">
      ${p.tag ? `<span class="badge ${tagCls}">${p.tag}</span>` : ''}
      <img class="img-main" src="${p.img}" loading="lazy" alt="${p.name}">
      ${hover}
      <div class="product-overlay">
        <button class="quick-btn" data-view="${p.id}">View</button>
        <button class="quick-btn ${saved ? 'active' : ''}" data-shortlist="${p.id}">${saved ? '✓ Saved' : '♡ Shortlist'}</button>
        <a class="quick-btn primary" href="${wa}" target="_blank" rel="noopener" onclick="event.stopPropagation()">WhatsApp</a>
      </div>
    </div>
    <div class="product-info">
      <h3>${p.name}</h3>
      <div class="product-meta"><span>${p.id}</span><span>${p.metal}</span></div>
      <div class="product-actions-mobile">
        <button data-view="${p.id}">View</button>
        <button class="${saved ? 'shortlisted' : ''}" data-shortlist="${p.id}">${saved ? '✓ Saved' : '♡ Save'}</button>
        <a class="wa" href="${wa}" target="_blank" rel="noopener">WhatsApp</a>
      </div>
    </div>
  </article>`;
}

function renderProducts() {
  const grid = $('#product-grid');
  if (!grid) return;
  const arr = products.filter(p => {
    const catOk = currentCategory === 'All' || p.category === currentCategory ||
      (currentCategory === 'Gold' && p.metal === 'Gold') ||
      (currentCategory === 'Silver' && p.metal === 'Silver');
    const q = `${p.name} ${p.id} ${p.category} ${p.metal}`.toLowerCase();
    return catOk && q.includes(currentSearch.toLowerCase());
  });
  const sort = $('#sort-select')?.value || 'featured';
  if (sort === 'name') arr.sort((a, b) => a.name.localeCompare(b.name));
  if (sort === 'category') arr.sort((a, b) => a.category.localeCompare(b.category));
  grid.innerHTML = arr.length ? arr.map(renderCard).join('')
    : '<p class="empty-state" style="grid-column:1/-1;text-align:center;padding:80px 0">No designs found.</p>';
  bindCardEvents();
  updateCounts();
  initReveal();
}

function renderFeatured() {
  const f = $('#featured-grid');
  if (!f) return;
  f.innerHTML = products.slice(0, 8).map(renderCard).join('');
  bindCardEvents();
  initReveal();
}

function bindCardEvents() {
  $$('[data-shortlist]').forEach(b => {
    b.onclick = e => { e.stopPropagation(); toggleShortlist(b.dataset.shortlist); };
  });
  $$('[data-view]').forEach(b => {
    b.onclick = e => { e.stopPropagation(); navigate('product', b.dataset.view); };
  });
}

/* ============ PRODUCT DETAIL ============ */
function openProduct(id) {
  const p = products.find(x => x.id === id);
  if (!p) { navigate('collections'); return; }
  const wa = waForProduct(p);
  const saved = shortlist.includes(p.id);
  const imgs = p.imgs && p.imgs.length ? p.imgs : [p.img];

  const similar = products.filter(x => x.id !== p.id && (x.category === p.category || x.metal === p.metal)).slice(0, 4);

  const c = $('#product-detail-container');
  if (!c) return;
  c.innerHTML = `
    <button class="pd-back" onclick="history.back()">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
      Back
    </button>
    <div class="product-detail-layout">
      <div class="product-gallery">
        <div class="product-gallery-main">
          <img id="pd-main-img" src="${imgs[0]}" alt="${p.name}">
        </div>
        ${imgs.length > 1 ? `<div class="product-gallery-thumbs">
          ${imgs.map((src, i) => `<div class="thumb ${i===0?'active':''}" data-img="${src}"><img src="${src}" alt=""></div>`).join('')}
        </div>` : ''}
      </div>
      <div class="product-detail-info">
        <span class="eyebrow">${p.id} · ${p.metal}</span>
        <h1>${p.name}</h1>
        <div class="pd-rating">
          <span class="pd-stars">★★★★★</span>
          <span>Verified reviews</span>
        </div>
        <p class="lead">Exquisitely crafted with the finest materials. BIS Hallmark certified for purity. Price, weight, and availability on request.</p>
        <div class="pd-specs">
          <div><span>Metal</span><strong>${p.metal}</strong></div>
          <div><span>Category</span><strong>${p.category}</strong></div>
          <div><span>Certification</span><strong>BIS Hallmark</strong></div>
          <div><span>Availability</span><strong>In Stock</strong></div>
        </div>
        <div class="pd-actions">
          <a class="btn btn-solid btn-block" href="${wa}" target="_blank" rel="noopener">Enquire on WhatsApp</a>
          <a class="btn btn-ghost btn-block" href="#appointment">Book Consultation</a>
          <button class="btn btn-ghost btn-block" onclick="toggleShortlist('${p.id}')">
            ${saved ? '❤️ Saved in Shortlist' : '♡ Add to Shortlist'}
          </button>
        </div>
      </div>
    </div>

    <div class="pd-reviews">
      <div class="section-num"><i>◆</i>Customer Reviews</div>
      <h3>What customers say</h3>
      <div class="pd-reviews-grid">
        <div class="pd-review"><div class="pd-review-head"><span>S</span><div><strong>Suman Das</strong><small>Verified · 2 weeks ago</small></div></div><p>"Beautiful craftsmanship. The finish is impeccable — very happy with the purchase."</p></div>
        <div class="pd-review"><div class="pd-review-head"><span>P</span><div><strong>Priya Roy</strong><small>Verified · 1 month ago</small></div></div><p>"Exactly as shown. The team was very helpful on WhatsApp. Will definitely visit again."</p></div>
        <div class="pd-review"><div class="pd-review-head"><span>R</span><div><strong>Rahul Sen</strong><small>Verified · 1 month ago</small></div></div><p>"Great quality and honest pricing. Recommended for anyone buying gold."</p></div>
      </div>
    </div>

    ${similar.length ? `<div class="pd-similar">
      <div class="section-num"><i>◆</i>You May Also Like</div>
      <h3>Similar Designs</h3>
      <div class="product-grid">${similar.map(renderCard).join('')}</div>
    </div>` : ''}
  `;
  bindCardEvents();
  initReveal();

  $$('.thumb').forEach(t => {
    t.onclick = () => {
      $$('.thumb').forEach(x => x.classList.remove('active'));
      t.classList.add('active');
      $('#pd-main-img').src = t.dataset.img;
    };
  });

  updateStickyBar(p);
}

function updateStickyBar(p) {
  const sb = $('#sticky-bar');
  if (!sb) return;
  sb.innerHTML = `<div class="sticky-inner">
    <img src="${p.img}" alt="">
    <div class="sticky-info">
      <strong>${p.name}</strong>
      <small>${p.id} · ${p.metal}</small>
    </div>
    <a href="${waForProduct(p)}" target="_blank" rel="noopener" class="sticky-btn">Enquire</a>
  </div>`;
}

function hideStickyBar() {
  $('#sticky-bar')?.classList.remove('show');
}

/* ============ SHORTLIST ============ */
function toggleShortlist(id) {
  const wasSaved = shortlist.includes(id);
  if (wasSaved) shortlist = shortlist.filter(x => x !== id);
  else shortlist.push(id);
  localStorage.setItem('anishaShortlist', JSON.stringify(shortlist));
  updateCounts();
  updateShortlist();
  renderProducts();
  renderFeatured();
  if (currentPage === 'product') openProduct(id);
  showToast(wasSaved ? 'Removed from shortlist' : 'Saved to shortlist');
}

function updateCounts() {
  const a = $('#wishlist-count'), b = $('#mobile-wishlist-count');
  if (a) a.textContent = shortlist.length;
  if (b) b.textContent = shortlist.length;
}

function updateShortlist() {
  const box = $('#shortlist-items');
  if (!box) return;
  if (!shortlist.length) {
    box.innerHTML = '<p class="empty-state">No designs shortlisted yet.</p>';
    return;
  }
  box.innerHTML = shortlist.map(id => {
    const p = products.find(x => x.id === id);
    if (!p) return '';
    return `<div class="short-item">
      <img src="${p.img}" alt="${p.name}">
      <div><strong>${p.name}</strong><small>${p.id} · ${p.metal}</small></div>
      <button class="drawer-remove" data-remove="${p.id}">×</button>
    </div>`;
  }).join('');
  $$('.drawer-remove').forEach(b => b.onclick = () => toggleShortlist(b.dataset.remove));
}

function openDrawer() {
  updateShortlist();
  const d = $('#drawer');
  d.classList.add('open');
  d.setAttribute('aria-hidden', 'false');
  document.body.classList.add('lock');
}
function closeDrawer() {
  const d = $('#drawer');
  if (!d) return;
  d.classList.remove('open');
  d.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('lock');
}

/* ============ WHATSAPP ============ */
function waForProduct(p) {
  const msg = `Hello New Anisha Jewellers, I am interested in ${p.name} (${p.id}). Please share current price, weight, purity and availability.`;
  return `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
}

/* ============ LIGHTBOX ============ */
function closeLightbox() {
  const l = $('#lightbox');
  if (!l) return;
  l.classList.remove('open');
  l.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('lock');
}

/* ============ FAQ ============ */
function renderFAQ() {
  const c = $('#faq-container');
  if (!c) return;
  c.innerHTML = faqs.map((f, i) => `
    <div class="faq-item" data-q="${f.q.toLowerCase()}">
      <button class="faq-question" onclick="toggleFAQ(${i})" aria-expanded="false">
        <span>${f.q}</span>
        <span class="faq-icon">+</span>
      </button>
      <div class="faq-answer">${f.a}</div>
    </div>`).join('');
}
function toggleFAQ(i) {
  $$('.faq-item').forEach((item, idx) => {
    if (idx === i) {
      item.classList.toggle('open');
      item.querySelector('.faq-question').setAttribute('aria-expanded', item.classList.contains('open'));
    } else {
      item.classList.remove('open');
      item.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
    }
  });
}
function searchFAQ(q) {
  const query = q.trim().toLowerCase();
  $$('.faq-item').forEach(item => {
    item.style.display = item.dataset.q.includes(query) ? '' : 'none';
  });
}

/* ============ APPOINTMENT ============ */
function handleAppointment(e) {
  e.preventDefault();
  const text = `*New Appointment Request*\n\nName: ${$('#app-name').value}\nPhone: ${$('#app-phone').value}\nDate: ${$('#app-date').value}\nTime: ${$('#app-time').value}\nType: ${$('#app-type').value}\nMessage: ${$('#app-msg').value || 'N/A'}`;
  window.open(`https://wa.me/${WA}?text=${encodeURIComponent(text)}`, '_blank');
  showToast('Opening WhatsApp...');
}

/* ============ SEARCH OVERLAY ============ */
function openSearch() {
  const so = $('#search-overlay');
  so.classList.add('open');
  so.setAttribute('aria-hidden', 'false');
  document.body.classList.add('lock');
  setTimeout(() => $('#search-overlay-input')?.focus(), 200);
}
function closeSearch() {
  const so = $('#search-overlay');
  if (!so) return;
  so.classList.remove('open');
  so.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('lock');
}
function doSearch(q) {
  const results = $('#search-results');
  if (!q || q.length < 2) { results.innerHTML = ''; return; }
  const arr = products.filter(p => {
    const s = `${p.name} ${p.id} ${p.category} ${p.metal}`.toLowerCase();
    return s.includes(q.toLowerCase());
  }).slice(0, 6);
  if (!arr.length) {
    results.innerHTML = '<p style="color:rgba(250,247,242,0.5);font-family:Inter;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;text-align:center;padding:20px">No results</p>';
    return;
  }
  results.innerHTML = arr.map(p => `
    <a href="#product/${p.id}" class="search-result" onclick="closeSearch()">
      <img src="${p.img}" alt="">
      <div><strong>${p.name}</strong><small>${p.id} · ${p.metal}</small></div>
    </a>`).join('');
}

/* ============ TOAST ============ */
let toastTimer;
function showToast(msg) {
  const t = $('#toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2000);
}

/* ============ REVEAL ============ */
let revealObs;
function initReveal() {
  if (!('IntersectionObserver' in window)) {
    $$('.reveal').forEach(el => el.classList.add('revealed'));
    return;
  }
  if (revealObs) revealObs.disconnect();
  revealObs = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('revealed'), Math.min(i * 60, 400));
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  $$('.reveal').forEach(el => revealObs.observe(el));
}

/* ============ CUSTOM CURSOR (desktop) ============ */
function initCursor() {
  if (!matchMedia('(hover:hover) and (pointer:fine)').matches) return;
  const cursor = $('#cursor'), dot = $('#cursor-dot');
  if (!cursor || !dot) return;
  let mx = 0, my = 0, cx = 0, cy = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
    cursor.classList.add('active');
    dot.classList.add('active');
  });
  document.addEventListener('mouseleave', () => {
    cursor.classList.remove('active');
    dot.classList.remove('active');
  });
  const loop = () => {
    cx += (mx - cx) * 0.15;
    cy += (my - cy) * 0.15;
    cursor.style.left = cx + 'px';
    cursor.style.top = cy + 'px';
    requestAnimationFrame(loop);
  };
  loop();
  document.addEventListener('mouseover', e => {
    if (e.target.closest('a, button, .product-photo, .occasion-card, .gallery-card, .h-card')) {
      cursor.classList.add('hover');
    }
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest('a, button, .product-photo, .occasion-card, .gallery-card, .h-card')) {
      cursor.classList.remove('hover');
    }
  });
}

/* ============ SPLIT TEXT ============ */
function initSplitText() {
  $$('[data-split]').forEach(el => {
    const html = el.innerHTML;
    const parts = html.split(/(<br\s*\/?>|<em>.*?<\/em>)/gi);
    el.innerHTML = parts.map(part => {
      if (part.match(/^<br/i)) return part;
      if (part.match(/^<em/i)) {
        const inner = part.replace(/<\/?em>/g, '');
        return inner.split(' ').map(w => `<em style="display:inline-block"><span class="split-word">${w}</span></em>`).join(' ');
      }
      return part.split(' ').map(w => w.trim() ? `<span class="split-word">${w}</span>` : '').join(' ');
    }).join('');
    requestAnimationFrame(() => {
      el.querySelectorAll('.split-word').forEach((w, i) => {
        w.style.opacity = '0';
        w.style.transform = 'translateY(100%)';
        w.style.display = 'inline-block';
        w.style.transition = `opacity 0.9s ${0.4 + i * 0.08}s cubic-bezier(0.16,1,0.3,1), transform 0.9s ${0.4 + i * 0.08}s cubic-bezier(0.16,1,0.3,1)`;
        requestAnimationFrame(() => {
          w.style.opacity = '1';
          w.style.transform = 'translateY(0)';
        });
      });
    });
  });
}

/* ============ INIT ============ */
function init() {
  // Loader
  setTimeout(() => $('#page-loader')?.classList.add('hidden'), 600);

  // Nav close on click
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', closeMobileMenu));

  // Menu
  $('#menu-toggle')?.addEventListener('click', toggleMobileMenu);
  $('#menu-close')?.addEventListener('click', closeMobileMenu);

  // Search
  $('#search-open')?.addEventListener('click', openSearch);
  $('#search-close')?.addEventListener('click', closeSearch);
  $('#search-overlay-input')?.addEventListener('input', e => doSearch(e.target.value));
  $('#search-overlay')?.addEventListener('click', e => {
    if (e.target.id === 'search-overlay') closeSearch();
  });

  // Shortlist
  $('#wishlist-top')?.addEventListener('click', openDrawer);
  $('#mobile-shortlist')?.addEventListener('click', openDrawer);
  $('#drawer-close')?.addEventListener('click', closeDrawer);
  $('#drawer-backdrop')?.addEventListener('click', closeDrawer);

  // Search & Sort
  $('#search-input')?.addEventListener('input', e => {
    currentSearch = e.target.value.trim();
    renderProducts();
  });
  $('#sort-select')?.addEventListener('change', renderProducts);
  $('#faq-search')?.addEventListener('input', e => searchFAQ(e.target.value));

  // Filters
  $$('.filter-btn').forEach(b => b.addEventListener('click', () => {
    currentCategory = b.dataset.category;
    $$('.filter-btn').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    renderProducts();
  }));

  // Clear shortlist
  $('#clear-shortlist')?.addEventListener('click', () => {
    shortlist = [];
    localStorage.setItem('anishaShortlist', '[]');
    updateShortlist();
    updateCounts();
    renderProducts();
    renderFeatured();
    showToast('Shortlist cleared');
  });

  // Send shortlist
  $('#send-shortlist')?.addEventListener('click', () => {
    if (!shortlist.length) { showToast('Shortlist is empty'); return; }
    const names = shortlist.map(id => {
      const p = products.find(x => x.id === id);
      return `• ${p.name} (${p.id})`;
    }).join('\n');
    const msg = `Hello New Anisha Jewellers, I would like to enquire about these designs:\n\n${names}\n\nPlease share current price, weight, purity and availability.`;
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, '_blank');
    showToast('Opening WhatsApp...');
  });

  // Appointment
  $('#appointment-form')?.addEventListener('submit', handleAppointment);

  // Year
  const y = $('#current-year');
  if (y) y.textContent = new Date().getFullYear();

  // Keyboard
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeMobileMenu();
      closeDrawer();
      closeLightbox();
      closeSearch();
    }
  });

  // Initial
  renderFeatured();
  renderProducts();
  updateShortlist();
  updateCounts();
  initCursor();
  initSplitText();
  handleRoute();
  setTimeout(() => initReveal(), 200);
}

document.addEventListener('DOMContentLoaded', init);