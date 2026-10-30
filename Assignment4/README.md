# Mini Amazon - E-Commerce Front Page (Living & Non-Living Catalog)

An Amazon-inspired, responsive e-commerce web application featuring a diverse catalog of **Living Things** (rare houseplants, bonsai, live aquarium kits, herbs) and **Non-Living Things** (noise-canceling headphones, mechanical keyboards, OLED smartwatches, 4K camera drones).

Built with **HTML5**, **Vanilla CSS3**, and **Modern JavaScript (ES6)** with complete `localStorage` persistence.

---

## 🌟 Key Features

1. **Amazon Brand Navigation & Aesthetics**:
   - Iconic dark navigation bar (`#131921` / `#232f3e`) with Amazon Prime branding and deliver-to-location selector.
   - Search bar with live keyword filtering and department category dropdown.
   - Dynamic Cart badge with real-time item counter and bump animation.

2. **Living vs. Non-Living Products Catalog**:
   - **Living Things**: Monstera Deliciosa, 7-Year-Old Japanese Juniper Bonsai, Betta Splendens Aquarium Kit, Prayer Plant, Organic Herb Trio, Succulent Terrarium, Live Butterfly Habitat.
   - **Non-Living Things**: Sony WH-1000XM5 ANC Headphones, Keychron Q1 Pro Mechanical Keyboard, Apple Watch Series 9, Breville Barista Touch Espresso Machine, Roborock S8 Pro Ultra, DJI Mini 4 Pro Drone, Minimalist Ergonomic Desk Lamp.
   - Dynamic badges: Emerald green for *Living Organisms* 🌿, Royal blue for *Non-Living Tech* ⚡, Best Seller flags, and Prime Delivery tags.

3. **Product Details Popup Modal**:
   - Accessible modal dialog with backdrop blur and smooth entrance transition.
   - High-res photo gallery with thumbnail switcher.
   - Context-aware specification panels:
     - **Living Organism Care Guide**: Sunlight, watering, pet friendliness, care difficulty, and origin.
     - **Technical Specifications**: Battery life, connectivity, build materials, and manufacturer warranty.
   - Quantity selector (`-` / `+`) and direct "Add to Cart" action with instant feedback.

4. **Cart Management & LocalStorage Persistence**:
   - Instant updates stored under `mini_amazon_cart_v1` in `localStorage`.
   - Adding identical items increments quantity and respects maximum stock limits.
   - Animated toast notifications on item addition with a quick "View Cart" shortcut.

5. **Dedicated Cart Page (`cart.html`)**:
   - Full shopping cart table with thumbnails, quantity stepper, stock tags, and "Delete" / "Save for later".
   - Free shipping progress bar (orders over $35 or Prime).
   - Promo coupon validation: supports `AMAZON20` (20% off) and `SAVE10` ($10 off).
   - Estimated 8% tax calculation and live price breakdown.
   - Simulated Checkout modal with delivery address, payment method review, and celebratory order confirmation (Order ID generator).

---

## 🚀 How to Run Locally

You can open `index.html` directly in any web browser, or serve it using any local static server:

### Option A: Direct Browser File
Double-click `index.html` in your file explorer or open it in Chrome / Edge / Firefox.

### Option B: Local Static Server
Using Node.js:
```bash
# In the project directory:
npx serve .
# or
npx http-server .
```
Then open `http://localhost:3000` in your browser.

---

## 📁 File Structure

```
Assignment4/
│── index.html              # Storefront (Hero, Filter Bar, Product Grid, Details Modal)
│── cart.html               # Dedicated Cart Page (Summary, Coupon, Checkout Flow)
│── README.md               # Project documentation
│── css/
│   ├── style.css           # Global design system, Amazon theme, header, footer, toast
│   ├── home.css            # Hero carousel, filter pills, product card grid
│   ├── modal.css           # Product detail modal & care sheet / tech specs styling
│   └── cart.css            # Cart table, order summary sidebar, checkout modal
└── js/
    ├── products.js         # Curated catalog of living and non-living items
    ├── storage.js          # LocalStorage cart management with custom events
    ├── modal.js            # Product details modal controller & toast notification system
    ├── app.js              # Home page controller (search, filters, sorting, countdown)
    └── cart.js             # Cart page controller (quantity updates, promo codes, checkout)
```

---

## 💡 Skills Gained

- **JavaScript Logic**: LocalStorage state synchronization, array manipulation, event delegation, custom window events, dynamic DOM hydration.
- **Responsive Design**: Mobile-first fluid typography, CSS Grid, Flexbox layouts, media queries for mobile, tablet, and widescreen displays.
- **UI/UX Thinking**: Dual-concept classification (Living vs. Non-Living), visual hierarchy, micro-animations, glassmorphism, toast feedback, and checkout flows.
