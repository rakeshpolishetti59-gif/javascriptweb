// Dedicated Cart Page Controller
let appliedPromoCode = null;
let discountRate = 0; // percentage or fixed
let discountType = null; // 'percent' or 'fixed'

document.addEventListener('DOMContentLoaded', () => {
  renderCartPage();

  // Listen for storage events (e.g. if updated in another tab or modal)
  window.addEventListener('cart:updated', () => {
    renderCartPage();
  });

  window.addEventListener('saved:updated', () => {
    renderSavedForLater();
  });

  setupPromoCode();
  setupCheckoutModal();
  renderSavedForLater();
});

function renderCartPage() {
  const itemsContainer = document.getElementById('cart-items-list');
  const emptyState = document.getElementById('cart-empty-state');
  const cartLayout = document.getElementById('cart-active-layout');
  const cartSubtitle = document.getElementById('cart-count-subtitle');
  const panelSubtotal = document.getElementById('panel-subtotal-val');
  const panelCount = document.getElementById('panel-subtotal-count');

  if (!itemsContainer || !emptyState || !cartLayout) return;

  const items = CartStorage.getCartItemsWithDetails();
  const totalCount = CartStorage.getCartCount();
  const subtotal = CartStorage.getCartSubtotal();

  if (items.length === 0) {
    cartLayout.style.display = 'none';
    emptyState.style.display = 'flex';
    if (cartSubtitle) cartSubtitle.textContent = '(0 items)';
    return;
  }

  // Show active layout
  emptyState.style.display = 'none';
  cartLayout.style.display = 'grid';

  if (cartSubtitle) {
    cartSubtitle.textContent = `(${totalCount} ${totalCount === 1 ? 'item' : 'items'})`;
  }

  if (panelCount) panelCount.textContent = totalCount;
  if (panelSubtotal) panelSubtotal.textContent = `$${subtotal.toFixed(2)}`;

  // Render items
  itemsContainer.innerHTML = items.map(item => {
    const isLiving = item.type === 'living';
    const badgeClass = isLiving ? 'badge-living' : 'badge-nonliving';
    const badgeText = isLiving ? '🌿 Living Organism' : '⚡ Non-Living Tech';

    return `
      <div class="cart-item-card" data-id="${item.id}">
        <!-- Thumbnail -->
        <a href="index.html" class="item-thumb-link">
          <img src="${item.image}" alt="${item.name}" class="item-thumb-img">
        </a>

        <!-- Details -->
        <div class="item-info-col">
          <div class="item-title-row">
            <span class="item-type-badge ${badgeClass}">${badgeText}</span>
            <h4 class="item-name">${item.name}</h4>
          </div>

          <div class="item-stock-tag">✓ In Stock (${item.stock} available)</div>

          <label class="item-gift-option">
            <input type="checkbox"> This is a gift (learn more)
          </label>

          <!-- Stepper & Actions -->
          <div class="item-actions-row">
            <div class="cart-stepper">
              <button class="cart-btn-step" data-action="decrement" data-id="${item.id}">−</button>
              <span class="cart-step-val">${item.cartQuantity}</span>
              <button class="cart-btn-step" data-action="increment" data-id="${item.id}">+</button>
            </div>

            <span class="actions-separator">|</span>

            <button class="item-action-link delete-link" data-action="delete" data-id="${item.id}">
              Delete
            </button>

            <span class="actions-separator">|</span>

            <button class="item-action-link" data-action="save-later" data-id="${item.id}">
              Save for later
            </button>

            <span class="actions-separator">|</span>

            <button class="item-action-link" data-action="compare" data-id="${item.id}">
              Compare with similar items
            </button>
          </div>
        </div>

        <!-- Price -->
        <div class="item-price-col">
          <div class="item-total-price">$${item.itemTotal}</div>
          <div class="item-unit-price">($${item.price.toFixed(2)} each)</div>
        </div>
      </div>
    `;
  }).join('');

  // Attach item actions
  itemsContainer.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const action = btn.getAttribute('data-action');
      const id = btn.getAttribute('data-id');
      const currentItem = items.find(i => i.id === id);

      if (action === 'increment' && currentItem) {
        if (currentItem.cartQuantity < currentItem.stock) {
          CartStorage.updateQuantity(id, currentItem.cartQuantity + 1);
        } else {
          showToast(`Maximum stock limit of ${currentItem.stock} reached`, 'error');
        }
      } else if (action === 'decrement' && currentItem) {
        if (currentItem.cartQuantity > 1) {
          CartStorage.updateQuantity(id, currentItem.cartQuantity - 1);
        } else {
          CartStorage.removeFromCart(id);
          showToast(`Removed "${currentItem.name}" from cart`, 'living');
        }
      } else if (action === 'delete') {
        CartStorage.removeFromCart(id);
        showToast('Item removed from your cart', 'living');
      } else if (action === 'save-later') {
        CartStorage.saveForLater(id);
        showToast(`Saved "${currentItem ? currentItem.name : 'item'}" for later!`, 'living');
      } else if (action === 'compare') {
        window.location.href = 'index.html';
      }
    });
  });

  // Clear Cart link
  const clearBtn = document.getElementById('btn-clear-entire-cart');
  if (clearBtn) {
    clearBtn.onclick = () => {
      if (confirm('Are you sure you want to remove all items from your cart?')) {
        CartStorage.clearCart();
        showToast('Cart cleared', 'living');
      }
    };
  }

  // Update Summary calculation
  updateSummaryCalculations(subtotal, totalCount);
}

