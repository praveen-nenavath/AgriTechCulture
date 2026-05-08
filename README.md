 visit : [(https://agri-tech-culture.vercel.app/)](https://agri-tech-culture.vercel.app/)
# AgriTechCulture
AgriTechCulture is a smart farming platform empowering farmers with AI-driven crop session management, real-time hyper-local weather forecasts, step-by-step cultivation guides from seed to harvest, a live marketplace to buy inputs &amp; sell produce, profit calculators, and expert agronomic tips — all in one responsive platform.


# 🌿 AgriTechCulture — Smart Farming Platform

> **Empowering Indian farmers with technology, knowledge, and market access to build sustainable, profitable farms for generations.**

---

## 📌 Table of Contents

- [Overview](#overview)
- [Live Demo](#live-demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Sections Breakdown](#sections-breakdown)
- [Crop Session Manager](#crop-session-manager)
- [Weather Intelligence](#weather-intelligence)
- [Cultivation Guide](#cultivation-guide)
- [Farm Marketplace](#farm-marketplace)
- [Profit Calculator](#profit-calculator)
- [Farming Tips](#farming-tips)
- [LocalStorage Usage](#localstorage-usage)
- [Responsive Design](#responsive-design)
- [Supported Crops](#supported-crops)
- [Color Palette & Design System](#color-palette--design-system)
- [Getting Started](#getting-started)
- [Customization Guide](#customization-guide)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

---

## 📖 Overview

**AgriTechCulture** is a comprehensive, single-page responsive web application designed for Indian farmers. It provides an all-in-one smart farming dashboard that covers the complete agricultural lifecycle — from soil preparation and seed selection to harvest, post-harvest processing, and profitable market sales.

The platform bridges the gap between traditional farming knowledge and modern agricultural technology, offering:

- Real-time hyper-local weather forecasts
- Interactive crop session tracking
- Detailed cultivation guides for major Indian crops
- A live marketplace for buying inputs and selling produce
- A profit calculator with MSP-based projections
- Expert agronomic tips and best practices

---

## 🚀 Live Demo

Open `agritechculture.html` directly in any modern browser — no server or build step required.

```bash
# Simply open the file in your browser
open agritechculture.html
# or on Windows
start agritechculture.html
```

---

## ✨ Features

| Feature | Description |
|---|---|
| 🌾 Crop Session Manager | Add, track, and manage multiple crop sessions with localStorage persistence |
| 🌤 Weather Intelligence | 7-day forecast cards with crop-specific weather alerts |
| 📚 Cultivation Guide | Step-by-step timeline guides for 5 major crops |
| 🛒 Farm Marketplace | Buy inputs, sell produce, live mandi price table |
| 💰 Profit Calculator | Slider-based ROI estimator using real MSP values |
| 💡 Expert Tips | 6 best-practice cards covering all farming phases |
| 📱 Fully Responsive | Mobile-first design using Bootstrap 5 grid |
| 💾 Offline Capable | All crop data stored in browser localStorage |
| 🎨 Scroll Animations | AOS (Animate On Scroll) for engaging UI transitions |
| 🔔 Toast Notifications | Real-time feedback for all user interactions |

---

## 🛠 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **HTML5** | — | Semantic page structure |
| **CSS3** | — | Custom properties, animations, layout |
| **Bootstrap** | 5.3.2 | Responsive grid, modals, utility classes |
| **JavaScript** | ES6+ | Interactivity, localStorage, DOM manipulation |
| **AOS** | 2.3.4 | Scroll-triggered animations |
| **Font Awesome** | 6.5.0 | Icon library |
| **Google Fonts** | — | Playfair Display + DM Sans typography |

> All dependencies are loaded via CDN — no npm install or build tool required.

---

## 📁 Project Structure

```
agritechculture/
│
├── agritechculture.html       # Main single-page application (all-in-one)
├── README.md                  # Project documentation (this file)
│
└── assets/                    # (optional — for future expansion)
    ├── css/
    │   └── style.css          # Extract <style> block here if splitting files
    ├── js/
    │   └── app.js             # Extract <script> block here if splitting files
    └── images/
        └── ...                # Crop images, hero backgrounds, product photos
```

> Currently all HTML, CSS, and JavaScript are bundled in a single `agritechculture.html` file for zero-dependency deployment.

---

## 📐 Sections Breakdown

### 1. Navbar
- Sticky top navigation with backdrop blur
- Responsive hamburger menu on mobile
- Active link highlighting and smooth scroll
- "Get Started" CTA button routing to Crop Manager
- Scroll-triggered shadow effect via JavaScript

### 2. Hero Section
- Full-viewport dark green atmospheric hero
- Animated floating info cards (weather, sessions, mandi prices)
- Live pulse dot indicator for real-time data
- Platform statistics: 12K+ farmers, 98% yield accuracy, ₹2.4Cr traded
- Dual CTA buttons: Start a Session / View Guide

### 3. Features Overview
- 4-column responsive feature cards
- Hover lift animation with green border accent
- Icons with color-coded backgrounds

---

## 🌱 Crop Session Manager

The core feature of the platform. Farmers can log and track every active crop.

### Form Fields
| Field | Type | Required |
|---|---|---|
| Crop Type | Dropdown | Yes |
| Sowing Date | Date Picker | Yes |
| Field Area (acres) | Number | Yes |
| Soil Type | Dropdown | Yes |
| Current Growth Stage | Dropdown | No |
| Notes | Textarea | No |

### Supported Crops (Dropdown)
Wheat, Rice, Maize, Tomato, Onion, Potato, Sugarcane, Cotton, Soybean, Groundnut, Turmeric, Chilli

### Growth Stages
1. Seed / Germination
2. Seedling
3. Vegetative Growth
4. Flowering
5. Fruiting / Pod Formation
6. Maturation
7. Ready to Harvest

### Table Features
- Color-coded stage badges (yellow = seed, green = growing, brown = harvest)
- Per-row delete button
- "Clear All" button with confirmation dialog
- Empty state message when no sessions exist

### Data Persistence
```javascript
// Data is saved to localStorage on every add/remove
localStorage.setItem('atc_crops', JSON.stringify(crops));

// Loaded on page init
let crops = JSON.parse(localStorage.getItem('atc_crops') || '[]');
```

---

## 🌤 Weather Intelligence

### 7-Day Forecast Cards
- Today through Sunday displayed as glassmorphism cards
- Weather emoji icons (☀️⛅🌧️⛈️)
- Day label, temperature, and description per card

### Location Panel
- City input field with search icon
- "Update Forecast" button (triggers toast notification)
- Live weather stats:
  - Humidity, Wind Speed, Feels Like
  - Cloud Cover, Sunrise & Sunset times

### Crop Weather Alert
- Yellow alert banner at section bottom
- Warns farmers about upcoming unfavorable conditions
- Example: "Heavy rain forecast Wednesday–Friday. Delay pesticide application."

> **Note:** Weather data is currently demo/static. To connect live data, integrate the [OpenWeatherMap API](https://openweathermap.org/api) — see Customization Guide below.

---

## 📚 Cultivation Guide

An interactive, timeline-based crop cultivation guide from seed to sale.

### Supported Crops
| Crop | Steps | Key Coverage |
|---|---|---|
| 🌾 Wheat | 7 steps | Soil prep → Sowing → Irrigation → Pest → Harvest → Storage → Marketing |
| 🌾 Rice | 6 steps | Land prep → Nursery → Water mgmt → Weed/pest → Harvest → Milling |
| 🍅 Tomato | 7 steps | Nursery → Planting → Drip fertigation → Disease mgmt → Staking → Grading → Profit |
| 🧅 Onion | 6 steps | Variety → Transplanting → Irrigation → Disease → Harvest → Storage |
| 🌿 Cotton | 6 steps | Soil → Bt seed → Irrigation → IPM → Picking → Marketing |

### Timeline Structure
Each step contains:
- Step number and icon
- Step title
- Detailed description paragraph
- Bulleted pro tips list

### Dynamic Rendering
```javascript
// Selecting a crop from the dropdown rebuilds the entire timeline
document.getElementById('guideSelect').onchange = updateGuide;

// AOS is refreshed after DOM update for animations
AOS.refresh();
```

---

## 🛒 Farm Marketplace

### Product Catalog (6 items)
| Product | Category | Price |
|---|---|---|
| Hybrid Wheat Seeds | Seeds | ₹480/kg |
| Mini Power Tiller | Tools | ₹42,000/unit |
| NPK Bio-Fertiliser | Fertiliser | ₹320/50kg |
| Neem-Based Pesticide | Pest Control | ₹210/L |
| Drip Irrigation Kit | Irrigation | ₹8,500/acre |
| Vermicompost Premium | Organic | ₹18/kg |

### Features
- Product search/filter (live text filtering across all product cards)
- "Add to Cart" button with toast notification
- Product badges: Best Seller, Organic, New
- Color-themed product image backgrounds

### Sell Your Produce Modal
Fields: Produce type, quantity (q), asking price (₹/q), location, contact, description

### Live Mandi Price Table
Real-time price table showing Min / Max / Modal price for:
Wheat, Onion, Tomato, Rice, Soybean — sourced from APMC Pune

---

## 💰 Profit Calculator

### Input Sliders
| Slider | Range | Default |
|---|---|---|
| Field Area | 0.5–20 acres | 2 acres |
| Yield | 10–80 q/acre | 35 q/acre |
| Input Cost | ₹2,000–₹50,000/acre | ₹12,000 |

### MSP Values Used
```javascript
const MSP = {
  wheat: 2275,    // ₹/quintal
  rice: 2183,
  tomato: 2800,
  onion: 1890,
  soybean: 4450
};
```

### Output
- **Total Revenue** = Area × Yield × MSP
- **Total Cost** = Area × Input Cost
- **Net Profit** = Revenue − Cost
- **ROI %** = (Profit / Cost) × 100
- Dynamic advice text with actionable recommendations

---

## 💡 Farming Tips

6 expert tip cards with left green border accent:

| Topic | Key Message |
|---|---|
| Soil Health | Test NPK & pH before every season |
| Irrigation | Irrigate at critical crop stages only |
| Pest Management | Follow Integrated Pest Management (IPM) |
| Post-Harvest | Dry to <12% moisture, ventilated storage |
| Market Timing | Hold 20–30% stock for off-peak pricing |
| Crop Rotation | Cereals → Legumes for free nitrogen fixation |

---

## 💾 LocalStorage Usage

| Key | Type | Data |
|---|---|---|
| `atc_crops` | JSON Array | All active crop session objects |

### Crop Object Schema
```json
{
  "id": 1717000000000,
  "type": "Wheat",
  "date": "2025-01-15",
  "area": "2.5",
  "soil": "Black Cotton Soil",
  "stage": "Vegetative Growth",
  "notes": "Applied DAP last week"
}
```

---

## 📱 Responsive Design

| Breakpoint | Layout Behavior |
|---|---|
| `< 576px` (Mobile) | Single column, smaller hero title, wrapped stats |
| `576–768px` (Tablet) | 2-column product grid, stacked form |
| `768–992px` (Landscape) | Timeline collapses to single column |
| `> 992px` (Desktop) | Full 2-column timeline, side-by-side sections |

Key responsive classes used:
- `col-md-6 col-lg-4` — Product cards
- `col-lg-5 / col-lg-7` — Crop manager split
- `d-flex flex-wrap` — Hero stats and buttons
- `clamp()` CSS function — Fluid typography

---

## 🎨 Color Palette & Design System

### CSS Custom Properties
```css
:root {
  --soil:    #3b2a1a;   /* Deep brown — headings, soil theme */
  --bark:    #5c3d1e;   /* Medium brown — secondary text */
  --moss:    #4a7c59;   /* Primary green — buttons, accents */
  --leaf:    #6aab5e;   /* Mid green — hover states */
  --lime:    #a8d672;   /* Light green — hero accents */
  --sun:     #f0c040;   /* Warm yellow — alerts, highlights */
  --sky:     #d4efff;   /* Light blue — weather section */
  --cream:   #fdf6e3;   /* Off-white — section backgrounds */
  --offwhite:#f5f0e8;   /* Warm white — body background */
  --card-bg: #fffdf7;   /* Pure white — card backgrounds */
}
```

### Typography
- **Display / Headings:** Playfair Display (serif) — weight 400, 700, 900
- **Body / UI:** DM Sans (sans-serif) — weight 300, 400, 500, 600

### Animation System
- **AOS library** for scroll-triggered reveals (`fade-up`, `fade-left`, `fade-right`)
- **CSS keyframe** `pulse` for live data indicator dot
- **CSS keyframe** `fadeIn` for toast notifications
- **CSS transitions** on all interactive cards and buttons (0.2–0.3s ease)

---

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- No build tools, no Node.js, no server required

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/agritechculture.git

# Navigate to folder
cd agritechculture

# Open in browser
open agritechculture.html
```

Or simply **download** `agritechculture.html` and open it in your browser.

---

## 🔧 Customization Guide

### 1. Connect Live Weather API (OpenWeatherMap)

Replace the static weather cards with real data:

```javascript
// Add your API key
const API_KEY = 'YOUR_OPENWEATHERMAP_KEY';

async function fetchWeather(city) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
  );
  const data = await res.json();
  // Map data.list to weather cards
}
```

### 2. Add More Crops to Session Manager

In the `<select id="cropType">` dropdown:
```html
<option>Banana</option>
<option>Grapes</option>
<option>Mango</option>
```

### 3. Add a New Cultivation Guide

In the `GUIDES` JavaScript object:
```javascript
const GUIDES = {
  // ... existing crops
  banana: {
    steps: [
      { icon: 'fa-seedling', step: 'Step 1', title: 'Sucker Selection',
        desc: 'Choose healthy sword suckers...', tips: ['Tip 1', 'Tip 2'] },
      // add more steps
    ]
  }
};
```

Then add to the guide dropdown:
```html
<option value="banana">🍌 Banana</option>
```

### 4. Update MSP / Market Prices

Edit the `MSP` object in the script section:
```javascript
const MSP = {
  wheat: 2275,   // Update with current government MSP
  rice: 2183,
  // add new crops
};
```

### 5. Add Products to Marketplace

Duplicate a product card `<div class="col-md-6 col-lg-4 product-item">` block and update:
- Product name, description, price
- Image background class (seeds / tools / fert / pest / water / organic)
- Badge text (optional)

---

## 🔮 Future Enhancements

- [ ] **OpenWeatherMap API Integration** — Real-time, GPS-based hyper-local forecasts
- [ ] **User Authentication** — Firebase Auth for multi-device sync
- [ ] **Cloud Database** — Firebase Firestore for persistent cross-device crop sessions
- [ ] **PWA Support** — Service Worker for offline access and home screen install
- [ ] **SMS Alerts** — Twilio integration for weather and crop stage SMS notifications
- [ ] **AI Crop Doctor** — Image-based disease detection using TensorFlow.js
- [ ] **e-NAM Integration** — Live mandi prices via NIC e-NAM API
- [ ] **Multi-language Support** — Hindi, Marathi, Telugu, Kannada, Tamil
- [ ] **Government Schemes** — PM-Kisan, soil health card, KCC loan information
- [ ] **FPO Registration Portal** — Farmer Producer Organisation onboarding
- [ ] **Satellite Field Monitoring** — NDVI maps via Google Earth Engine API
- [ ] **Voice Assistant** — Vernacular voice commands for low-literacy farmers

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/add-crop-disease-tracker`
3. Commit your changes: `git commit -m 'Add crop disease tracker feature'`
4. Push to branch: `git push origin feature/add-crop-disease-tracker`
5. Open a Pull Request

### Code Standards
- Use CSS custom properties for all colors
- Follow BEM-lite naming for new CSS classes
- Test on mobile (375px) and desktop (1440px) before submitting
- Add AOS attributes to any new above-fold sections

---

## 📄 License

```
MIT License

Copyright (c) 2025 AgriTechCulture

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

## 📞 Contact & Support

- 🌐 Website: [agritechculture.in](https:agritechculture.vercel.app)
- 📧 Email: orthonayk@gmail.com
- 📱 Kisan Helpline: +91 9618963009 (Toll Free)
- 💬 WhatsApp Community: [Join Group](https://wa.me/+919618963009)

---

<div align="center">

**🌾 Built with ❤️ for India's 140 Million Farmers**

*AgriTechCulture — From Seed to Profit, We're With You.*

</div>
