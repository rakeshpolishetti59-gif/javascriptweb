// Product Details Popup Modal Controller
const ProductModal = {
  currentProductId: null,
  currentQuantity: 1,

  init() {
    this.modalBackdrop = document.getElementById('product-detail-modal');
    if (!this.modalBackdrop) return;

    this.bindEvents();
  },

  bindEvents() {
    // Close button click
    const closeBtn = document.getElementById('modal-close-button');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close());
    }

    // Click on backdrop outside dialog
    this.modalBackdrop.addEventListener('click', (e) => {
      if (e.target === this.modalBackdrop) {
        this.close();
      }
    });

    // Keyboard ESC to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen()) {
        this.close();
      }
    });

    // Stepper buttons inside modal
    const minusBtn = document.getElementById('modal-qty-minus');
    const plusBtn = document.getElementById('modal-qty-plus');
    const qtyInput = document.getElementById('modal-qty-input');

    if (minusBtn && plusBtn && qtyInput) {
      minusBtn.addEventListener('click', () => {
        let val = parseInt(qtyInput.value, 10) || 1;
        if (val > 1) {
          val--;
          qtyInput.value = val;
          this.currentQuantity = val;
        }
      });

      plusBtn.addEventListener('click', () => {
        let val = parseInt(qtyInput.value, 10) || 1;
        const product = getProductById(this.currentProductId);
        const maxStock = product ? product.stock : 99;
        if (val < maxStock) {
          val++;
          qtyInput.value = val;
          this.currentQuantity = val;
        } else {
          showToast(`Maximum available stock is ${maxStock}`, 'error');
        }
      });

      qtyInput.addEventListener('change', () => {
        let val = parseInt(qtyInput.value, 10) || 1;
        const product = getProductById(this.currentProductId);
        const maxStock = product ? product.stock : 99;
        if (val < 1) val = 1;
        if (val > maxStock) val = maxStock;
        qtyInput.value = val;
        this.currentQuantity = val;
      });
    }

    // Add to Cart button inside modal
    const addToCartBtn = document.getElementById('modal-add-to-cart-btn');
    if (addToCartBtn) {
      addToCartBtn.addEventListener('click', () => {
        if (!this.currentProductId) return;
        const result = CartStorage.addToCart(this.currentProductId, this.currentQuantity);
        if (result.success) {
          showToast(
            `Added ${this.currentQuantity} × "${result.product.name}" to your cart!`,
            result.product.type === 'living' ? 'living' : 'nonliving'
          );
          // Visual button feedback
          addToCartBtn.textContent = '✓ Added to Cart!';
          addToCartBtn.style.backgroundColor = 'var(--color-living-primary)';
          addToCartBtn.style.color = '#fff';
          setTimeout(() => {
            addToCartBtn.innerHTML = `
              <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              Add to Cart
            `;
            addToCartBtn.style.backgroundColor = '';
            addToCartBtn.style.color = '';
          }, 1500);
        }
      });
    }
  },

  isOpen() {
    return this.modalBackdrop && this.modalBackdrop.classList.contains('is-open');
  },

  open(productId) {
    const product = getProductById(productId);
    if (!product) return;

    this.currentProductId = productId;
    this.currentQuantity = 1;

    // Reset quantity input
    const qtyInput = document.getElementById('modal-qty-input');
    if (qtyInput) qtyInput.value = 1;

    // Render Images
    const mainImg = document.getElementById('modal-image-main');
    if (mainImg) {
      mainImg.src = product.image;
      mainImg.alt = product.name;
    }

    const thumbContainer = document.getElementById('modal-thumbnails-container');
    if (thumbContainer) {
      thumbContainer.innerHTML = '';
      const imgs = product.thumbnails && product.thumbnails.length ? product.thumbnails : [product.image];
      imgs.forEach((imgUrl, index) => {
        const btn = document.createElement('button');
        btn.className = `modal-thumbnail-btn ${index === 0 ? 'active' : ''}`;
        btn.innerHTML = `<img src="${imgUrl}" alt="${product.name} thumb ${index + 1}">`;
        btn.addEventListener('click', () => {
          document.querySelectorAll('.modal-thumbnail-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          mainImg.src = imgUrl;
        });
        thumbContainer.appendChild(btn);
      });
    }

    // Render Badges
    const badgeRow = document.getElementById('modal-badge-container');
    if (badgeRow) {
      const isLiving = product.type === 'living';
      const typeLabel = isLiving ? '🌿 Living Organism' : '⚡ Non-Living Tech & Living';
      const typeClass = isLiving ? 'pill-living' : 'pill-nonliving';

      badgeRow.innerHTML = `
        <span class="type-pill ${typeClass}">${typeLabel}</span>
        <span class="active-filter-tag">${product.category}</span>
        ${product.badge ? `<span class="badge-flag ${product.badge.includes('Seller') ? 'best-seller' : ''}">${product.badge}</span>` : ''}
      `;
    }

    // Title & Rating
    const titleEl = document.getElementById('modal-title');
    if (titleEl) titleEl.textContent = product.name;

    const ratingEl = document.getElementById('modal-rating-container');
    if (ratingEl) {
      const stars = renderStarIcons(product.rating);
      ratingEl.innerHTML = `
        <div class="stars-wrap">${stars}</div>
        <span class="rating-score">${product.rating.toFixed(1)}</span>
        <span class="rating-count">(${product.reviewCount.toLocaleString()} ratings)</span>
      `;
    }

    // Price
    const currentPriceEl = document.getElementById('modal-price-current');
    if (currentPriceEl) currentPriceEl.textContent = `$${product.price.toFixed(2)}`;

    const origPriceEl = document.getElementById('modal-price-original');
    if (origPriceEl) {
      origPriceEl.textContent = product.originalPrice ? `$${product.originalPrice.toFixed(2)}` : '';
    }

    const savingsEl = document.getElementById('modal-savings-tag');
    if (savingsEl) {
      if (product.originalPrice && product.originalPrice > product.price) {
        const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
        savingsEl.textContent = `Save ${discount}%`;
        savingsEl.style.display = 'inline-block';
      } else {
        savingsEl.style.display = 'none';
      }
    }

    // Description
    const descEl = document.getElementById('modal-description');
    if (descEl) descEl.textContent = product.description;

    // Specialty Details (Living Care vs Non-Living Tech)
    const specialtyContainer = document.getElementById('modal-specialty-container');
    if (specialtyContainer) {
      if (product.type === 'living') {
        const d = product.details || {};
        specialtyContainer.className = 'specialty-details-card living-card';
        specialtyContainer.innerHTML = `
          <div class="specialty-card-header">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
            Living Organism Care & Habitat Guide
          </div>
          <div class="specialty-grid">
            ${d.light ? `<div class="specialty-field"><span class="field-label">Sunlight</span><span class="field-value">${d.light}</span></div>` : ''}
            ${d.water ? `<div class="specialty-field"><span class="field-label">Watering</span><span class="field-value">${d.water}</span></div>` : ''}
            ${d.temperature ? `<div class="specialty-field"><span class="field-label">Water Temp</span><span class="field-value">${d.temperature}</span></div>` : ''}
            ${d.diet ? `<div class="specialty-field"><span class="field-label">Diet & Feeding</span><span class="field-value">${d.diet}</span></div>` : ''}
            ${d.petFriendly ? `<div class="specialty-field"><span class="field-label">Pet Safety</span><span class="field-value">${d.petFriendly}</span></div>` : ''}
            ${d.difficulty ? `<div class="specialty-field"><span class="field-label">Care Difficulty</span><span class="field-value">${d.difficulty}</span></div>` : ''}
            ${d.growthCycle ? `<div class="specialty-field"><span class="field-label">Life Cycle</span><span class="field-value">${d.growthCycle}</span></div>` : ''}
            ${d.origin ? `<div class="specialty-field"><span class="field-label">Native Habitat</span><span class="field-value">${d.origin}</span></div>` : ''}
          </div>
        `;
      } else {
        const d = product.details || {};
        specialtyContainer.className = 'specialty-details-card nonliving-card';
        specialtyContainer.innerHTML = `
          <div class="specialty-card-header">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 3L4 14h7v7l9-11h-7V3z"/>
            </svg>
            Technical Specifications & Warranty
          </div>
          <div class="specialty-grid">
            ${d.batteryLife || d.battery ? `<div class="specialty-field"><span class="field-label">Battery / Power</span><span class="field-value">${d.batteryLife || d.battery}</span></div>` : ''}
            ${d.connectivity ? `<div class="specialty-field"><span class="field-label">Connectivity</span><span class="field-value">${d.connectivity}</span></div>` : ''}
            ${d.compatibility ? `<div class="specialty-field"><span class="field-label">Compatibility</span><span class="field-value">${d.compatibility}</span></div>` : ''}
            ${d.chassis || d.materials ? `<div class="specialty-field"><span class="field-label">Build & Materials</span><span class="field-value">${d.chassis || d.materials}</span></div>` : ''}
            ${d.suctionPower ? `<div class="specialty-field"><span class="field-label">Suction Power</span><span class="field-value">${d.suctionPower}</span></div>` : ''}
            ${d.camera ? `<div class="specialty-field"><span class="field-label">Camera Specs</span><span class="field-value">${d.camera}</span></div>` : ''}
            ${d.warranty ? `<div class="specialty-field"><span class="field-label">Warranty</span><span class="field-value">${d.warranty}</span></div>` : ''}
          </div>
        `;
      }
    }

    // Stock Status
    const stockEl = document.getElementById('modal-stock-status');
    if (stockEl) {
      if (product.stock && product.stock <= 5) {
        stockEl.className = 'modal-stock-status stock-warning';
        stockEl.textContent = `Only ${product.stock} left in stock - order soon.`;
      } else {
        stockEl.className = 'modal-stock-status stock-ok';
        stockEl.textContent = `In Stock (${product.stock} available). Ships with Prime Delivery.`;
      }
    }

    // Show modal and prevent background scrolling
    this.modalBackdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  },

  close() {
    if (!this.modalBackdrop) return;
    this.modalBackdrop.classList.remove('is-open');
    document.body.style.overflow = '';
    this.currentProductId = null;
  }
};

