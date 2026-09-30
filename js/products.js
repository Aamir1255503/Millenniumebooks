/**
 * Millenniumebooks - Product & Package Configuration
 * Operated by Nova Forge LLC
 * Website: www.millenniumebooks.com
 * Contact: info@millenniumebooks.com
 *
 * NOTE FOR SITE OWNER:
 * You can edit any package price, description, delivery speed, or book details directly in this file.
 * Replace the placeholder Stripe Payment Links (https://buy.stripe.com/...) with your real live Stripe links.
 */

const SITE_CONFIG = {
  legalEntity: "Nova Forge LLC",
  brandName: "Millenniumebooks",
  domain: "www.millenniumebooks.com",
  email: "info@millenniumebooks.com",
  // REPLACE WITH YOUR ACTUAL US REGISTERED ADDRESS
  registeredAddress: "[ADD REGISTERED ADDRESS]",
  // REPLACE WITH YOUR FORMSPREE OR WEB3FORMS ENDPOINT
  contactFormEndpoint: "https://formspree.io/f/your-form-id",
  orderFormEndpoint: "https://formspree.io/f/your-form-id",
  newsletterEndpoint: "https://formspree.io/f/your-form-id"
};

// -------------------------------------------------------------
// 1. CUSTOM E-BOOK PACKAGES (services.html & order.html)
// -------------------------------------------------------------
const CUSTOM_PACKAGES = {
  starter: {
    id: "starter",
    name: "Starter",
    tagline: "Focused authority guides and tactical lead assets",
    basePrice: 500,
    priceDisplay: "$500",
    wordCount: "Up to 8,000 words",
    coverDesign: "1 Custom Cover Design",
    revisions: "2 Revisions Included",
    deliveryFormats: "Digital PDF Master",
    interiorLayout: "Clean Standard Formatting",
    marketingBlurb: false,
    printReadyFile: false,
    stdDays: 7,
    fastDays: 4,
    fastUpsell: 150,
    // REPLACE WITH YOUR STRIPE PAYMENT LINKS:
    stripeLinkStd: "https://buy.stripe.com/test_starter_std",
    stripeLinkFast: "https://buy.stripe.com/test_starter_fast",
    features: [
      "Up to 8,000 words of 100% original writing",
      "1 bespoke digital cover design",
      "2 comprehensive revision rounds",
      "Digital PDF master delivery",
      "Standard interior typography & layout",
      "Full commercial rights & copyright transfer"
    ],
    idealFor: "Short lead magnets, executive manifestos, and tactical client guides."
  },
  professional: {
    id: "professional",
    name: "Professional",
    isPopular: true,
    tagline: "Comprehensive book-length manuscripts for leaders and founders",
    basePrice: 900,
    priceDisplay: "$900",
    wordCount: "Up to 20,000 words",
    coverDesign: "Custom Front Cover + Spine Concept",
    revisions: "4 Revisions Included",
    deliveryFormats: "Digital PDF + EPUB Files",
    interiorLayout: "Custom Interior Layout & Formatting",
    marketingBlurb: true,
    printReadyFile: false,
    stdDays: 12,
    fastDays: 7,
    fastUpsell: 250,
    // REPLACE WITH YOUR STRIPE PAYMENT LINKS:
    stripeLinkStd: "https://buy.stripe.com/test_prof_std",
    stripeLinkFast: "https://buy.stripe.com/test_prof_fast",
    features: [
      "Up to 20,000 words of in-depth original content",
      "Custom cover design (front + spine concept)",
      "4 rounds of detailed revision & refinement",
      "Dual delivery: PDF + EPUB formats",
      "Professional interior formatting & styling",
      "Chapter outline & thematic structure review",
      "Full commercial copyright transfer to client"
    ],
    idealFor: "Consultants, keynote speakers, coaches, and founders wanting a full-length book."
  },
  premium: {
    id: "premium",
    name: "Premium",
    tagline: "Flagship masterwork with full packaging and print-ready master files",
    basePrice: 1500,
    priceDisplay: "$1500+",
    wordCount: "Up to 40,000 words",
    coverDesign: "Premium Front & Back Cover Design",
    revisions: "Unlimited Revisions",
    deliveryFormats: "PDF + EPUB + Print-Ready File",
    interiorLayout: "Bespoke Interior Layout & Formatting",
    marketingBlurb: true,
    printReadyFile: true,
    stdDays: 20,
    fastDays: 12,
    fastUpsell: 400,
    // REPLACE WITH YOUR STRIPE PAYMENT LINKS:
    stripeLinkStd: "https://buy.stripe.com/test_prem_std",
    stripeLinkFast: "https://buy.stripe.com/test_prem_fast",
    features: [
      "Up to 40,000 words of comprehensive thought leadership",
      "Full front & back wrap cover design",
      "Unlimited revisions within review window",
      "PDF + EPUB + Print-Ready master files",
      "Bespoke interior design with custom callouts",
      "Sales blurb, back-cover copy & author bio",
      "Optional print copies via US print-on-demand partners",
      "Full commercial ownership & copyright assignment"
    ],
    idealFor: "Flagship business books, definitive industry manuals, and published authors."
  }
};

