/**
 * LUMINA — Interactive Image Gallery
 * Showcase of DOM Manipulation and Event Handling
 */

// --------------------------------------------------------------------------
// 1. Data Source: Curated High-Definition Artworks (8 Items)
// --------------------------------------------------------------------------
const galleryData = [
  {
    id: 1,
    title: "Alpine Aurora & Twilight Waters",
    category: "nature",
    categoryLabel: "Nature",
    photographer: "Bailey Zindel",
    description: "Serene mountain reflections beneath an ethereal twilight sky in the wilderness.",
    thumbUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    fullUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=85",
    tags: ["mountain", "lake", "reflection", "sunset", "landscape"]
  },
  {
    id: 2,
    title: "Emerald Canopy in Mist",
    category: "nature",
    categoryLabel: "Nature",
    photographer: "Sebastian Unrau",
    description: "Sunlight piercing through a dense temperate rainforest shrouded in morning mist.",
    thumbUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80",
    fullUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=85",
    tags: ["forest", "trees", "fog", "sunlight", "greenery"]
  },
  {
    id: 3,
    title: "Vortex of Modern Architecture",
    category: "architecture",
    categoryLabel: "Architecture",
    photographer: "Dan Freeman",
    description: "Hypnotic spiral curves and geometric structural framing in an avant-garde pavilion.",
    thumbUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
    fullUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85",
    tags: ["geometric", "minimalism", "modern", "design", "curves"]
  },
  {
    id: 4,
    title: "Skyward Monoliths",
    category: "architecture",
    categoryLabel: "Architecture",
    photographer: "Sean Pollock",
    description: "Striking perspective of towering skyscraper glass facades reaching into the clouds.",
    thumbUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
    fullUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85",
    tags: ["skyscrapers", "city", "glass", "perspective", "monochrome"]
  },
  {
    id: 5,
    title: "Neon Rain in Neo-Tokyo",
    category: "cyberpunk",
    categoryLabel: "Cyberpunk",
    photographer: "Aleksandar Pasaric",
    description: "Vibrant neon-lit alley reflections and holographic glow on wet Tokyo pavement.",
    thumbUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80",
    fullUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=85",
    tags: ["neon", "cyberpunk", "tokyo", "night", "rain"]
  },
  {
    id: 6,
    title: "Midnight Metropolis Glow",
    category: "cyberpunk",
    categoryLabel: "Cyberpunk",
    photographer: "Denys Nevozhai",
    description: "Futuristic metropolitan skyline bathed in electric magenta and ultraviolet lighting.",
    thumbUrl: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=600&q=80",
    fullUrl: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1600&q=85",
    tags: ["skyline", "futuristic", "night", "magenta", "cyber"]
  },
  {
    id: 7,
    title: "Celestial Nexus & Stellar Core",
    category: "cosmic",
    categoryLabel: "Cosmic",
    photographer: "NASA / Unsplash",
    description: "High-resolution deep-space telescope capture of interstellar gas and star nurseries.",
    thumbUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
    fullUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=85",
    tags: ["space", "stars", "nebula", "galaxy", "universe"]
  },
  {
    id: 8,
    title: "Chromatic Flow & Dimensional Waves",
    category: "cosmic",
    categoryLabel: "Cosmic",
    photographer: "Milad Fakurian",
    description: "Abstract fluid 3D render exploring iridescent chromatic surfaces and refractive waves.",
    thumbUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
    fullUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=85",
    tags: ["abstract", "3d", "chromatic", "fluid", "iridescent"]
  }
];