// Helper to generate star SVG string based on float rating
function renderStarIcons(rating) {
  let starsHtml = '';
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.4;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      starsHtml += `<svg viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`;
    } else if (i === fullStars && hasHalf) {
      starsHtml += `<svg viewBox="0 0 20 20"><defs><linearGradient id="half-star"><stop offset="50%" stop-color="#ffa41c"/><stop offset="50%" stop-color="#cbd5e1"/></linearGradient></defs><path fill="url(#half-star)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`;
    } else {
      starsHtml += `<svg style="color:#cbd5e1" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`;
    }
  }
  return starsHtml;
}

// Toast notification helper
function showToast(message, type = 'living') {
  let container = document.getElementById('amazon-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'amazon-toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `amazon-toast ${type === 'nonliving' ? 'toast-nonliving' : ''} ${type === 'error' ? 'toast-error' : ''}`;

  const iconSvg = type === 'error'
    ? `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`
    : `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>`;

  toast.innerHTML = `
    <div class="toast-icon">${iconSvg}</div>
    <div class="toast-content">
      <div class="toast-title">${type === 'error' ? 'Notice' : 'Cart Updated'}</div>
      <div class="toast-message">${message}</div>
    </div>
    <div class="toast-actions">
      ${type !== 'error' ? `<a href="cart.html" class="toast-view-cart-btn">View Cart</a>` : ''}
      <button class="toast-close-btn" aria-label="Close">×</button>
    </div>
  `;

  const closeBtn = toast.querySelector('.toast-close-btn');
  closeBtn.addEventListener('click', () => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 200);
  });

  container.appendChild(toast);

  // Bump the cart badge animation
  const badges = document.querySelectorAll('.cart-count-badge');
  badges.forEach(b => {
    b.classList.add('bump');
    setTimeout(() => b.classList.remove('bump'), 300);
  });

  // Auto remove toast after 4 seconds
  setTimeout(() => {
    if (toast.parentElement) {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(20px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }
  }, 4000);
}