// -------------------------------------------------------------
// 2. OPTIONAL ADD-ONS (services.html & order.html)
// -------------------------------------------------------------
const SERVICE_ADDONS = [
  {
    id: "print-ready",
    name: "Print-Ready File Preparation",
    price: 150,
    priceDisplay: "+$150",
    description: "Formatted to US print-on-demand specifications (IngramSpark / KDP) with exact bleed, margins, and spine calculations."
  },
  {
    id: "rush-outline",
    name: "48-Hour Outline Sprint",
    price: 200,
    priceDisplay: "+$200",
    description: "Receive a comprehensive chapter-by-chapter outline and core thesis draft within 48 hours of project kick-off."
  },
  {
    id: "extra-revisions",
    name: "Extra Manuscript Revision Pass",
    price: 100,
    priceDisplay: "+$100",
    description: "An additional full-length editorial revision and refinement pass after the included revision rounds."
  },
  {
    id: "print-fulfillment",
    name: "Print Copies Coordination",
    price: null,
    priceDisplay: "On Request",
    description: "Print copies are produced through US print-on-demand partners only if you request them. We manage file verification and proofing."
  }
];

// -------------------------------------------------------------
// 3. READY-MADE ORIGINAL E-BOOKS (ready-made.html & index.html)
// NOTE FOR OWNER: Replace these sample products with your real ready-made e-books.
// Keep prices within $100–$300. Instant digital delivery (PDF + EPUB).
// -------------------------------------------------------------
const READY_MADE_PRODUCTS = [
  {
    id: "sovereign-executive",
    title: "The Sovereign Executive",
    subtitle: "Modern Frameworks for Radical Autonomy & High-Leverage Leadership",
    category: "Business",
    categorySlug: "business",
    price: 180,
    format: "PDF + EPUB",
    pageCount: "214 pages",
    cover: "assets/covers/cover-sovereign-executive.svg",
    // REPLACE WITH YOUR STRIPE PAYMENT LINK:
    stripeLink: "https://buy.stripe.com/test_rm_sovereign_exec",
    shortDesc: "A masterclass in operational independence, delegation systems, and high-stakes executive leadership for modern founders.",
    fullDesc: "The Sovereign Executive breaks down the operating systems of the world's most effective leaders. Learn how to decouple your calendar from daily operational fires, build high-autonomy teams, and make irreversible strategic decisions with clarity. Includes real-world checklists and delegation templates.",
    toc: [
      "Chapter 1: The Trap of Operational Centralization",
      "Chapter 2: Architecting Asynchronous Decision Trees",
      "Chapter 3: The 80/20 Leverage Audit for Executives",
      "Chapter 4: Building Autonomous Team Scorecards",
      "Chapter 5: Managing Energy, Focus, and Cognitive Cadence",
      "Chapter 6: The Long-Horizon Leadership Playbook"
    ],
    whatYouGet: [
      "Complete 214-page master book in PDF format",
      "EPUB version optimized for Kindle, Apple Books & e-readers",
      "Executive decision-making matrix (printable worksheet)",
      "Instant digital download immediately upon Stripe checkout"
    ]
  },
  {
    id: "deep-focus-protocol",
    title: "Deep Focus Protocol",
    subtitle: "Eliminating Cognitive Friction & Distraction in the Digital Era",
    category: "Self-Help",
    categorySlug: "self-help",
    price: 120,
    format: "PDF + EPUB",
    pageCount: "168 pages",
    cover: "assets/covers/cover-deep-focus.svg",
    stripeLink: "https://buy.stripe.com/test_rm_deep_focus",
    shortDesc: "Neuroscience-grounded routines to eliminate digital fatigue, protect unbroken creative blocks, and double cognitive output.",
    fullDesc: "Modern knowledge work is poisoned by ambient noise, notification pings, and fragmented attention. Deep Focus Protocol provides an actionable, 21-day behavioral system designed to rebuild sustained concentration and achieve flow state on demand.",
    toc: [
      "Chapter 1: The Economics of Fractured Attention",
      "Chapter 2: Environmental Architecture: Structuring Your Deep Cave",
      "Chapter 3: The 90-Minute Cognitive Ultradian Cycle",
      "Chapter 4: Digital Fasting & Dopamine Recalibration",
      "Chapter 5: Rituals of High-Output Creative Sessions",
      "Chapter 6: Sustaining Concentration Over Decades"
    ],
    whatYouGet: [
      "168-page comprehensive guide in PDF format",
      "EPUB version formatted for all tablets and phones",
      "21-Day Focus Protocol Habit Tracker (PDF)",
      "Instant download link delivered right after payment"
    ]
  },
  {
    id: "unlocking-growth",
    title: "Unlocking Growth",
    subtitle: "The Bootstrapped Scalability Playbook for High-Margin Digital Expansion",
    category: "Business",
    categorySlug: "business",
    price: 220,
    format: "PDF + EPUB",
    pageCount: "250 pages",
    cover: "assets/covers/cover-unlocking-growth.svg",
    stripeLink: "https://buy.stripe.com/test_rm_unlocking_growth",
    shortDesc: "Strategic playbooks for taking a profitable digital business from five figures to multi-seven figures without external venture capital.",
    fullDesc: "Unlocking Growth removes the guesswork from scaling. Written with mathematical precision, this guide covers customer acquisition cost optimization, unit economics, pricing psychology, and high-retention onboarding architectures.",
    toc: [
      "Chapter 1: The Fundamentals of High-Margin Scalability",
      "Chapter 2: Pricing Psychology: Doubling Revenue Per Account",
      "Chapter 3: Organic Acquisition Channels That Compound",
      "Chapter 4: Automated Nurture Funnels & Conversion Engineering",
      "Chapter 5: Retention Architecture: Slashing Churn to Zero",
      "Chapter 6: Capital Reinvestment & Self-Funded Expansion"
    ],
    whatYouGet: [
      "250-page tactical manual (PDF & EPUB)",
      "Financial projection and unit-economics spreadsheet template",
      "High-converting email sequence breakdown",
      "Instant secure delivery link via Stripe confirmation"
    ]
  },
  {
    id: "the-resilient-mind",
    title: "The Resilient Mind",
    subtitle: "Mental Toughness & Stoic Crisis Navigation for Uncertain Times",
    category: "Self-Help",
    categorySlug: "self-help",
    price: 140,
    format: "PDF + EPUB",
    pageCount: "186 pages",
    cover: "assets/covers/cover-resilient-mind.svg",
    stripeLink: "https://buy.stripe.com/test_rm_resilient_mind",
    shortDesc: "Practical psychological frameworks to maintain mental clarity, emotional poise, and decisive strength under severe pressure.",
    fullDesc: "Drawing from timeless classical stoicism and contemporary cognitive behavioral psychology, The Resilient Mind trains your mental baseline to withstand volatility, market crashes, personal setback, and unforeseen obstacles without losing composure.",
    toc: [
      "Chapter 1: The Dichotomy of Control in High-Pressure Arenas",
      "Chapter 2: Cognitive De-catastrophizing Under Fire",
      "Chapter 3: Emotional Grounding: Taming Acute Cortisol Spikes",
      "Chapter 4: Reframing Adversity as Strategic Fuel",
      "Chapter 5: The Daily Stoic Evening Inventory",
      "Chapter 6: Building Antifragility into Your Lifestyle"
    ],
    whatYouGet: [
      "186-page authoritative book (PDF and EPUB)",
      "Daily Crisis De-escalation Cheat Sheet",
      "Audio-readiness checklist & reflection prompts",
      "Immediate digital access following secure checkout"
    ]
  },
  {
    id: "nextgen-ai-systems",
    title: "Next-Gen AI Systems",
    subtitle: "Practical Automation & Agentic Workflows for Modern Organizations",
    category: "Technology",
    categorySlug: "technology",
    price: 280,
    format: "PDF + EPUB",
    pageCount: "278 pages",
    cover: "assets/covers/cover-nextgen-ai.svg",
    stripeLink: "https://buy.stripe.com/test_rm_nextgen_ai",
    shortDesc: "A non-technical implementation guide to deploying AI agents, automated workflows, and high-efficiency operational pipelines.",
    fullDesc: "Cut through the artificial intelligence hype. Next-Gen AI Systems provides executive-level frameworks for integrating language models, autonomous workflow triggers, and data pipelines into your existing small-to-midsize business operations without hiring massive engineering teams.",
    toc: [
      "Chapter 1: Beyond Chatbots: Understanding Agentic Automation",
      "Chapter 2: Identifying High-ROI Business Workflows for AI",
      "Chapter 3: Low-Code Pipeline Architecture & Security Safeguards",
      "Chapter 4: Automating Customer Inquiries & Knowledge Retrieval",
      "Chapter 5: AI-Assisted Document & Content Production Systems",
      "Chapter 6: Governance, Data Privacy & Long-Term Roadmap"
    ],
    whatYouGet: [
      "278-page in-depth technical & executive blueprint (PDF + EPUB)",
      "12 Plug-and-play workflow logic diagrams",
      "Vendor evaluation scoring sheet for enterprise AI tools",
      "Direct digital download link right after Stripe payment"
    ]
  },
  {
    id: "wealth-architecture",
    title: "Wealth Architecture",
    subtitle: "Strategic Asset Compounding & Long-Term Freedom for Modern Creators",
    category: "Finance",
    categorySlug: "finance",
    price: 250,
    format: "PDF + EPUB",
    pageCount: "230 pages",
    cover: "assets/covers/cover-wealth-architecture.svg",
    stripeLink: "https://buy.stripe.com/test_rm_wealth_arch",
    shortDesc: "A systematic approach to wealth accumulation, corporate structures, tax-efficient compounding, and multi-generational security.",
    fullDesc: "Making money and preserving it require completely different skill sets. Wealth Architecture is designed specifically for business owners, high-earners, and digital entrepreneurs looking to safeguard liquidity, build defensible assets, and achieve generational sovereignty.",
    toc: [
      "Chapter 1: The Three Pillars of Wealth Preservation",
      "Chapter 2: Asset Allocation Beyond Conventional 60/40 Models",
      "Chapter 3: Protecting Capital Against Currency Depreciation",
      "Chapter 4: Tax-Efficient Structures & Legal Entity Basics",
      "Chapter 5: Real Estate & Yield-Generating Alternative Assets",
      "Chapter 6: Constructing Your Sovereign Family Balance Sheet"
    ],
    whatYouGet: [
      "230-page financial architecture manual (PDF + EPUB)",
      "Net-worth & asset allocation personal calculator template",
      "Due diligence checklist for private investments",
      "Instant email delivery with download link upon checkout"
    ]
  },
  {
    id: "the-sleep-catalyst",
    title: "The Sleep Catalyst",
    subtitle: "Science-Backed Chronobiology & Recovery Protocols for Peak Energy",
    category: "Health",
    categorySlug: "health",
    price: 110,
    format: "PDF + EPUB",
    pageCount: "152 pages",
    cover: "assets/covers/cover-sleep-catalyst.svg",
    stripeLink: "https://buy.stripe.com/test_rm_sleep_catalyst",
    shortDesc: "Optimize your circadian rhythm, restore deep restorative sleep, and awaken with relentless morning clarity without chemical aids.",
    fullDesc: "Chronic fatigue is the greatest bottleneck to personal performance. The Sleep Catalyst translates cutting-edge sleep biology and temperature regulation into simple, practical nighttime routines that increase REM and deep sleep stages within 7 days.",
    toc: [
      "Chapter 1: The Chronobiological Baseline of Human Energy",
      "Chapter 2: Light Exposure Protocols: Dawn to Dusk Alignment",
      "Chapter 3: Thermal Regulation & Bedroom Optimization",
      "Chapter 4: Nutrition & Supplementation Timing for Sleep",
      "Chapter 5: Cognitive Downshifting: Shutting Off Racing Thoughts",
      "Chapter 6: Jet Lag & Shift Work Recovery Strategies"
    ],
    whatYouGet: [
      "152-page actionable health guide (PDF + EPUB)",
      "Evening wind-down checklist and bedroom audit",
      "Circadian light alignment reference chart",
      "Instant digital access upon Stripe payment completion"
    ]
  },
  {
    id: "brand-from-zero",
    title: "Brand From Zero",
    subtitle: "Constructing Irresistible Market Positioning in Saturated Spaces",
    category: "Business",
    categorySlug: "business",
    price: 190,
    format: "PDF + EPUB",
    pageCount: "205 pages",
    cover: "assets/covers/cover-brand-zero.svg",
    stripeLink: "https://buy.stripe.com/test_rm_brand_zero",
    shortDesc: "How to craft a distinctive brand voice, command premium pricing, and dominate attention in crowded professional markets.",
    fullDesc: "Commoditization is the death of profit. Brand From Zero reveals the exact psychological levers that transform a generic service or product into a coveted premium brand that customers will gladly wait in line to pay premium rates for.",
    toc: [
      "Chapter 1: The Anatomy of Market Commoditization",
      "Chapter 2: Identifying Your Unique Category of One",
      "Chapter 3: The Narrative Hook: Storytelling That Sells",
      "Chapter 4: Premium Visual Aesthetics and Perceived Value",
      "Chapter 5: Crafting an Unassailable Brand Manifesto",
      "Chapter 6: Long-Term Brand Equity and Cultural Resonance"
    ],
    whatYouGet: [
      "205-page premium branding guide (PDF + EPUB)",
      "Brand Positioning Canvas & Message Framework (PDF)",
      "Premium pricing script and objection handling guide",
      "Immediate digital download access after payment"
    ]
  }
];

