// Cart Storage Manager with LocalStorage Persistence
const CART_STORAGE_KEY = 'mini_amazon_cart_v1';
const SAVED_ITEMS_KEY = 'mini_amazon_saved_v1';

const CartStorage = {
  // Retrieve raw cart array from localStorage
  getCart() {
    try {
      const data = localStorage.getItem(CART_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Failed to read cart from localStorage', e);
      return [];
    }
  },

  // Save cart and notify listeners
  saveCart(cart) {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      window.dispatchEvent(new CustomEvent('cart:updated', { detail: { cart } }));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  },

  // Add item with specified quantity
  addToCart(productId, quantity = 1) {
    const product = typeof getProductById === 'function' ? getProductById(productId) : null;
    if (!product) return { success: false, message: 'Product not found' };

    const cart = this.getCart();
    const existingIndex = cart.findIndex(item => item.id === productId);

    let newQty = quantity;
    if (existingIndex > -1) {
      newQty = cart[existingIndex].quantity + quantity;
      // Cap at available stock
      if (product.stock && newQty > product.stock) {
        newQty = product.stock;
      }
      cart[existingIndex].quantity = newQty;
      cart[existingIndex].updatedAt = Date.now();
    } else {
      if (product.stock && newQty > product.stock) {
        newQty = product.stock;
      }
      cart.push({
        id: productId,
        quantity: newQty,
        addedAt: Date.now()
      });
    }

    this.saveCart(cart);
    return { success: true, product, quantity: newQty };
  },

  // Update existing item quantity
  updateQuantity(productId, quantity) {
    let cart = this.getCart();
    const qty = parseInt(quantity, 10);

    if (qty <= 0) {
      return this.removeFromCart(productId);
    }

    const item = cart.find(i => i.id === productId);
    if (item) {
      const product = typeof getProductById === 'function' ? getProductById(productId) : null;
      if (product && product.stock && qty > product.stock) {
        item.quantity = product.stock;
      } else {
        item.quantity = qty;
      }
      item.updatedAt = Date.now();
      this.saveCart(cart);
      return { success: true, quantity: item.quantity };
    }
    return { success: false };
  },

  // Remove an item from the cart
  removeFromCart(productId) {
    const cart = this.getCart();
    const updated = cart.filter(item => item.id !== productId);
    this.saveCart(updated);
    return { success: true };
  },

  // Clear all cart contents
  clearCart() {
    this.saveCart([]);
    return { success: true };
  },

  // Get total count of all items in cart
  getCartCount() {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + (item.quantity || 0), 0);
  },

  // Get hydrated cart items with full product details
  getCartItemsWithDetails() {
    const cart = this.getCart();
    return cart
      .map(item => {
        const product = typeof getProductById === 'function' ? getProductById(item.id) : null;
        if (!product) return null;
        return {
          ...product,
          cartQuantity: item.quantity,
          itemTotal: (product.price * item.quantity).toFixed(2)
        };
      })
      .filter(Boolean);
  },

  // Calculate cart subtotal
  getCartSubtotal() {
    const items = this.getCartItemsWithDetails();
    return items.reduce((sum, item) => sum + (item.price * item.cartQuantity), 0);
  },

  // Save for later functionality
  getSavedItems() {
    try {
      const data = localStorage.getItem(SAVED_ITEMS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  saveForLater(productId) {
    this.removeFromCart(productId);
    const saved = this.getSavedItems();
    if (!saved.includes(productId)) {
      saved.push(productId);
      localStorage.setItem(SAVED_ITEMS_KEY, JSON.stringify(saved));
      window.dispatchEvent(new CustomEvent('saved:updated'));
    }
    return { success: true };
  },

  moveToCartFromSaved(productId) {
    const saved = this.getSavedItems().filter(id => id !== productId);
    localStorage.setItem(SAVED_ITEMS_KEY, JSON.stringify(saved));
    this.addToCart(productId, 1);
    window.dispatchEvent(new CustomEvent('saved:updated'));
    return { success: true };
  },

  removeSavedItem(productId) {
    const saved = this.getSavedItems().filter(id => id !== productId);
    localStorage.setItem(SAVED_ITEMS_KEY, JSON.stringify(saved));
    window.dispatchEvent(new CustomEvent('saved:updated'));
    return { success: true };
  }
};

// Auto-sync cart badge across all navigation elements on page load
function updateGlobalCartBadges() {
  const count = CartStorage.getCartCount();
  const badges = document.querySelectorAll('.cart-count-badge');
  badges.forEach(badge => {
    badge.textContent = count;
    badge.setAttribute('aria-label', `${count} items in cart`);
    if (count > 0) {
      badge.classList.add('has-items');
    } else {
      badge.classList.remove('has-items');
    }
  });
}

// Listen for cart changes
window.addEventListener('cart:updated', updateGlobalCartBadges);
document.addEventListener('DOMContentLoaded', updateGlobalCartBadges);
