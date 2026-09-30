/**
 * Millenniumebooks - Master Frontend Scripts
 * Operated by Nova Forge LLC
 * Vanilla JavaScript (No heavy frameworks)
 */

document.addEventListener("DOMContentLoaded", () => {
  initMobileNavigation();
  initActivePageHighlight();
  initServicesPackageCalculator();
  initOrderFormPrefill();
  initReadyMadeStore();
  initFaqAccordion();
  initContactForm();
  initNewsletterForm();
});

/* --------------------------------------------------------------------------
   1. MOBILE NAVIGATION DRAWER
   -------------------------------------------------------------------------- */
function initMobileNavigation() {
  const hamburger = document.querySelector(".hamburger-toggle");
  const drawer = document.querySelector(".mobile-nav-drawer");
  
  if (!hamburger || !drawer) return;

  hamburger.addEventListener("click", () => {
    const isOpen = drawer.classList.contains("open");
    if (isOpen) {
      drawer.classList.remove("open");
      hamburger.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
    } else {
      drawer.classList.add("open");
      hamburger.classList.add("active");
      hamburger.setAttribute("aria-expanded", "true");
    }
  });

  // Close when clicking on any link inside the mobile drawer
  drawer.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      drawer.classList.remove("open");
      hamburger.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });

  // Close when pressing Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("open")) {
      drawer.classList.remove("open");
      hamburger.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
    }
  });
}

/* --------------------------------------------------------------------------
   2. ACTIVE NAV LINK HIGHLIGHT
   -------------------------------------------------------------------------- */