// -------------------------------------------------------------
// 4. PORTFOLIO ITEMS (portfolio.html & index.html preview)
// NOTE FOR OWNER: Replace with your real past client projects.
// Only display work you have explicit permission to showcase.
// -------------------------------------------------------------
const PORTFOLIO_ITEMS = [
  {
    id: "conscious-chief",
    title: "The Conscious Chief",
    clientType: "Executive Leadership Coach",
    genre: "Leadership & Management",
    wordCount: "24,000 words",
    formats: "PDF + EPUB + Print-Ready File",
    cover: "assets/covers/portfolio-modern-leader.svg",
    description: "Ghostwritten for a top corporate executive coach to serve as their signature framework for onboarding Fortune 500 C-suite clients and speaking engagements.",
    scope: "Full-manuscript ghostwriting, custom cover design, interior layout, and print-ready file preparation."
  },
  {
    id: "clarity-code",
    title: "The Clarity Code",
    clientType: "Strategic Advisory Partner",
    genre: "Strategy & Operations",
    wordCount: "18,500 words",
    formats: "PDF + EPUB",
    cover: "assets/covers/portfolio-clarity-code.svg",
    description: "Authored for a management consultant specializing in crisis resolution. The e-book became their primary organic acquisition vehicle for high-ticket advisory retainers.",
    scope: "Ghostwriting, editorial restructuring of client case studies, custom digital cover, and PDF/EPUB formatting."
  },
  {
    id: "zero-to-seven",
    title: "Zero To Seven Figures",
    clientType: "B2B SaaS Founder",
    genre: "Software & Entrepreneurship",
    wordCount: "32,000 words",
    formats: "PDF + EPUB + Print Copies",
    cover: "assets/covers/portfolio-saas-blueprint.svg",
    description: "A comprehensive playbook detailing boot-strapped product scaling. We handled ghostwriting, diagram design, and coordinated print copies for industry conference attendees.",
    scope: "Ghostwriting, editorial coaching, bespoke cover, and US print-on-demand partner coordination."
  },
  {
    id: "vital-decade",
    title: "The Vital Decade",
    clientType: "Integrative Health Practitioner",
    genre: "Longevity & Wellness",
    wordCount: "21,000 words",
    formats: "PDF + EPUB",
    cover: "assets/covers/portfolio-longevity-protocols.svg",
    description: "Written for a functional medicine physician to translate complex metabolic research into engaging, actionable health protocols for their private patients.",
    scope: "Medical research synthesis, ghostwriting, clear patient worksheets, and dual-format digital publication."
  },
  {
    id: "passive-equity",
    title: "Passive Equity Playbook",
    clientType: "Commercial Real Estate Syndicate",
    genre: "Real Estate & Investing",
    wordCount: "16,000 words",
    formats: "PDF + EPUB",
    cover: "assets/covers/portfolio-real-estate-wealth.svg",
    description: "Crafted for an investment fund manager looking to educate accredited private investors on syndication mechanics, tax advantages, and passive cash-flow returns.",
    scope: "Ghostwriting, financial chart styling, cover design, and lead-magnet landing page integration."
  },
  {
    id: "venture-horizon",
    title: "Venture Horizon",
    clientType: "Angel Syndicate Lead & Speaker",
    genre: "Venture Capital & Startups",
    wordCount: "28,000 words",
    formats: "PDF + EPUB + Print-Ready File",
    cover: "assets/covers/portfolio-venture-playbook.svg",
    description: "An insider guide to early-stage seed investing, deal sourcing, and founder board governance, designed to establish the client as a premier startup syndicate lead.",
    scope: "Ghostwriting from interview recordings, cover design, full interior layout, and print-ready preparation."
  }
];

// Export for browser usage
if (typeof window !== "undefined") {
  window.SITE_CONFIG = SITE_CONFIG;
  window.CUSTOM_PACKAGES = CUSTOM_PACKAGES;
  window.SERVICE_ADDONS = SERVICE_ADDONS;
  window.READY_MADE_PRODUCTS = READY_MADE_PRODUCTS;
  window.PORTFOLIO_ITEMS = PORTFOLIO_ITEMS;
}
