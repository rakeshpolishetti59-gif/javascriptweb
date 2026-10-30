// Main Application Logic for Home Page (Mini Amazon)
let currentFilter = 'all';
let currentSearchTerm = '';
let currentSort = 'featured';
let onlyInStock = false;

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Modals and Global Listeners
  if (typeof ProductModal !== 'undefined') {
    ProductModal.init();
  }

  // Setup Event Listeners
  setupCategoryFilters();
  setupSearch();
  setupSorting();
  setupStockFilter();
  setupCountdownTimer();
  setupHeroButtons();

  // Initial Product Grid Render
  renderProductsGrid();
});

// Category Filter Pills
function setupCategoryFilters() {
  const pills = document.querySelectorAll('.filter-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      currentFilter = pill.getAttribute('data-filter') || 'all';
      renderProductsGrid();
    });
  });

  // Category select in search bar
  const headerSelect = document.getElementById('search-category-select');
  if (headerSelect) {
    headerSelect.addEventListener('change', (e) => {
      currentFilter = e.target.value;
      // Sync pill
      pills.forEach(p => {
        if (p.getAttribute('data-filter') === currentFilter) {
          p.classList.add('active');
        } else {
          p.classList.remove('active');
        }
      });
      renderProductsGrid();
    });
  }
}

// Search Functionality
function setupSearch() {
  const searchInput = document.getElementById('header-search-input');
  const clearBtn = document.getElementById('search-clear-btn');
  const searchSubmitBtn = document.getElementById('header-search-btn');

  if (!searchInput) return;

  const handleSearch = () => {
    currentSearchTerm = searchInput.value.trim().toLowerCase();
    if (clearBtn) {
      clearBtn.style.display = currentSearchTerm ? 'block' : 'none';
    }
    renderProductsGrid();
  };

  searchInput.addEventListener('input', handleSearch);

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      currentSearchTerm = '';
      clearBtn.style.display = 'none';
      searchInput.focus();
      renderProductsGrid();
    });
  }

  if (searchSubmitBtn) {
    searchSubmitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      handleSearch();
      // Scroll to grid if far away
      const grid = document.getElementById('products-grid');
      if (grid) {
        grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }
}

// Sorting Dropdown
function setupSorting() {
  const sortSelect = document.getElementById('catalog-sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      renderProductsGrid();
    });
  }
}

// In-Stock Filter Checkbox
function setupStockFilter() {
  const stockCheckbox = document.getElementById('filter-in-stock-only');
  if (stockCheckbox) {
    stockCheckbox.addEventListener('change', (e) => {
      onlyInStock = e.target.checked;
      renderProductsGrid();
    });
  }
}

// Hero Action Buttons
function setupHeroButtons() {
  const livingBtn = document.getElementById('hero-living-btn');
  const nonlivingBtn = document.getElementById('hero-nonliving-btn');

  if (livingBtn) {
    livingBtn.addEventListener('click', (e) => {
      e.preventDefault();
      activateFilter('living');
    });
  }

  if (nonlivingBtn) {
    nonlivingBtn.addEventListener('click', (e) => {
      e.preventDefault();
      activateFilter('non-living');
    });
  }
}

