// Product Catalog: Living Things & Non-Living Things
const PRODUCTS = [
  // --- LIVING THINGS (Plants, Bonsai, Aquatic Life, Herbs) ---
  {
    id: "prod-living-01",
    name: "Monstera Deliciosa - Swiss Cheese Plant (Large, 3ft)",
    type: "living",
    category: "Plants",
    price: 49.99,
    originalPrice: 65.00,
    rating: 4.8,
    reviewCount: 1420,
    stock: 12,
    badge: "Amazon's Choice",
    image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80",
    thumbnails: [
      "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1597055181300-e3633a917c9c?auto=format&fit=crop&w=800&q=80"
    ],
    description: "The iconic Monstera Deliciosa is a vigorous tropical climbing plant famous for its natural leaf perforations. Grown organically in nursery pots, it brings vibrant jungle aesthetics and natural air purification to any living room or office.",
    details: {
      isLiving: true,
      light: "Bright, indirect sunlight",
      water: "Every 7-10 days when top 2 inches of soil are dry",
      petFriendly: "Mildly toxic if ingested (keep out of reach)",
      difficulty: "Easy / Beginner-friendly",
      origin: "Southern Mexico & Central America",
      airPurifying: "High (filters formaldehyde & benzene)"
    }
  },
  {
    id: "prod-living-02",
    name: "Japanese Juniper Bonsai Tree (7 Years Old in Glazed Pot)",
    type: "living",
    category: "Plants",
    price: 68.50,
    originalPrice: 89.00,
    rating: 4.9,
    reviewCount: 895,
    stock: 5,
    badge: "Best Seller",
    image: "https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=800&q=80",
    thumbnails: [
      "https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Hand-trained by master bonsai artisans for seven years, this Juniperus Procumbens embodies harmony, patience, and serenity. Potted in an authentic ceramic glazed dish with decorative river stones and humidity tray.",
    details: {
      isLiving: true,
      light: "Outdoor sunny spot or bright indoor windowsill (4-6 hrs light)",
      water: "Keep moist; mist foliage daily, water when soil surface dries",
      petFriendly: "Non-toxic to cats and dogs",
      difficulty: "Intermediate",
      origin: "Kyoto, Japan",
      age: "7 Years"
    }
  },
  {
    id: "prod-living-03",
    name: "Betta Splendens Halfmoon Fish & Eco-Aquarium Starter Kit",
    type: "living",
    category: "Aquatics",
    price: 39.99,
    originalPrice: 52.00,
    rating: 4.7,
    reviewCount: 630,
    stock: 8,
    badge: "Climate Pledge Friendly",
    image: "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=800&q=80",
    thumbnails: [
      "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?auto=format&fit=crop&w=800&q=80"
    ],
    description: "A breathtaking royal blue and crimson Halfmoon Betta fish, ethically raised and shipped with overnight temperature-regulated oxygen packing. Includes 3-gallon glass tank, gentle LED filter, conditioning drops, and high-protein pellet diet.",
    details: {
      isLiving: true,
      temperature: "76°F - 82°F (24°C - 28°C)",
      diet: "Carnivorous (Micro-pellets, freeze-dried bloodworms twice daily)",
      tankSize: "3 to 5 Gallons minimum",
      lifespan: "3 - 5 Years",
      origin: "Southeast Asia (Captive Bred)",
      temperament: "Solitary (peaceful with snails and shrimp)"
    }
  },
  {
    id: "prod-living-04",
    name: "Rare Calathea Orbifolia - Living Prayer Plant",
    type: "living",
    category: "Plants",
    price: 34.00,
    originalPrice: 42.00,
    rating: 4.6,
    reviewCount: 412,
    stock: 15,
    badge: "Limited Edition",
    image: "https://images.unsplash.com/photo-1598880940371-c756e015fea1?auto=format&fit=crop&w=800&q=80",
    thumbnails: [
      "https://images.unsplash.com/photo-1598880940371-c756e015fea1?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Famous for its oversized round leaves with mesmerizing silver-green metallic stripes. As a prayer plant, its leaves gently fold upward at night in an organic circadian rhythm, opening wide each morning.",
    details: {
      isLiving: true,
      light: "Medium to bright indirect light (avoids harsh sun)",
      water: "Distilled or filtered water when top inch dries",
      petFriendly: "100% Pet Safe (ASPCA Certified Non-Toxic)",
      humidity: "High (above 60% preferred)",
      difficulty: "Moderate",
      origin: "Bolivian Amazon Rainforest"
    }
  },
  {
    id: "prod-living-05",
    name: "Organic Culinary Kitchen Herb Trio (Basil, Rosemary, Mint)",
    type: "living",
    category: "Gardening",
    price: 24.99,
    originalPrice: 32.00,
    rating: 4.9,
    reviewCount: 1120,
    stock: 22,
    badge: "Prime Choice",
    image: "https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&w=800&q=80",
    thumbnails: [
      "https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Potted live culinary herbs ready for kitchen countertop picking. Enjoy fresh sweet Genovese basil for pestos, Tuscan rosemary for roasting, and refreshing spearmint for teas and mojitos.",
    details: {
      isLiving: true,
      light: "Full sun / Bright kitchen windowsill (6+ hours)",
      water: "Water thoroughly when topsoil feels dry",
      harvest: "Cut stem tips regularly to encourage bushy regrowth",
      organicCertified: "USDA 100% Organic",
      difficulty: "Super Easy",
      edible: "Yes, 100% culinary fresh"
    }
  },
  {
    id: "prod-living-06",
    name: "Exotic Living Succulent Terrarium (Glass Geometric Dome)",
    type: "living",
    category: "Plants",
    price: 42.50,
    originalPrice: 55.00,
    rating: 4.7,
    reviewCount: 378,
    stock: 7,
    badge: "Handcrafted",
    image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=800&q=80",
    thumbnails: [
      "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=800&q=80"
    ],
    description: "A self-contained living ecosystem featuring five assorted drought-tolerant succulents, preserved moss, activated charcoal filtration, and volcanic mineral pebbles inside a handcrafted brass geometric glass vessel.",
    details: {
      isLiving: true,
      light: "Moderate to high direct/indirect sunlight",
      water: "Minimal (1-2 tablespoons every 3-4 weeks)",
      petFriendly: "Safe varieties included",
      difficulty: "Zero Maintenance",
      materials: "Handblown glass, brass metal frame, living echeverias"
    }
  },
  {
    id: "prod-living-07",
    name: "Live Painted Lady Butterfly Garden Habitat with 5 Caterpillars",
    type: "living",
    category: "Aquatics",
    price: 29.95,
    originalPrice: 38.00,
    rating: 4.8,
    reviewCount: 2240,
    stock: 18,
    badge: "STEM Educational Hit",
    image: "https://images.unsplash.com/photo-1535083783855-76ae62b2914e?auto=format&fit=crop&w=800&q=80",
    thumbnails: [
      "https://images.unsplash.com/photo-1535083783855-76ae62b2914e?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Witness one of nature's greatest miracles! Includes a cup of 5 live caterpillars with nutritious food, a 12-inch collapsible breathable mesh habitat, chrysalis holding log, feeding dropper, and full metamorphosis observation guide.",
    details: {
      isLiving: true,
      growthCycle: "21 Days from caterpillar to butterfly",
      care: "Keep indoors at room temperature, out of direct sun",
      feeding: "Sugar water dropper or fresh fruit slices once emerged",
      release: "Safe to release into garden when temperature is above 55°F"
    }
  },

  // --- NON-LIVING THINGS (Tech, Electronics, Smart Home, Lifestyle) ---
  {
    id: "prod-nonliving-01",
    name: "Sony WH-1000XM5 Wireless Active Noise-Canceling Headphones",
    type: "non-living",
    category: "Audio",
    price: 348.00,
    originalPrice: 399.99,
    rating: 4.8,
    reviewCount: 18450,
    stock: 25,
    badge: "Best Seller",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    thumbnails: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Industry-leading noise cancelation optimized automatically by dual processors and 8 microphones. Enjoy ultra-clear hands-free calling, 30-hour battery life, and lightweight soft-fit leather for all-day comfort.",
    details: {
      isLiving: false,
      batteryLife: "Up to 30 hours with ANC enabled",
      connectivity: "Bluetooth 5.2, Multipoint connection, 3.5mm AUX",
      charging: "USB-C Quick Charge (3 mins = 3 hours playback)",
      weight: "250g (ultra-lightweight)",
      warranty: "1 Year Manufacturer Comprehensive Warranty",
      anc: "Dual Processor V1 & QN1 noise cancelling"
    }
  },
  {
    id: "prod-nonliving-02",
    name: "Keychron Q1 Pro Wireless Custom Mechanical Keyboard (QMK/VIA)",
    type: "non-living",
    category: "Electronics",
    price: 199.00,
    originalPrice: 229.00,
    rating: 4.9,
    reviewCount: 3410,
    stock: 9,
    badge: "Amazon's Choice",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
    thumbnails: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Precision CNC machined 6063 aluminum body with double-gasket acoustic mounting design. Equipped with hot-swappable Keychron K Pro Banana switches, south-facing RGB backlighting, and programmable rotary knob.",
    details: {
      isLiving: false,
      chassis: "Full CNC machined 6063 aluminum body",
      switches: "Hot-swappable Pre-lubed Mechanical Switches",
      connectivity: "Bluetooth 5.1 & Type-C wired (1000Hz polling rate)",
      battery: "4000 mAh Rechargeable Li-polymer (300 hours standby)",
      compatibility: "Mac, Windows, Linux (swappable keycaps included)",
      warranty: "2 Years Limited Warranty"
    }
  },
  {
    id: "prod-nonliving-03",
    name: "Apple Watch Series 9 GPS [45mm Midnight Aluminum]",
    type: "non-living",
    category: "Electronics",
    price: 389.00,
    originalPrice: 429.00,
    rating: 4.9,
    reviewCount: 9820,
    stock: 14,
    badge: "Top Rated",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80",
    thumbnails: [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Powered by the S9 SiP chip with an ultra-bright Always-On Retina display up to 2000 nits. Featuring innovative Double Tap gesture, Blood Oxygen sensing, ECG heart health monitoring, and Crash Detection.",
    details: {
      isLiving: false,
      display: "45mm Always-On Retina OLED (2000 nits)",
      sensors: "Blood Oxygen, ECG, Temperature sensing, Heart Rate",
      waterResistance: "50 meters (Swimproof)",
      batteryLife: "18 hours regular / 36 hours Low Power Mode",
      compatibility: "iOS with iPhone Xs or later",
      warranty: "1 Year AppleCare eligible"
    }
  },
  {
    id: "prod-nonliving-04",
    name: "Breville Barista Touch Espresso Machine (Stainless Steel)",
    type: "non-living",
    category: "Home & Kitchen",
    price: 899.95,
    originalPrice: 999.95,
    rating: 4.8,
    reviewCount: 4230,
    stock: 4,
    badge: "Premium Choice",
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=800&q=80",
    thumbnails: [
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Third wave specialty coffee at home made effortless with automated touch screen menu. Features ThermoJet 3-second instant heating, integrated conical burr grinder with dose control, and auto microfoam milk texturing.",
    details: {
      isLiving: false,
      heatingSystem: "ThermoJet technology (3-second heat up time)",
      grinder: "Integrated hardened steel conical burr grinder (30 grind settings)",
      milkFrother: "Auto steam wand with 8 microfoam texture settings",
      waterTank: "67 fl oz (2L) removable with water filter",
      power: "1680 Watts / 120 Volts",
      warranty: "2 Year Repair Warranty"
    }
  },
  {
    id: "prod-nonliving-05",
    name: "Roborock S8 Pro Ultra Robot Vacuum & Sonic Mop Dock",
    type: "non-living",
    category: "Smart Home",
    price: 1199.99,
    originalPrice: 1599.99,
    rating: 4.7,
    reviewCount: 2680,
    stock: 6,
    badge: "Prime Big Deal",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    thumbnails: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Complete hands-free cleaning system with the all-in-one RockDock Ultra that auto-empties dust, washes the mop with warm water, auto-dries with heated air, and refills the robot water tank automatically.",
    details: {
      isLiving: false,
      suctionPower: "6000 Pa HyperForce extreme suction",
      navigation: "PreciSense LiDAR navigation & 3D obstacle avoidance",
      mopping: "VibraRise 2.0 dual sonic vibration scrubbers (3000 rpm)",
      dockCapabilities: "Self-wash, self-dry, self-empty, self-refill",
      smartIntegration: "Alexa, Google Assistant, Apple Siri Shortcuts",
      warranty: "2 Years Manufacturer Warranty"
    }
  },
  {
    id: "prod-nonliving-06",
    name: "DJI Mini 4 Pro 4K HDR Camera Drone (Fly More Combo)",
    type: "non-living",
    category: "Electronics",
    price: 759.00,
    originalPrice: 859.00,
    rating: 4.9,
    reviewCount: 3100,
    stock: 11,
    badge: "Staff Pick",
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80",
    thumbnails: [
      "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Under 249g ultra-lightweight drone with omnidirectional obstacle sensing, 4K/60fps HDR True Vertical shooting, 20km FHD video transmission, and up to 34 minutes flight time per intelligent flight battery.",
    details: {
      isLiving: false,
      weight: "<249g (No FAA registration required for recreational use)",
      camera: "1/1.3-inch CMOS, f/1.7 aperture, 48MP raw photos, 4K/60fps HDR",
      transmission: "DJI O4 video transmission up to 20 km",
      safety: "Omnidirectional active obstacle avoidance sensors",
      flightTime: "34 minutes (3 batteries included = 100+ mins total)",
      warranty: "1 Year DJI Care Refresh Support"
    }
  },
  {
    id: "prod-nonliving-07",
    name: "Minimalist Ergonomic Dynamic Desk Lamp with Wireless Fast Charger",
    type: "non-living",
    category: "Smart Home",
    price: 54.99,
    originalPrice: 75.00,
    rating: 4.6,
    reviewCount: 1840,
    stock: 30,
    badge: "Prime Choice",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
    thumbnails: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Crafted from anodized space-gray aluminum with multi-axis rotation. Offers 5 color temperatures (2700K - 6500K), smooth touch slider dimming, eye-care flicker-free diffuser, and 15W Qi wireless phone charger in base.",
    details: {
      isLiving: false,
      lumens: "850 Lumens eye-caring LED (CRI > 95)",
      colorTemp: "5 Modes (Warm 2700K to Daylight 6500K)",
      wirelessCharging: "15W Qi Fast Charging base + USB-A output port",
      materials: "Space-grade aluminum alloy and silicone",
      timer: "45-minute auto shutoff sleep timer",
      warranty: "3 Years Replacement Warranty"
    }
  }
];

// Helper to look up a product by its ID
function getProductById(id) {
  return PRODUCTS.find(product => product.id === id);
}