function updateSummaryCalculations(subtotal, count) {
  const summaryCount = document.getElementById('summary-items-count');
  const summarySubtotal = document.getElementById('summary-subtotal-amount');
  const discountRow = document.getElementById('summary-discount-row');
  const discountVal = document.getElementById('summary-discount-val');
  const taxVal = document.getElementById('summary-tax-amount');
  const totalVal = document.getElementById('summary-grand-total');
  const shippingMsg = document.getElementById('shipping-perk-text');

  if (summaryCount) summaryCount.textContent = count;
  if (summarySubtotal) summarySubtotal.textContent = `$${subtotal.toFixed(2)}`;

  // Shipping logic
  if (shippingMsg) {
    if (subtotal >= 35) {
      shippingMsg.innerHTML = '<strong>✓ Your order qualifies for FREE Prime Delivery!</strong>';
    } else {
      const remaining = (35 - subtotal).toFixed(2);
      shippingMsg.innerHTML = `Add <strong>$${remaining}</strong> of eligible items to get <strong>FREE Delivery</strong>`;
    }
  }

  // Calculate discount
  let discountAmount = 0;
  if (appliedPromoCode) {
    if (discountType === 'percent') {
      discountAmount = subtotal * (discountRate / 100);
    } else if (discountType === 'fixed') {
      discountAmount = Math.min(discountRate, subtotal);
    }
  }

  if (discountRow && discountVal) {
    if (discountAmount > 0) {
      discountRow.style.display = 'flex';
      discountVal.textContent = `-$${discountAmount.toFixed(2)} (${appliedPromoCode})`;
    } else {
      discountRow.style.display = 'none';
    }
  }

  const discountedSubtotal = Math.max(0, subtotal - discountAmount);
  // Estimated 8% sales tax
  const taxAmount = discountedSubtotal * 0.08;
  if (taxVal) taxVal.textContent = `$${taxAmount.toFixed(2)}`;

  // Grand Total (free shipping demo)
  const grandTotal = discountedSubtotal + taxAmount;
  if (totalVal) totalVal.textContent = `$${grandTotal.toFixed(2)}`;
}

// Promo Code Form
function setupPromoCode() {
  const promoInput = document.getElementById('promo-code-input');
  const applyBtn = document.getElementById('btn-apply-promo');
  const promoMsg = document.getElementById('promo-status-msg');

  if (!applyBtn || !promoInput || !promoMsg) return;

  applyBtn.addEventListener('click', () => {
    const code = promoInput.value.trim().toUpperCase();

    if (!code) {
      promoMsg.className = 'promo-message error';
      promoMsg.textContent = 'Please enter a coupon or promo code.';
      return;
    }

    if (code === 'AMAZON20') {
      appliedPromoCode = 'AMAZON20';
      discountRate = 20;
      discountType = 'percent';
      promoMsg.className = 'promo-message success';
      promoMsg.textContent = '✓ 20% discount applied to your entire order!';
      renderCartPage();
    } else if (code === 'SAVE10') {
      appliedPromoCode = 'SAVE10';
      discountRate = 10;
      discountType = 'fixed';
      promoMsg.className = 'promo-message success';
      promoMsg.textContent = '✓ $10 flat savings coupon applied!';
      renderCartPage();
    } else {
      promoMsg.className = 'promo-message error';
      promoMsg.textContent = 'Invalid promo code. Try "AMAZON20" for 20% off!';
    }
  });
}