function activateFilter(filterName) {
  currentFilter = filterName;
  const pills = document.querySelectorAll('.filter-pill');
  pills.forEach(p => {
    if (p.getAttribute('data-filter') === filterName) {
      p.classList.add('active');
    } else {
      p.classList.remove('active');
    }
  });

  const headerSelect = document.getElementById('search-category-select');
  if (headerSelect) headerSelect.value = filterName;

  renderProductsGrid();
  const catalogEl = document.getElementById('catalog-controls');
  if (catalogEl) {
    catalogEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Filter and Sort Pipeline
function getFilteredAndSortedProducts() {
  let list = [...PRODUCTS];

  // 1. Filter by category / type
  if (currentFilter !== 'all') {
    if (currentFilter === 'living' || currentFilter === 'non-living') {
      list = list.filter(item => item.type === currentFilter);
    } else {
      list = list.filter(item => item.category.toLowerCase() === currentFilter.toLowerCase());
    }
  }

  // 2. Filter by search term
  if (currentSearchTerm) {
    list = list.filter(item => {
      const matchName = item.name.toLowerCase().includes(currentSearchTerm);
      const matchDesc = item.description.toLowerCase().includes(currentSearchTerm);
      const matchCategory = item.category.toLowerCase().includes(currentSearchTerm);
      return matchName || matchDesc || matchCategory;
    });
  }

  // 3. Filter by stock
  if (onlyInStock) {
    list = list.filter(item => item.stock > 0);
  }

  // 4. Sort
  switch (currentSort) {
    case 'price-asc':
      list.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      list.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      list.sort((a, b) => b.rating - a.rating);
      break;
    case 'discount':
      list.sort((a, b) => {
        const discA = a.originalPrice ? (a.originalPrice - a.price) / a.originalPrice : 0;
        const discB = b.originalPrice ? (b.originalPrice - b.price) / b.originalPrice : 0;
        return discB - discA;
      });
      break;
    case 'featured':
    default:
      // Default order in PRODUCTS
      break;
  }

  return list;
}

// Render Products Grid
function renderProductsGrid() {
  const grid = document.getElementById('products-grid');
  const countDisplay = document.getElementById('results-count-display');
  if (!grid) return;

  const products = getFilteredAndSortedProducts();

  if (countDisplay) {
    countDisplay.innerHTML = `Showing <strong>${products.length}</strong> of <strong>${PRODUCTS.length}</strong> products`;
  }

  if (products.length === 0) {
    grid.innerHTML = `
      <div class="empty-catalog-state">
        <div class="empty-icon-wrap">
          <svg width="36" height="36" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <h3 class="empty-title">No products match your criteria</h3>
        <p class="empty-desc">Try clearing your search query or selecting "All Products" to discover living plants, aquatic pets, and cutting-edge tech.</p>
        <button class="btn-reset-filters" id="btn-reset-catalog-filters">Reset All Filters</button>
      </div>
    `;

    const resetBtn = document.getElementById('btn-reset-catalog-filters');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        currentFilter = 'all';
        currentSearchTerm = '';
        onlyInStock = false;
        const searchInput = document.getElementById('header-search-input');
        if (searchInput) searchInput.value = '';
        const stockCb = document.getElementById('filter-in-stock-only');
        if (stockCb) stockCb.checked = false;

        document.querySelectorAll('.filter-pill').forEach(p => {
          if (p.getAttribute('data-filter') === 'all') p.classList.add('active');
          else p.classList.remove('active');
        });

        renderProductsGrid();
      });
    }
    return;
  }

  grid.innerHTML = products.map(product => {
    const isLiving = product.type === 'living';
    const typeLabel = isLiving ? '🌿 Living Organism' : '⚡ Non-Living Tech';
    const typeClass = isLiving ? 'pill-living' : 'pill-nonliving';

    let discountBadge = '';
    if (product.originalPrice && product.originalPrice > product.price) {
      const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
      discountBadge = `<span class="price-discount-tag">${discount}% off</span>`;
    }

    const stockMsg = product.stock <= 5
      ? `<span class="stock-warning">Only ${product.stock} left in stock!</span>`
      : `<span class="stock-ok">In Stock</span>`;

    return `
      <article class="product-card" data-product-id="${product.id}">
        <!-- Top Badges -->
        <div class="card-header-badges">
          <span class="type-pill ${typeClass}">${typeLabel}</span>
          ${product.badge ? `<span class="badge-flag ${product.badge.includes('Seller') ? 'best-seller' : ''}">${product.badge}</span>` : '<span></span>'}
        </div>

        <!-- Image & Quick View Trigger -->
        <div class="card-media-wrapper" data-action="quick-view">
          <img class="card-img" src="${product.image}" alt="${product.name}" loading="lazy">
          <button class="card-quick-view-overlay" data-action="quick-view" aria-label="Quick View for ${product.name}">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
            </svg>
            Quick View
          </button>
        </div>

        <!-- Card Body -->
        <div class="card-body">
          <span class="card-category-tag">${product.category}</span>
          <h3 class="card-title" data-action="quick-view" title="${product.name}">${product.name}</h3>

          <!-- Ratings -->
          <div class="card-rating-row">
            <div class="stars-wrap">
              ${renderStarIcons(product.rating)}
            </div>
            <span class="rating-score">${product.rating.toFixed(1)}</span>
            <span class="rating-count">(${product.reviewCount.toLocaleString()})</span>
          </div>

          <!-- Pricing -->
          <div class="card-price-row">
            <span class="price-current"><span class="price-currency">$</span>${product.price.toFixed(2)}</span>
            ${product.originalPrice ? `<span class="price-original">$${product.originalPrice.toFixed(2)}</span>` : ''}
            ${discountBadge}
          </div>

          <!-- Prime & Delivery -->
          <div class="card-delivery-info">
            <span class="prime-indicator">✓prime</span>
            <span class="delivery-eta">FREE Delivery <strong>Tomorrow, 8 AM</strong></span>
            ${stockMsg}
          </div>

          <!-- Add to Cart Action -->
          <div class="card-actions">
            <button class="btn-add-to-cart" data-action="add-cart" data-id="${product.id}">
              <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              Add to Cart
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');

  // Attach card event delegations
  grid.querySelectorAll('.product-card').forEach(card => {
    const productId = card.getAttribute('data-product-id');

    // Quick view triggers (image wrapper, overlay, title)
    card.querySelectorAll('[data-action="quick-view"]').forEach(el => {
      el.addEventListener('click', () => {
        if (typeof ProductModal !== 'undefined') {
          ProductModal.open(productId);
        }
      });
    });

    // Add to cart button
    const addBtn = card.querySelector('[data-action="add-cart"]');
    if (addBtn) {
      addBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const result = CartStorage.addToCart(productId, 1);
        if (result.success) {
          showToast(
            `Added 1 × "${result.product.name}" to your cart!`,
            result.product.type === 'living' ? 'living' : 'nonliving'
          );

          // Button feedback
          addBtn.classList.add('btn-added');
          addBtn.innerHTML = `✓ Added`;
          setTimeout(() => {
            addBtn.classList.remove('btn-added');
            addBtn.innerHTML = `
              <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              Add to Cart
            `;
          }, 1400);
        }
      });
    }
  });
}

// Flash Deals Countdown Timer
function setupCountdownTimer() {
  const hoursEl = document.getElementById('deal-countdown-hours');
  const minsEl = document.getElementById('deal-countdown-mins');
  const secsEl = document.getElementById('deal-countdown-secs');

  if (!hoursEl || !minsEl || !secsEl) return;

  // 6 hours initial duration
  let remainingSeconds = (5 * 3600) + (42 * 60) + 18;

  const updateTimer = () => {
    if (remainingSeconds <= 0) {
      remainingSeconds = 8 * 3600; // loop
    }
    remainingSeconds--;

    const h = Math.floor(remainingSeconds / 3600);
    const m = Math.floor((remainingSeconds % 3600) / 60);
    const s = remainingSeconds % 60;

    hoursEl.textContent = String(h).padStart(2, '0');
    minsEl.textContent = String(m).padStart(2, '0');
    secsEl.textContent = String(s).padStart(2, '0');
  };

  updateTimer();
  setInterval(updateTimer, 1000);
}
