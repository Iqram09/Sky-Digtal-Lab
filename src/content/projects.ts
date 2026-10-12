/**
 * Client work. The studio built all three live websites below.
 *
 * Every factual statement in this file was checked against the live site it
 * describes (pages, features, platform and source markup) when it was written.
 * Nothing here is a business result: no traffic, revenue or conversion figures
 * are claimed, because none have been measured and shared with us. Add an
 * outcome only once the client has confirmed it.
 */

export type ProjectCategory = "websites" | "ecommerce" | "corporate" | "software";

export const projectCategories: { id: ProjectCategory; label: string }[] = [
  { id: "websites", label: "Websites" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "corporate", label: "Corporate" },
  { id: "software", label: "Software & Technology" },
];

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

export type ProjectLogo =
  | {
      kind: "image";
      /** Light artwork — used on dark grounds. */
      light: string;
      /** Dark artwork — used on light grounds. */
      dark: string;
      width: number;
      height: number;
    }
  /** TakeSolution's mark is an SVG plus a typeset wordmark on their own site. */
  | { kind: "take-solution" };

export type Project = {
  slug: string;
  client: string;
  /** One-line description of what was built. */
  headline: string;
  industry: string;
  projectType: string;
  url: string;
  displayUrl: string;
  /** Card copy — two sentences at most. */
  summary: string;
  categories: ProjectCategory[];
  deliverables: string[];
  /** Platform and stack, confirmed from the live site's markup. */
  technologies: string[];
  logo: ProjectLogo;
  /** Each client keeps its own visual language on its case study. */
  theme: {
    /** Brand accent, used for small details only. */
    accent: string;
    /** Brand ground colour for framed panels. */
    surface: string;
    /** Short art-direction label shown on cards. */
    mood: string;
  };
  cover: ProjectImage;
  mobile: ProjectImage;
  /**
   * Secondary image that gives each feature card its own art direction —
   * a render, a campaign photograph or a phone view.
   */
  spotlight: ProjectImage & { frame: "photo" | "phone" };
  overview: string[];
  clientBackground: string;
  requirements: { title: string; detail: string }[];
  structure: { section: string; detail: string }[];
  journeys: { audience: string; path: string[] }[];
  gallery: (ProjectImage & { layout: "wide" | "half" | "tall" })[];
  design: string[];
  implementation: string[];
  responsive: string;
  extraMobile?: ProjectImage;
};

const desktop = { width: 1920, height: 1200 };
const phone = { width: 780, height: 1688 };
const portrait = { width: 1200, height: 1608 };