function initActivePageHighlight() {
  const currentPath = window.location.pathname.toLowerCase();
  const filename = currentPath.substring(currentPath.lastIndexOf("/") + 1) || "index.html";

  const allNavLinks = document.querySelectorAll(".nav-links-list li, .mobile-nav-list li");
  allNavLinks.forEach(item => {
    const link = item.querySelector("a");
    if (!link) return;
    const href = link.getAttribute("href").toLowerCase();
    
    // Exact filename match or index root match
    if (href === filename || (filename === "" && href === "index.html") || (filename === "/" && href === "index.html")) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

/* --------------------------------------------------------------------------
   3. SERVICES PAGE PACKAGE CALCULATOR (services.html)
   -------------------------------------------------------------------------- */
function initServicesPackageCalculator() {
  const packageCards = document.querySelectorAll(".package-card[data-package-id]");
  if (!packageCards.length) return;

  packageCards.forEach(card => {
    const pkgId = card.getAttribute("data-package-id");
    const radios = card.querySelectorAll("input[type='radio'][name='delivery-" + pkgId + "']");
    const priceDisplay = card.querySelector(".price-num");
    const selectBtn = card.querySelector(".package-select-btn");
    
    if (!radios.length || !priceDisplay || !selectBtn) return;

    const basePrice = parseInt(card.getAttribute("data-base-price"), 10) || 500;
    const fastUpsell = parseInt(card.getAttribute("data-fast-upsell"), 10) || 150;
    const isPlus = card.getAttribute("data-has-plus") === "true";

    function updateCardPrice() {
      let selectedSpeed = "standard";
      radios.forEach(r => {
        if (r.checked) selectedSpeed = r.value;
      });

      const finalPrice = selectedSpeed === "fast" ? (basePrice + fastUpsell) : basePrice;
      const displayStr = isPlus ? `$${finalPrice}+` : `$${finalPrice}`;
      
      priceDisplay.textContent = displayStr;
      selectBtn.textContent = `Select ${displayStr}`;
      selectBtn.setAttribute("href", `order.html?package=${pkgId}&speed=${selectedSpeed}`);
    }

    radios.forEach(r => {
      r.addEventListener("change", updateCardPrice);
    });

    // Initial run
    updateCardPrice();
  });
}

/* --------------------------------------------------------------------------
   4. ORDER FORM PREFILL & LIVE SUMMARY (order.html)
   -------------------------------------------------------------------------- */
function initOrderFormPrefill() {
  const orderForm = document.getElementById("order-project-form");
  if (!orderForm) return;

  const urlParams = new URLSearchParams(window.location.search);
  const pkgParam = urlParams.get("package");
  const speedParam = urlParams.get("speed");

  const pkgSelect = document.getElementById("order-package-select");
  const speedRadios = document.querySelectorAll("input[name='delivery_speed']");
  const summaryBox = document.getElementById("order-summary-box");
  const stripeLinkBtn = document.getElementById("direct-stripe-link-btn");

  if (pkgSelect && pkgParam) {
    const validPackages = ["starter", "professional", "premium"];
    if (validPackages.includes(pkgParam.toLowerCase())) {
      pkgSelect.value = pkgParam.toLowerCase();
    }
  }

  if (speedRadios.length && speedParam === "fast") {
    speedRadios.forEach(r => {
      if (r.value === "fast") r.checked = true;
    });
  }

  function updateOrderSummary() {
    if (!pkgSelect || !summaryBox || typeof CUSTOM_PACKAGES === "undefined") return;
    const chosenPkgKey = pkgSelect.value;
    const pkg = CUSTOM_PACKAGES[chosenPkgKey];
    if (!pkg) return;

    let isFast = false;
    speedRadios.forEach(r => {
      if (r.checked && r.value === "fast") isFast = true;
    });

    const calculatedPrice = isFast ? (pkg.basePrice + pkg.fastUpsell) : pkg.basePrice;
    const days = isFast ? pkg.fastDays : pkg.stdDays;
    const priceText = pkg.id === "premium" ? `$${calculatedPrice}+` : `$${calculatedPrice}`;

    summaryBox.innerHTML = `
      <div style="background: #faf8f5; border: 1px solid #e5e0d8; border-radius: 6px; padding: 18px; margin-bottom: 20px;">
        <h4 style="margin-bottom: 6px; font-size: 1.15rem; color: #2f2f2f;">Package: <strong>${pkg.name}</strong></h4>
        <p style="margin-bottom: 8px; font-size: 0.9rem; color: #555;">Estimated Investment: <strong style="color: #2f2f2f; font-size: 1.1rem;">${priceText}</strong> (${isFast ? "Fast Delivery" : "Standard Delivery"})</p>
        <p style="margin-bottom: 0; font-size: 0.85rem; color: #777;">Turnaround: <strong>~${days} business days</strong> | Word Count: <strong>${pkg.wordCount}</strong></p>
      </div>
    `;

    if (stripeLinkBtn) {
      const stripeUrl = isFast ? pkg.stripeLinkFast : pkg.stripeLinkStd;
      stripeLinkBtn.setAttribute("href", stripeUrl);
      stripeLinkBtn.textContent = `Pay ${priceText} via Stripe (Instant Slot Reservation)`;
    }
  }

  if (pkgSelect) {
    pkgSelect.addEventListener("change", updateOrderSummary);
  }
  speedRadios.forEach(r => r.addEventListener("change", updateOrderSummary));

  // Initial calculation
  updateOrderSummary();

  // Form submission handler with graceful fallback to thank-you.html
  orderForm.addEventListener("submit", function(e) {
    const agreed = document.getElementById("order-terms-check");
    if (agreed && !agreed.checked) {
      e.preventDefault();
      alert("Please agree to the Terms of Service and Refund Policy to proceed.");
      return;
    }

    const currentAction = orderForm.getAttribute("action");
    if (!currentAction || currentAction.includes("your-form-id")) {
      // Endpoint is still a placeholder; proceed to thank-you page smoothly
      e.preventDefault();
      window.location.href = "thank-you.html";
    }
  });
}

/* --------------------------------------------------------------------------
   5. READY-MADE STORE (ready-made.html & index.html featured grid)
   -------------------------------------------------------------------------- */
function initReadyMadeStore() {
  const storeContainer = document.getElementById("ready-made-grid-container");
  const filterButtons = document.querySelectorAll(".filter-tab-btn");
  const modalBackdrop = document.getElementById("product-detail-modal");

  if (!storeContainer || typeof READY_MADE_PRODUCTS === "undefined") return;

  function renderProducts(categoryFilter = "all") {
    storeContainer.innerHTML = "";
    const filtered = categoryFilter === "all" 
      ? READY_MADE_PRODUCTS 
      : READY_MADE_PRODUCTS.filter(p => p.categorySlug === categoryFilter);

    if (filtered.length === 0) {
      storeContainer.innerHTML = `<div class="col-12 text-center py-5"><p>No e-books currently in this category.</p></div>`;
      return;
    }

    filtered.forEach(book => {
      const col = document.createElement("div");
      col.className = "col-lg-3 col-md-6 mb-4";
      col.innerHTML = `
        <div class="book-card" data-book-id="${book.id}">
          <div class="book-card-cover">
            <img src="${book.cover}" alt="${book.title} cover" loading="lazy">
            <span class="book-format-tag">${book.format}</span>
          </div>
          <div class="book-card-body">
            <span class="book-category-pill">${book.category}</span>
            <h3 class="book-card-title">${book.title}</h3>
            <p class="book-card-desc">${book.shortDesc}</p>
            <div class="book-card-footer">
              <span class="book-price">$${book.price}</span>
              <div style="display: flex; gap: 6px;">
                <button type="button" class="btn-outline-gold btn-sm-custom view-details-btn" data-book-id="${book.id}">Details</button>
                <a href="${book.stripeLink}" class="btn-gold btn-sm-custom" target="_blank" rel="noopener noreferrer">Buy Now</a>
              </div>
            </div>
          </div>
        </div>
      `;
      storeContainer.appendChild(col);
    });

    // Attach modal trigger listeners
    attachModalTriggers();
  }

  // Filter click handlers
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const category = btn.getAttribute("data-category") || "all";
      renderProducts(category);
    });
  });

  // Modal setup
  function attachModalTriggers() {
    const detailBtns = storeContainer.querySelectorAll(".view-details-btn");
    detailBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const bookId = btn.getAttribute("data-book-id");
        openProductModal(bookId);
      });
    });
  }

  function openProductModal(bookId) {
    if (!modalBackdrop) return;
    const book = READY_MADE_PRODUCTS.find(b => b.id === bookId);
    if (!book) return;

    const modalBody = document.getElementById("product-modal-dynamic-content");
    if (!modalBody) return;

    const tocList = book.toc.map(ch => `<li style="padding: 4px 0; font-size: 0.9rem; color: #444;">${ch}</li>`).join("");
    const whatList = book.whatYouGet.map(w => `<li style="padding: 4px 0; font-size: 0.9rem; color: #444;">✔ ${w}</li>`).join("");

    modalBody.innerHTML = `
      <div class="row g-4 align-items-center">
        <div class="col-md-5 text-center">
          <img src="${book.cover}" alt="${book.title}" style="max-height: 380px; margin: 0 auto; border-radius: 6px; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">
          <div style="margin-top: 14px; font-size: 0.85rem; color: #777;">Format: <strong>${book.format}</strong> | <strong>${book.pageCount}</strong></div>
        </div>
        <div class="col-md-7">
          <span style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; color: #c4a484; letter-spacing: 0.1em;">${book.category}</span>
          <h2 style="font-size: 1.8rem; margin: 8px 0 4px 0;">${book.title}</h2>
          <p style="font-size: 0.95rem; color: #666; font-style: italic; margin-bottom: 14px;">${book.subtitle}</p>
          <div style="font-family: var(--font-serif); font-size: 2rem; font-weight: 700; color: #2f2f2f; margin-bottom: 14px;">$${book.price} <span style="font-size: 0.85rem; font-family: var(--font-sans); color: #777; font-weight: normal;">(One-time purchase)</span></div>
          <p style="font-size: 0.92rem; color: #555; line-height: 1.6; margin-bottom: 16px;">${book.fullDesc}</p>
          
          <h5 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 8px;">Table of Contents:</h5>
          <ul style="list-style: none; padding-left: 0; margin-bottom: 18px; max-height: 140px; overflow-y: auto;">
            ${tocList}
          </ul>

          <h5 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 8px;">What You Receive:</h5>
          <ul style="list-style: none; padding-left: 0; margin-bottom: 24px;">
            ${whatList}
          </ul>

          <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
            <a href="${book.stripeLink}" class="btn-gold" target="_blank" rel="noopener noreferrer">
              Buy Now for $${book.price} via Stripe
            </a>
            <span style="font-size: 0.8rem; color: #888;">Instant download link after payment</span>
          </div>
        </div>
      </div>
    `;

    modalBackdrop.classList.add("open");
  }

  // Close modal logic
  if (modalBackdrop) {
    const closeBtn = modalBackdrop.querySelector(".product-modal-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => modalBackdrop.classList.remove("open"));
    }
    modalBackdrop.addEventListener("click", (e) => {
      if (e.target === modalBackdrop) modalBackdrop.classList.remove("open");
    });
  }

  // Initial render
  renderProducts("all");
}