// Saved For Later Items
function renderSavedForLater() {
  const container = document.getElementById('saved-for-later-section');
  const listEl = document.getElementById('saved-items-grid');
  if (!container || !listEl) return;

  const savedIds = CartStorage.getSavedItems();
  if (savedIds.length === 0) {
    container.style.display = 'none';
    return;
  }

  container.style.display = 'block';
  listEl.innerHTML = savedIds.map(id => {
    const product = getProductById(id);
    if (!product) return '';

    return `
      <div class="cart-item-card saved-item-card" data-id="${product.id}">
        <a href="index.html" class="item-thumb-link">
          <img src="${product.image}" alt="${product.name}" class="item-thumb-img">
        </a>
        <div class="item-info-col">
          <h4 class="item-name">${product.name}</h4>
          <div class="item-stock-tag">In Stock</div>
          <div class="item-actions-row">
            <button class="item-action-link" data-action="move-to-cart" data-id="${product.id}">
              Move to cart
            </button>
            <span class="actions-separator">|</span>
            <button class="item-action-link delete-link" data-action="delete-saved" data-id="${product.id}">
              Delete
            </button>
          </div>
        </div>
        <div class="item-price-col">
          <div class="item-total-price">$${product.price.toFixed(2)}</div>
        </div>
      </div>
    `;
  }).join('');

  listEl.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.getAttribute('data-action');
      const id = btn.getAttribute('data-id');
      if (action === 'move-to-cart') {
        CartStorage.moveToCartFromSaved(id);
        showToast('Moved item back to cart!', 'living');
      } else if (action === 'delete-saved') {
        CartStorage.removeSavedItem(id);
        showToast('Item removed from saved list', 'living');
      }
    });
  });
}

// Checkout Modal Simulation
function setupCheckoutModal() {
  const checkoutBtn = document.getElementById('btn-proceed-checkout');
  const modal = document.getElementById('checkout-sim-modal');
  const closeBtn = document.getElementById('checkout-modal-close');
  const placeOrderBtn = document.getElementById('btn-place-order');
  const checkoutFormView = document.getElementById('checkout-review-view');
  const checkoutSuccessView = document.getElementById('checkout-success-view');

  if (!checkoutBtn || !modal) return;

  checkoutBtn.addEventListener('click', () => {
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';

    // Populate current values
    const grandTotal = document.getElementById('summary-grand-total');
    const orderSumTotal = document.getElementById('checkout-order-total-val');
    if (grandTotal && orderSumTotal) {
      orderSumTotal.textContent = grandTotal.textContent;
    }

    if (checkoutFormView) checkoutFormView.style.display = 'block';
    if (checkoutSuccessView) checkoutSuccessView.style.display = 'none';
  });

  const closeModal = () => {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  if (placeOrderBtn) {
    placeOrderBtn.addEventListener('click', () => {
      // Simulate placing order
      placeOrderBtn.disabled = true;
      placeOrderBtn.textContent = 'Processing Order...';

      setTimeout(() => {
        const orderId = 'AMZ-' + Math.floor(100000 + Math.random() * 900000);
        const orderIdDisplay = document.getElementById('order-confirmed-id');
        if (orderIdDisplay) orderIdDisplay.textContent = orderId;

        if (checkoutFormView) checkoutFormView.style.display = 'none';
        if (checkoutSuccessView) checkoutSuccessView.style.display = 'flex';

        // Clear cart in storage
        CartStorage.clearCart();
        appliedPromoCode = null;
        placeOrderBtn.disabled = false;
        placeOrderBtn.textContent = 'Place your order';
      }, 900);
    });
  }
}