export const projects: Project[] = [
  {
    slug: "stans-buildtech",
    client: "Stans Buildtech",
    headline: "A corporate website for a Mumbai developer and construction partner.",
    industry: "Real estate & construction",
    projectType: "Corporate website design and development",
    url: "https://stansbuildtech.com/",
    displayUrl: "stansbuildtech.com",
    summary:
      "A corporate website that presents both sides of Stans Buildtech's business — the developments it builds under its own name and the projects it delivers as a construction partner — with a portfolio visitors can filter by role and status.",
    categories: ["websites", "corporate"],
    deliverables: [
      "Website design",
      "Front-end development",
      "Project portfolio & filters",
      "Project detail pages",
      "Responsive build",
    ],
    technologies: ["Next.js", "React", "Next.js image optimisation", "Cloud media storage"],
    logo: {
      kind: "image",
      light: "/work/stans-buildtech/logo-light.png",
      dark: "/work/stans-buildtech/logo-dark.png",
      width: 960,
      height: 260,
    },
    theme: { accent: "#009bdd", surface: "#183353", mood: "Architectural" },
    cover: {
      src: "/work/stans-buildtech/home.webp",
      alt: "Stans Buildtech home page showing the Sky Annex tower render beneath a glass navigation bar",
      ...desktop,
    },
    mobile: {
      src: "/work/stans-buildtech/mobile.webp",
      alt: "Stans Buildtech home page on a phone, with the Sky Annex hero and Explore Projects button",
      ...phone,
    },
    spotlight: {
      src: "/work/stans-buildtech/render-aadhya.webp",
      alt: "Architectural render of the Aadhya residential tower by Stans Buildtech",
      frame: "photo",
      ...portrait,
    },
    overview: [
      "Stans Buildtech has developed and built residential and commercial real estate across Mumbai and the MMR region since 1998. The company works in two ways: as a developer, building projects under its own name, and as a construction partner for other developers, housing societies and institutions.",
      "The website had to make that distinction obvious, give a large body of work a clear structure, and give home buyers the project details they come looking for — without losing the weight of the imagery that sells a building.",
    ],
    clientBackground:
      "Mumbai-based real estate developer and builder, active since 1998, with residential towers, commercial buildings and institutional projects across the MMR.",
    requirements: [
      {
        title: "Two businesses, one brand",
        detail:
          "Separate the company's role as developer from its role as construction partner, with a dedicated section for each and a shared visual identity.",
      },
      {
        title: "A portfolio that can be browsed",
        detail:
          "Present a long list of residential, commercial and institutional projects so visitors can filter by role and by status — ongoing or completed.",
      },
      {
        title: "Project pages buyers can act on",
        detail:
          "Give each project its own page with location, status and MahaRERA registration up front, plus brochure downloads and floor plans.",
      },
      {
        title: "Trust before the enquiry",
        detail:
          "Tell the company's story — history, leadership, testimonials and recognition — for buyers, partners and future employees.",
      },
      {
        title: "Easy to reach",
        detail:
          "Keep contact routes, including WhatsApp, available from every page.",
      },
    ],
    structure: [
      { section: "Home", detail: "Featured developments, both business lines, project collection, testimonials and company timeline." },
      { section: "Development", detail: "Projects Stans Buildtech has conceived and built under its own name." },
      { section: "Construction Partner", detail: "The execution arm for other developers, societies and institutions." },
      { section: "Projects", detail: "The full portfolio, filterable by role and status, with a page per project." },
      { section: "About & Leadership", detail: "Company history and the people behind it." },
      { section: "Awards, News & Careers", detail: "Recognition, updates and open roles." },
      { section: "Contact", detail: "Enquiry routes and office details." },
    ],
    journeys: [
      {
        audience: "Home buyer",
        path: ["Home", "Featured development", "Project page", "Brochure & floor plans", "Enquiry"],
      },
      {
        audience: "Developer or society seeking a builder",
        path: ["Home", "Construction Partner", "Completed projects", "Contact"],
      },
      {
        audience: "Candidate",
        path: ["Home", "About & Leadership", "Careers"],
      },
    ],
    gallery: [
      {
        src: "/work/stans-buildtech/project-detail.webp",
        alt: "Sky Annex project page with a full-bleed tower render, brochure and floor plan actions, and a project facts strip",
        caption: "Project pages lead with the render, then the facts buyers need: location, status and MahaRERA registration.",
        layout: "wide",
        ...desktop,
      },
      {
        src: "/work/stans-buildtech/render-sky-annex.webp",
        alt: "Architectural render of the Sky Annex residential tower",
        caption: "Sky Annex — official project render used on the site.",
        layout: "tall",
        ...portrait,
      },
      {
        src: "/work/stans-buildtech/projects.webp",
        alt: "Our Projects page with development and construction partner filters, plus ongoing and completed status chips",
        caption: "The portfolio filters by role and by status.",
        layout: "half",
        ...desktop,
      },
      {
        src: "/work/stans-buildtech/construction.webp",
        alt: "Construction Partner page headed 'Your vision. Our execution.' over a construction site photograph",
        caption: "Construction Partner speaks to developers, societies and institutions.",
        layout: "half",
        ...desktop,
      },
      {
        src: "/work/stans-buildtech/development.webp",
        alt: "Development page headed 'Building your vision. Delivering with discipline.'",
        caption: "Development presents the projects built under the Stans name.",
        layout: "half",
        ...desktop,
      },
    ],
    design: [
      "Architecture sells itself in pictures, so the design steps back: large renders lead every section, set against the navy and white of the Stans identity, with the blue of the logo reserved for small details.",
      "A glass navigation bar stays legible over any image. Project collections share one card format, so a growing portfolio still reads as a single, orderly body of work.",
    ],
    implementation: [
      "Built with Next.js and React. Project imagery is served from cloud storage and resized through Next.js image optimisation, so high-resolution renders load at the right size for each screen.",
    ],
    responsive:
      "On phones the navigation collapses to a menu button, hero copy sits over the render without covering the building, and project facts stack into a readable column.",
  },
  {
    slug: "proximo",
    client: "Proximo",
    headline: "A Shopify storefront for a menswear shirt brand.",
    industry: "Fashion & menswear",
    projectType: "Brand website and e-commerce storefront",
    url: "https://www.proximoshirts.com/",
    displayUrl: "proximoshirts.com",
    summary:
      "An online store for Proximo's formal shirts and short kurtas, built on Shopify — collections organised by pattern and shade, product pages that show the cloth up close, and a brand story told through how each shirt is made.",
    categories: ["websites", "ecommerce"],
    deliverables: [
      "Storefront design",
      "Shopify theme customisation",
      "Collection & product pages",
      "Brand storytelling sections",
      "Mobile shopping experience",
    ],
    technologies: ["Shopify", "Horizon theme (customised)", "Judge.me reviews"],
    logo: {
      kind: "image",
      light: "/work/proximo/logo-light.png",
      dark: "/work/proximo/logo-dark.png",
      width: 960,
      height: 242,
    },
    theme: { accent: "#e9e4d8", surface: "#0a1f3c", mood: "Fashion retail" },
    cover: {
      src: "/work/proximo/home.webp",
      alt: "Proximo home page with the navy header, centred wordmark and a campaign image of a black short kurta",
      ...desktop,
    },
    mobile: {
      src: "/work/proximo/mobile.webp",
      alt: "Proximo home page on a phone showing the Clean Stripe campaign and a bottom navigation bar",
      ...phone,
    },
    spotlight: {
      src: "/work/proximo/editorial-stripe.webp",
      alt: "Proximo Clean Stripe campaign photograph of a model in a striped shirt",
      frame: "photo",
      width: 1080,
      height: 1500,
    },
    extraMobile: {
      src: "/work/proximo/mobile-product.webp",
      alt: "Royal Blue Stripe Pencil shirt product page on a phone",
      ...phone,
    },
    overview: [
      "Proximo makes men's shirts — formal shirts in stripes, checks, prints, dobby weaves and solids, alongside short kurtas. The brand sells on the strength of its cloth and its cut.",
      "The storefront needed to let people shop the way they think about shirts, show the fabric well enough to buy without touching it, and carry the brand's story of craft without slowing the path to checkout.",
    ],
    clientBackground:
      "Menswear brand specialising in formal shirts and short kurtas, selling direct to customers online.",
    requirements: [
      {
        title: "Shop by pattern and shade",
        detail:
          "Organise the range the way customers choose shirts: stripes, checks, prints, plain and dobby — or simply light and dark shades.",
      },
      {
        title: "Product pages that show the cloth",
        detail:
          "Close-up fabric photography, sizes, colour options and multi-piece offers on one page.",
      },
      {
        title: "A story of making",
        detail:
          "Walk visitors from the cloth to the pattern, the cut, the stitch and the delivery — the craft behind the price.",
      },
      {
        title: "Support after the sale",
        detail:
          "Customer care, returns and exchanges, FAQs and a wishlist, all a tap away.",
      },
      {
        title: "Mobile first",
        detail:
          "Most shopping happens on a phone, so key actions sit in a bottom navigation bar within thumb reach.",
      },
    ],
    structure: [
      { section: "Home", detail: "Campaign imagery, new arrivals and best sellers, and the story of how a Proximo shirt is made." },
      { section: "Collections", detail: "All shirts, Stripes, Checks, Print, Plain, Dobby, Light Shade, Dark Shades and Short Kurtas." },
      { section: "Product pages", detail: "Fabric close-ups, size selection, colour options and multi-piece offers." },
      { section: "Wishlist", detail: "Save shirts for later." },
      { section: "Support", detail: "Customer care, returns & exchanges and frequently asked questions." },
      { section: "About", detail: "The brand behind the shirts." },
    ],
    journeys: [
      {
        audience: "Shopper who knows the style",
        path: ["Home", "Collection — e.g. Stripes", "Product page", "Size & colour", "Cart"],
      },
      {
        audience: "Browsing on a phone",
        path: ["Campaign banner", "Best sellers", "Wishlist", "Checkout"],
      },
      {
        audience: "Returning customer",
        path: ["Support", "Returns & exchanges", "Customer care"],
      },
    ],
    gallery: [
      {
        src: "/work/proximo/collection.webp",
        alt: "Proximo All collection page with a grid of shirts photographed as collar close-ups, showing price and sale state",
        caption: "Collection grids use consistent collar close-ups, so patterns compare at a glance.",
        layout: "wide",
        ...desktop,
      },
      {
        src: "/work/proximo/editorial-stripe.webp",
        alt: "Proximo Clean Stripe campaign image of a model in a striped shirt and grey trousers",
        caption: "Campaign imagery from the Proximo team.",
        layout: "tall",
        width: 1080,
        height: 1500,
      },
      {
        src: "/work/proximo/product-stripe.webp",
        alt: "Royal blue pencil stripe shirt collar with the Proximo label",
        caption: "Product photography shows the weave and the label.",
        layout: "tall",
        width: 1200,
        height: 1600,
      },
      {
        src: "/work/proximo/product.webp",
        alt: "Product page for the Royal Blue Stripe Pencil shirt with size selector, colour swatches and single, double and triple pack options",
        caption: "Product pages bring size, colour and multi-piece offers together.",
        layout: "wide",
        ...desktop,
      },
      {
        src: "/work/proximo/craft-fabric.webp",
        alt: "Black and white photograph of hands turning the pages of a fabric swatch book",
        caption: "'Every shirt starts with the cloth' — the craft story on the home page.",
        layout: "half",
        width: 1080,
        height: 1500,
      },
      {
        src: "/work/proximo/editorial-kurta.webp",
        alt: "Proximo campaign image of a model in a black traditional short kurta against a navy backdrop",
        caption: "Short kurtas sit alongside the shirt range.",
        layout: "half",
        width: 1080,
        height: 1500,
      },
    ],
    design: [
      "Navy and white, taken straight from the Proximo wordmark, with photography doing the heavy lifting. Campaign images set the mood on the home page; on product cards, consistent collar close-ups let the fabric speak.",
      "Type and interface stay quiet so the cloth reads first. The story of making — cloth, blueprint, cut, seam, delivery — gives the brand depth between the shopping sections.",
    ],
    implementation: [
      "Built on Shopify using its Horizon theme, customised for the Proximo brand. Products, collections, inventory and orders are managed from the Shopify admin, so the team can update the store without a developer.",
      "Customer reviews are integrated through Judge.me.",
    ],
    responsive:
      "On phones a fixed bottom bar keeps home, collections, wishlist and search within thumb reach, and product photography takes the full width of the screen.",
  },
  {
    slug: "take-solution",
    client: "Take Solution",
    headline: "A multi-service website for a digital marketing agency.",
    industry: "Digital solutions & technology",
    projectType: "Corporate website design and development",
    url: "https://digital.takesolution.co.in/",
    displayUrl: "digital.takesolution.co.in",
    summary:
      "A website for TakeSolution, a full-service digital marketing agency — ten service pages, eight industry pages and a clear route from first visit to project enquiry.",
    categories: ["websites", "corporate", "software"],
    deliverables: [
      "Website design",
      "Front-end development",
      "10 service pages",
      "8 industry pages",
      "Responsive build",
    ],
    technologies: ["Next.js", "React"],
    logo: { kind: "take-solution" },
    theme: { accent: "#ff5f1f", surface: "#0b0b0f", mood: "Technology" },
    cover: {
      src: "/work/take-solution/home.webp",
      alt: "TakeSolution home page with the headline 'Messages that land. Campaigns that convert.' on a dark grid background",
      ...desktop,
    },
    mobile: {
      src: "/work/take-solution/mobile.webp",
      alt: "TakeSolution home page on a phone with stacked headline and Start a project button",
      ...phone,
    },
    spotlight: {
      src: "/work/take-solution/mobile.webp",
      alt: "TakeSolution home page on a phone",
      frame: "phone",
      ...phone,
    },
    extraMobile: {
      src: "/work/take-solution/mobile-services.webp",
      alt: "TakeSolution Website Design service page on a phone",
      ...phone,
    },
    overview: [
      "TakeSolution is a full-service digital marketing agency. It runs bulk SMS, WhatsApp, RCS business messaging and voice campaigns, and offers Google Ads, social media marketing, graphic design, content writing, website design and CRM development.",
      "That is a broad offer. The website needed to explain ten services and eight industries without becoming a wall of text, and to lead every visitor towards one clear action: start a project.",
    ],
    clientBackground:
      "Full-service digital marketing agency covering messaging channels, advertising, creative, web and CRM.",
    requirements: [
      {
        title: "Ten services, one clear offer",
        detail:
          "Give each service its own page while keeping the overall message simple: every channel, one team.",
      },
      {
        title: "Speak to each industry",
        detail:
          "Show how the services apply to banking, finance, retail, e-commerce, education, healthcare, travel and real estate.",
      },
      {
        title: "A transparent process",
        detail:
          "Explain how engagements run — Discover, Strategy, Execute, Optimise, Scale.",
      },
      {
        title: "Answer questions early",
        detail:
          "Address common questions on the page and keep the route to an enquiry visible throughout.",
      },
      {
        title: "A technical, data-driven brand",
        detail:
          "Look like a team that measures results: a dark interface, mono labels and campaign-dashboard visuals.",
      },
    ],
    structure: [
      { section: "Home", detail: "Positioning, all ten services, featured capabilities, industries, process, FAQs and a closing call to action." },
      { section: "Services", detail: "An overview plus a page for each of the ten services." },
      { section: "Industries", detail: "An overview plus a page for each of the eight industries." },
      { section: "How it works", detail: "The five-stage engagement process." },
      { section: "About & Contact", detail: "The agency and the route to start a project." },
      { section: "Legal", detail: "Terms, privacy, and cancellation & refund policies." },
    ],
    journeys: [
      {
        audience: "Business with a channel in mind",
        path: ["Home", "Services", "e.g. Bulk WhatsApp", "Start a project"],
      },
      {
        audience: "Business starting from its sector",
        path: ["Home", "Industries", "e.g. Retail", "Talk to us about your industry"],
      },
      {
        audience: "Evaluating the agency",
        path: ["How it works", "About", "Contact"],
      },
    ],
    gallery: [
      {
        src: "/work/take-solution/service-detail.webp",
        alt: "Website Design service page headed 'Websites that turn visitors into enquiries' with a device mock-up",
        caption: "Every service page follows the same structure, so visitors know where to look.",
        layout: "wide",
        ...desktop,
      },
      {
        src: "/work/take-solution/services.webp",
        alt: "Services overview page headed 'Ten services, one team.'",
        caption: "The services overview frames ten offers as one team.",
        layout: "half",
        ...desktop,
      },
      {
        src: "/work/take-solution/industries.webp",
        alt: "Industries overview page headed 'Built for the way your industry sells.'",
        caption: "Industry pages meet visitors in their own sector.",
        layout: "half",
        ...desktop,
      },
    ],
    design: [
      "A dark canvas, a fine grid and a single orange accent drawn from the TakeSolution mark. Mono labels and tight, confident headlines give the interface a technical tone that suits an agency built on measurable campaigns.",
      "On the home page, a campaign-dashboard illustration shows audience, campaign, channels and results in one view — the agency's work, visualised rather than described.",
    ],
    implementation: [
      "Built with Next.js and React. Service and industry pages share consistent templates, so every page answers the same questions in the same order.",
    ],
    responsive:
      "On phones the headline stacks, primary actions become full-width buttons, and the navigation collapses into a menu without losing the Start a project call to action.",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getAdjacentProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}
