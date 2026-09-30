# Millenniumebooks — Static Website & Documentation

**Brand:** Millenniumebooks  
**Website:** [www.millenniumebooks.com](https://www.millenniumebooks.com)  
**Legal Entity:** Nova Forge LLC (USA)  
**Official Email:** [info@millenniumebooks.com](mailto:info@millenniumebooks.com)

---

## 1. Project Overview

Millenniumebooks is a clean, modern, fully responsive static website built with pure HTML5, vanilla CSS, and vanilla JavaScript (no heavy frameworks or build steps required). It supports two core business revenue streams:

1. **Custom E-Book Writing & Design:** Commissioned ghostwriting and production packages:
   - **Starter ($500):** Up to 8,000 words, 1 cover design, 2 revisions, PDF delivery (7 days std / 4 days fast +$150).
   - **Professional ($900 - Most Popular):** Up to 20,000 words, front cover + spine, 4 revisions, PDF + EPUB (12 days std / 7 days fast +$250).
   - **Premium ($1500+):** Up to 40,000 words, front & back cover wrap, unlimited revisions, PDF + EPUB + print-ready file (20 days std / 12 days fast +$400).
2. **Ready-Made Original E-Books:** An exclusive catalogue of 100% original e-books ($100–$300 each) delivered instantly via digital download (PDF & EPUB).
3. **Optional Print Fulfillment:** Handled via US print-on-demand fulfillment partners upon client request.

---

## 2. Directory Structure

```text
D:\EBOOKS\
├── index.html            # Homepage (Hero, 2 pillars, 6 featured books, how it works, portfolio preview)
├── services.html         # Custom e-book services & dynamic package comparison table
├── order.html            # Project intake brief with live package prefill & Stripe direct links
├── ready-made.html       # Storefront with interactive category filter tabs & product modal
├── portfolio.html        # Showcase of 6 custom client book projects & confidentiality notice
├── how-it-works.html     # 5-step publishing workflow & interactive FAQ accordion
├── about.html            # About Nova Forge LLC & 3 core verifiable publishing pillars
├── contact.html          # Contact details, response times (1-2 days) & validated message form
├── thank-you.html        # Universal confirmation page with SVG checkmark for inquiries & orders
├── privacy.html          # Plain-English Privacy Policy (Stripe processing, data retention)
├── terms.html            # Plain-English Terms of Service (100% copyright transfer to client)
├── refund-policy.html    # Plain-English Refund & Delivery Policy (milestones & digital goods)
├── README.md             # Website owner operations guide
│
├── css\
│   ├── normalize.css     # CSS normalization
│   ├── style.css         # Master stylesheet (tokens, typography, tables, cards, responsive)
│   └── vendor.css        # Vendor styles
├── style.css             # Root stylesheet importing css/style.css
│
├── js\
│   ├── products.js       # Central data configuration (packages, books, add-ons, Stripe links)
│   └── main.js           # Interactive vanilla JS controller (drawer, pricing calculator, modals)
│
└── assets\
    └── covers\           # 14 original SVG book covers (8 ready-made + 6 portfolio)
```

---

## 3. How to Configure & Edit Products and Packages

All product data, pricing, word counts, delivery times, and Stripe links are centralized in one easily editable file:
📂 **[`js/products.js`](js/products.js)**

### A. Editing Ready-Made E-Books
Open `js/products.js` and locate the `READY_MADE_PRODUCTS` array. Each product has the following structure:
```javascript
{
  id: "sovereign-executive",
  title: "The Sovereign Executive",
  subtitle: "Modern Frameworks for Radical Autonomy & High-Leverage Leadership",
  category: "Business",
  categorySlug: "business",
  price: 180, // Price in USD ($100–$300)
  format: "PDF + EPUB",
  pageCount: "214 pages",
  cover: "assets/covers/cover-sovereign-executive.svg", // Swap with your real cover later
  stripeLink: "https://buy.stripe.com/your_live_link_here",
  shortDesc: "A masterclass in operational independence...",
  fullDesc: "...",
  toc: [ "Chapter 1: ...", "Chapter 2: ..." ],
  whatYouGet: [ "Complete master book in PDF", "EPUB version", ... ]
}
```

### B. Editing Custom E-Book Packages & Add-Ons
Open `js/products.js` and locate `CUSTOM_PACKAGES`. You can adjust prices, word counts, turnaround days, and rush fees:
```javascript
starter: {
  basePrice: 500,
  wordCount: "Up to 8,000 words",
  stdDays: 7,
  fastDays: 4,
  fastUpsell: 150,
  stripeLinkStd: "https://buy.stripe.com/your_starter_std_link",
  stripeLinkFast: "https://buy.stripe.com/your_starter_fast_link"
}
```

---

## 4. Where to Paste Stripe Payment Links

1. **In Stripe Dashboard:** Go to **Payment Links** and create a payment link for each ready-made book and each custom tier.
2. **In `js/products.js`:**
   - Under `READY_MADE_PRODUCTS`, replace each `stripeLink` property.
   - Under `CUSTOM_PACKAGES`, replace `stripeLinkStd` and `stripeLinkFast`.
3. **In `order.html` (Optional direct reservation button):**
   The direct Stripe button on `order.html` is automatically updated dynamically by `js/main.js` from the links configured in `js/products.js`!

---

## 5. Setting Up Forms (Contact, Order Brief & Newsletter)

The forms are pre-configured to work with **Formspree** or **Web3Forms**:

1. Go to [https://formspree.io](https://formspree.io) (or [https://web3forms.com](https://web3forms.com)) and create your free form endpoint.
2. Open `index.html`, `contact.html`, and `order.html`.
3. Find the `<form>` tag:
   ```html
   <form id="contact-us-form" action="https://formspree.io/f/your-form-id" method="POST">
   ```
4. Replace `your-form-id` with your unique form ID (e.g. `https://formspree.io/f/mqkrzxyz`).
5. Also update `SITE_CONFIG` inside `js/products.js` for consistency.

> **Note on Client Experience:** If a form is submitted while the endpoint remains a placeholder, `js/main.js` automatically prevents error pages and smoothly redirects the user to `thank-you.html`.

---

## 6. Swapping Book Covers for Your Real Cover Files

The website currently uses 14 high-resolution, vector-based SVG covers located in `assets/covers/`.

To replace them with your own JPEG or PNG book cover artwork:
1. Export your cover images with an aspect ratio of approximately **1:1.45** (e.g. 800 × 1160 px).
2. Save your image into `assets/covers/` (e.g. `assets/covers/my-book-cover.jpg`).
3. Update the `cover:` path in `js/products.js` to point to your new image file.

---

## 7. Deployment Instructions

Since this is a 100% static site with zero compilation or node dependencies needed in production, it can be deployed in minutes on any host:

### Option A: Netlify (Recommended)
1. Log in to [Netlify](https://www.netlify.com).
2. Go to **Sites** → **Add new site** → **Deploy manually**.
3. Drag and drop the `D:\EBOOKS` folder into the Netlify upload box.
4. Your site is live immediately with free HTTPS and a custom domain option.

### Option B: Vercel
1. Install Vercel CLI via terminal (`npm i -g vercel`) or log in to [Vercel](https://vercel.com).
2. Run `vercel` inside `D:\EBOOKS` and follow the prompts (Framework Preset: "Other").
3. Connect your domain `www.millenniumebooks.com`.

### Option C: Traditional cPanel / Apache / Nginx
1. Compress all files in `D:\EBOOKS` into a `.zip` archive.
2. Log into your hosting cPanel → **File Manager** → navigate to `public_html`.
3. Upload the `.zip` archive and extract all files into `public_html`.
4. Ensure your SSL certificate (Let's Encrypt) is active.

---

## 8. Owner's Launch Checklist

Before your official public launch, make sure to complete these remaining steps:

- [ ] **1. Add Registered US Address:** Replace `[ADD REGISTERED ADDRESS]` in `js/products.js` and in the footer of all HTML files.
- [ ] **2. Stripe Payment Links:** Create live Stripe Payment Links in your Stripe dashboard and paste them into `js/products.js`.
- [ ] **3. Form Endpoint:** Create your form endpoint on Formspree or Web3Forms and paste it into `index.html`, `contact.html`, and `order.html`.
- [ ] **4. Real Ready-Made Books:** Replace the 8 sample titles in `js/products.js` with your real e-books and download links.
- [ ] **5. Real Portfolio Items:** Update `PORTFOLIO_ITEMS` in `js/products.js` with client projects you have permission to display.
- [ ] **6. Lawyer Review:** Have your attorney review the plain-English drafts of `privacy.html`, `terms.html`, and `refund-policy.html`.