// Fallback SVG generator for offline or network-blocked environments
function generateFallbackSvg(title, category) {
  const bgColors = {
    nature: ['#064e3b', '#047857'],
    architecture: ['#1e293b', '#475569'],
    cyberpunk: ['#4c0519', '#9d174d'],
    cosmic: ['#1e1b4b', '#4338ca']
  };
  const [c1, c2] = bgColors[category] || ['#1e293b', '#3b82f6'];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${c1}"/>
        <stop offset="100%" stop-color="${c2}"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#grad)"/>
    <circle cx="400" cy="270" r="80" fill="rgba(255,255,255,0.1)"/>
    <text x="50%" y="360" fill="#ffffff" font-size="28" font-family="sans-serif" font-weight="bold" text-anchor="middle">${title}</text>
    <text x="50%" y="400" fill="rgba(255,255,255,0.7)" font-size="16" font-family="sans-serif" text-anchor="middle">${category.toUpperCase()}</text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

// --------------------------------------------------------------------------
// 2. Application State Management
// --------------------------------------------------------------------------
class GalleryApp {
  constructor(data) {
    this.items = data;
    this.filteredItems = [...data];
    this.currentCategory = 'all';
    this.searchQuery = '';
    this.currentIndex = 0;
    this.isLightboxOpen = false;
    this.isZoomed = false;
    
    // Liked items persistent storage
    this.likedSet = new Set(JSON.parse(localStorage.getItem('lumina_liked_artworks') || '[]'));

    // Cache DOM Elements
    this.initDOMElements();

    // Attach Event Listeners
    this.bindEvents();

    // Initial Render
    this.renderGallery();
    this.updateStats();
  }

  initDOMElements() {
    // Gallery & Controls
    this.grid = document.getElementById('gallery-grid');
    this.noResults = document.getElementById('no-results');
    this.filterButtons = document.querySelectorAll('.filter-pill');
    this.searchInput = document.getElementById('search-input');
    this.clearSearchBtn = document.getElementById('clear-search');
    this.resetFilterBtn = document.getElementById('reset-filter-btn');
    this.totalCountEl = document.getElementById('total-count');
    this.likesTotalEl = document.getElementById('likes-total');

    // Lightbox Components
    this.modal = document.getElementById('lightbox-modal');
    this.backdrop = document.getElementById('lightbox-backdrop');
    this.lightboxImg = document.getElementById('lightbox-img');
    this.spinner = document.getElementById('lightbox-spinner');
    this.lightboxBadge = document.getElementById('lightbox-badge');
    this.lightboxCounter = document.getElementById('lightbox-counter');
    this.lightboxTitle = document.getElementById('lightbox-title');
    this.lightboxDesc = document.getElementById('lightbox-desc');
    this.lightboxAuthor = document.getElementById('lightbox-author');
    this.lightboxLikeBtn = document.getElementById('lightbox-like');
    this.lightboxZoomBtn = document.getElementById('lightbox-zoom');
    this.lightboxCloseBtn = document.getElementById('lightbox-close');
    this.lightboxPrevBtn = document.getElementById('lightbox-prev');
    this.lightboxNextBtn = document.getElementById('lightbox-next');
    this.thumbnailsContainer = document.getElementById('lightbox-thumbnails');
  }

  bindEvents() {
    // 1. Filter Pills Event Delegation
    const filterContainer = document.getElementById('category-filters');
    filterContainer.addEventListener('click', (e) => {
      const button = e.target.closest('.filter-pill');
      if (!button) return;
      
      this.filterButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');
      
      this.currentCategory = button.getAttribute('data-category');
      this.applyFilter();
    });

    // 2. Live Search Event
    this.searchInput.addEventListener('input', (e) => {
      this.searchQuery = e.target.value.trim().toLowerCase();
      this.clearSearchBtn.style.display = this.searchQuery ? 'block' : 'none';
      this.applyFilter();
    });

    this.clearSearchBtn.addEventListener('click', () => {
      this.searchInput.value = '';
      this.searchQuery = '';
      this.clearSearchBtn.style.display = 'none';
      this.searchInput.focus();
      this.applyFilter();
    });

    this.resetFilterBtn.addEventListener('click', () => {
      this.searchInput.value = '';
      this.searchQuery = '';
      this.clearSearchBtn.style.display = 'none';
      this.currentCategory = 'all';
      this.filterButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === 'all');
        btn.setAttribute('aria-selected', btn.dataset.category === 'all');
      });
      this.applyFilter();
    });

    // 3. Grid Event Delegation (Cards & Like buttons)
    this.grid.addEventListener('click', (e) => {
      const likeBtn = e.target.closest('.card-like-btn');
      if (likeBtn) {
        e.stopPropagation();
        const card = likeBtn.closest('.gallery-card');
        const id = parseInt(card.dataset.id, 10);
        this.toggleLike(id);
        return;
      }

      const card = e.target.closest('.gallery-card');
      if (card) {
        const id = parseInt(card.dataset.id, 10);
        this.openLightboxById(id);
      }
    });

    // 4. Lightbox Controls
    this.lightboxCloseBtn.addEventListener('click', () => this.closeLightbox());
    this.backdrop.addEventListener('click', () => this.closeLightbox());
    
    this.lightboxPrevBtn.addEventListener('click', () => this.navigateLightbox(-1));
    this.lightboxNextBtn.addEventListener('click', () => this.navigateLightbox(1));
    
    this.lightboxZoomBtn.addEventListener('click', () => this.toggleZoom());
    this.lightboxImg.addEventListener('click', () => this.toggleZoom());

    this.lightboxLikeBtn.addEventListener('click', () => {
      const currentItem = this.filteredItems[this.currentIndex];
      if (currentItem) {
        this.toggleLike(currentItem.id);
      }
    });

    // 5. Lightbox Thumbnail Clicks
    this.thumbnailsContainer.addEventListener('click', (e) => {
      const thumb = e.target.closest('.thumb-item');
      if (thumb) {
        const index = parseInt(thumb.dataset.index, 10);
        this.setLightboxIndex(index);
      }
    });

    // 6. Global Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
      if (!this.isLightboxOpen) return;

      switch (e.key) {
        case 'Escape':
          this.closeLightbox();
          break;
        case 'ArrowLeft':
          this.navigateLightbox(-1);
          break;
        case 'ArrowRight':
          this.navigateLightbox(1);
          break;
        case 'z':
        case 'Z':
          this.toggleZoom();
          break;
        case 'l':
        case 'L':
          if (this.filteredItems[this.currentIndex]) {
            this.toggleLike(this.filteredItems[this.currentIndex].id);
          }
          break;
      }
    });

    // 7. Touch Swipe Support for Lightbox
    let touchStartX = 0;
    let touchEndX = 0;
    this.modal.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    this.modal.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe(touchStartX, touchEndX);
    }, { passive: true });
  }

  handleSwipe(start, end) {
    const threshold = 50;
    if (end < start - threshold) {
      this.navigateLightbox(1); // Swipe left -> Next
    } else if (end > start + threshold) {
      this.navigateLightbox(-1); // Swipe right -> Prev
    }
  }

  // ------------------------------------------------------------------------
  // Filter & Search Logic
  // ------------------------------------------------------------------------
  applyFilter() {
    this.filteredItems = this.items.filter(item => {
      const matchesCategory = (this.currentCategory === 'all' || item.category === this.currentCategory);
      const matchesSearch = !this.searchQuery || 
        item.title.toLowerCase().includes(this.searchQuery) ||
        item.description.toLowerCase().includes(this.searchQuery) ||
        item.tags.some(tag => tag.toLowerCase().includes(this.searchQuery)) ||
        item.photographer.toLowerCase().includes(this.searchQuery);
      return matchesCategory && matchesSearch;
    });

    this.renderGallery();
    this.updateStats();
  }

  // ------------------------------------------------------------------------
  // DOM Rendering: Gallery Grid
  // ------------------------------------------------------------------------
  renderGallery() {
    this.grid.innerHTML = '';

    if (this.filteredItems.length === 0) {
      this.noResults.classList.remove('hidden');
      return;
    }

    this.noResults.classList.add('hidden');

    const fragment = document.createDocumentFragment();

    this.filteredItems.forEach((item, index) => {
      const isLiked = this.likedSet.has(item.id);
      
      const card = document.createElement('article');
      card.className = 'gallery-card';
      card.dataset.id = item.id;
      card.dataset.index = index;
      card.style.animationDelay = `${index * 60}ms`;
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `View ${item.title} by ${item.photographer}`);

      card.innerHTML = `
        <div class="card-media">
          <img 
            class="card-img" 
            src="${item.thumbUrl}" 
            alt="${item.title}" 
            loading="lazy"
            onerror="this.onerror=null; this.src='${generateFallbackSvg(item.title, item.category)}';"
          >
          <div class="card-overlay">
            <div class="card-top-actions">
              <span class="card-category-badge">${item.categoryLabel}</span>
              <button 
                class="card-like-btn ${isLiked ? 'liked' : ''}" 
                title="${isLiked ? 'Unlike' : 'Favorite'}" 
                aria-label="${isLiked ? 'Unlike' : 'Favorite'}"
              >
                <svg viewBox="0 0 24 24" width="18" height="18">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </button>
            </div>
            <div class="card-bottom-info">
              <h3 class="card-title">${item.title}</h3>
              <p class="card-author">Photo by <span>${item.photographer}</span></p>
              <span class="expand-cue">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                </svg>
                Click to expand
              </span>
            </div>
          </div>
        </div>
      `;

      // Keyboard accessibility for card activation (Enter key)
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.openLightboxById(item.id);
        }
      });

      fragment.appendChild(card);
    });

    this.grid.appendChild(fragment);
  }

  // ------------------------------------------------------------------------
  // Likes & Stats Handling
  // ------------------------------------------------------------------------
  toggleLike(id) {
    if (this.likedSet.has(id)) {
      this.likedSet.delete(id);
    } else {
      this.likedSet.add(id);
    }

    localStorage.setItem('lumina_liked_artworks', JSON.stringify([...this.likedSet]));
    
    // Sync Card UI
    const card = this.grid.querySelector(`.gallery-card[data-id="${id}"]`);
    if (card) {
      const btn = card.querySelector('.card-like-btn');
      const isLiked = this.likedSet.has(id);
      btn.classList.toggle('liked', isLiked);
      btn.setAttribute('aria-label', isLiked ? 'Unlike' : 'Favorite');
      btn.setAttribute('title', isLiked ? 'Unlike' : 'Favorite');
    }

    // Sync Lightbox UI if open
    if (this.isLightboxOpen) {
      const currentItem = this.filteredItems[this.currentIndex];
      if (currentItem && currentItem.id === id) {
        const isLiked = this.likedSet.has(id);
        this.lightboxLikeBtn.classList.toggle('liked', isLiked);
        this.lightboxLikeBtn.setAttribute('title', isLiked ? 'Unlike (L)' : 'Favorite (L)');
      }
    }

    this.updateStats();
  }

  updateStats() {
    this.totalCountEl.textContent = this.filteredItems.length;
    this.likesTotalEl.textContent = this.likedSet.size;
  }

  // ------------------------------------------------------------------------
  // Lightbox Modal Implementation
  // ------------------------------------------------------------------------
  openLightboxById(id) {
    const index = this.filteredItems.findIndex(item => item.id === id);
    if (index !== -1) {
      this.openLightbox(index);
    }
  }

  openLightbox(index) {
    this.currentIndex = index;
    this.isLightboxOpen = true;
    this.isZoomed = false;
    this.lightboxImg.classList.remove('zoomed');

    // Display modal
    this.modal.classList.add('active');
    this.modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Prevent page scroll

    this.renderThumbnails();
    this.updateLightboxContent();

    // Focus close button for accessibility
    setTimeout(() => this.lightboxCloseBtn.focus(), 100);
  }

  closeLightbox() {
    this.isLightboxOpen = false;
    this.modal.classList.remove('active');
    this.modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    this.isZoomed = false;
    this.lightboxImg.classList.remove('zoomed');
  }

  navigateLightbox(direction) {
    if (this.filteredItems.length <= 1) return;
    
    // Cyclical navigation
    const count = this.filteredItems.length;
    this.currentIndex = (this.currentIndex + direction + count) % count;
    
    this.isZoomed = false;
    this.lightboxImg.classList.remove('zoomed');
    this.updateLightboxContent();
  }

  setLightboxIndex(index) {
    if (index >= 0 && index < this.filteredItems.length) {
      this.currentIndex = index;
      this.isZoomed = false;
      this.lightboxImg.classList.remove('zoomed');
      this.updateLightboxContent();
    }
  }

  toggleZoom() {
    this.isZoomed = !this.isZoomed;
    this.lightboxImg.classList.toggle('zoomed', this.isZoomed);
  }

  updateLightboxContent() {
    const item = this.filteredItems[this.currentIndex];
    if (!item) return;

    // Show spinner while loading new high-res image
    this.spinner.classList.add('loading');
    this.lightboxImg.style.opacity = '0';

    // Metadata updates
    this.lightboxBadge.textContent = item.categoryLabel;
    this.lightboxCounter.textContent = `${this.currentIndex + 1} / ${this.filteredItems.length}`;
    this.lightboxTitle.textContent = item.title;
    this.lightboxDesc.textContent = item.description;
    this.lightboxAuthor.textContent = item.photographer;

    // Liked state in lightbox
    const isLiked = this.likedSet.has(item.id);
    this.lightboxLikeBtn.classList.toggle('liked', isLiked);
    this.lightboxLikeBtn.setAttribute('title', isLiked ? 'Unlike (L)' : 'Favorite (L)');

    // Image loading
    const tempImg = new Image();
    tempImg.src = item.fullUrl;
    
    tempImg.onload = () => {
      this.lightboxImg.src = item.fullUrl;
      this.lightboxImg.alt = item.title;
      this.spinner.classList.remove('loading');
      this.lightboxImg.style.opacity = '1';
    };

    tempImg.onerror = () => {
      // Fallback
      this.lightboxImg.src = generateFallbackSvg(item.title, item.category);
      this.lightboxImg.alt = item.title;
      this.spinner.classList.remove('loading');
      this.lightboxImg.style.opacity = '1';
    };

    // Update active thumbnail highlight
    this.updateActiveThumbnail();
  }

  renderThumbnails() {
    this.thumbnailsContainer.innerHTML = '';
    const frag = document.createDocumentFragment();

    this.filteredItems.forEach((item, index) => {
      const thumb = document.createElement('div');
      thumb.className = `thumb-item ${index === this.currentIndex ? 'active' : ''}`;
      thumb.dataset.index = index;
      thumb.setAttribute('role', 'tab');
      thumb.setAttribute('aria-label', `Thumbnail: ${item.title}`);
      
      thumb.innerHTML = `
        <img 
          src="${item.thumbUrl}" 
          alt="${item.title}" 
          onerror="this.onerror=null; this.src='${generateFallbackSvg(item.title, item.category)}';"
        >
      `;
      frag.appendChild(thumb);
    });

    this.thumbnailsContainer.appendChild(frag);
  }

  updateActiveThumbnail() {
    const thumbs = this.thumbnailsContainer.querySelectorAll('.thumb-item');
    thumbs.forEach((thumb, idx) => {
      const isActive = idx === this.currentIndex;
      thumb.classList.toggle('active', isActive);
      if (isActive) {
        thumb.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    });
  }
}

// --------------------------------------------------------------------------
// 3. Application Bootstrap
// --------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  window.app = new GalleryApp(galleryData);
});