/* --------------------------------------------------------------------------
   6. FAQ ACCORDION (how-it-works.html)
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const questionBtn = item.querySelector(".faq-question");
    if (!questionBtn) return;

    questionBtn.addEventListener("click", () => {
      const isCurrentlyActive = item.classList.contains("active");

      // Optional: close other open items for accordion feel
      faqItems.forEach(other => other.classList.remove("active"));

      if (!isCurrentlyActive) {
        item.classList.add("active");
      }
    });
  });
}

/* --------------------------------------------------------------------------
   7. CONTACT FORM VALIDATION & REDIRECT (contact.html)
   -------------------------------------------------------------------------- */
function initContactForm() {
  const contactForm = document.getElementById("contact-us-form");
  if (!contactForm) return;

  contactForm.addEventListener("submit", (e) => {
    const action = contactForm.getAttribute("action");
    if (!action || action.includes("your-form-id")) {
      // Placeholder form action fallback to thank you page
      e.preventDefault();
      window.location.href = "thank-you.html";
    }
  });
}

/* --------------------------------------------------------------------------
   8. NEWSLETTER SIGNUP (index.html)
   -------------------------------------------------------------------------- */
function initNewsletterForm() {
  const newsletterForm = document.getElementById("home-newsletter-form");
  if (!newsletterForm) return;

  newsletterForm.addEventListener("submit", (e) => {
    const action = newsletterForm.getAttribute("action");
    if (!action || action.includes("your-form-id")) {
      e.preventDefault();
      alert("Thank you for subscribing to Millenniumebooks updates! You will receive our latest releases by email.");
      newsletterForm.reset();
    }
  });
}
