// Every fact on the site comes from the resume (public/zavion_resume_latest.pdf).
// Keep the two in sync: edit the resume first, then this file.

export const profile = {
  name: "Zavion Sherman",
  first: "Zavion",
  last: "Sherman",
  role: "Full-Stack Engineer",
  location: "Phoenix, AZ",
  email: "shermanzavion@gmail.com",
  site: "zavionsherman.com",
  resumePdf: "/zavion_resume_latest.pdf",
  links: [
    { label: "LinkedIn", href: "https://linkedin.com/in/zavionsherman" },
    { label: "GitHub", href: "https://github.com/zavionz" },
    { label: "Whalor", href: "https://whalor.app" },
  ],
  summary:
    "Senior Full-Stack Engineer with 6+ years delivering customer-facing and internal SaaS products in fintech and healthcare. I work across frontend architecture, backend and API integration, performance, testing strategy and production release quality.",
};

export const stats = [
  { value: "6+", label: "Years shipping production software" },
  { value: "3", label: "Industries: fintech, healthcare, gov-tech" },
  { value: "~20%", label: "Retention lift I contributed to at B2Gnow" },
  { value: "2", label: "Apps I built and run: Whalor web + iOS" },
];

// Skill ids used to tag resume bullets so the résumé can be filtered.
export const skills = [
  { id: "react", label: "React", group: "Frontend" },
  { id: "next", label: "Next.js", group: "Frontend" },
  { id: "ts", label: "TypeScript", group: "Frontend" },
  { id: "rn", label: "React Native", group: "Frontend" },
  { id: "perf", label: "Performance", group: "Quality" },
  { id: "a11y", label: "WCAG 2.1 AA", group: "Quality" },
  { id: "node", label: "Node.js", group: "Backend" },
  { id: "go", label: "Go", group: "Backend" },
  { id: "dotnet", label: "C# / .NET", group: "Backend" },
  { id: "api", label: "REST APIs", group: "Backend" },
  { id: "micro", label: "Microservices", group: "Backend" },
  { id: "sql", label: "SQL / PostgreSQL", group: "Data" },
  { id: "auth", label: "Auth & access", group: "Data" },
  { id: "test", label: "Jest / RTL", group: "Quality" },
  { id: "ai", label: "AI-assisted dev", group: "Practice" },
  { id: "agile", label: "Agile / Scrum", group: "Practice" },
];

export const experience = [
  {
    id: "amex",
    company: "American Express",
    title: "Engineer II (Full-Stack)",
    period: "Sep 2022 — Present",
    domain: "Fintech",
    blurb: "Cardmember onboarding and servicing journeys for one of the world's largest card issuers.",
    bullets: [
      { text: "Owned and shipped key cardmember onboarding journeys: activation, registration, and account servicing (remove card and add account user).", tags: ["react", "ts"] },
      { text: "Built frontend + backend-integrated features for acquisition and servicing, connecting UI states to secure REST APIs with robust validation and fallback handling.", tags: ["react", "api", "auth"] },
      { text: "Implemented API orchestration patterns that combine profile, eligibility and account-service responses into cohesive flows with lower failure rates.", tags: ["api", "node"] },
      { text: "Applied performance optimizations (code splitting, lazy loading, smarter data fetching) to improve load speed and reduce client bundle size.", tags: ["perf", "react"] },
      { text: "Contributed to AI-assisted feature development: prompt-driven generation, iteration and validation to ship faster at higher quality.", tags: ["ai"] },
      { text: "Wrote and maintained unit and integration coverage with Jest + React Testing Library for high-traffic releases.", tags: ["test", "react"] },
      { text: "Partnered with product, design and platform teams to turn compliance-heavy banking requirements into production-ready full-stack solutions.", tags: ["agile", "a11y"] },
    ],
  },
  {
    id: "tango",
    company: "Tango",
    title: "Mid-Level Full-Stack Engineer (Consultant)",
    period: "Aug 2021 — Sep 2022",
    domain: "Home healthcare",
    blurb: "Clinical and operational software that took home-health agencies off paper.",
    bullets: [
      { text: "Built OASIS (Outcome and Assessment Information Set) workflows that digitized critical patient-assessment documentation.", tags: ["react", "ts"] },
      { text: "Developed provider-portal features for tracking patient visits, reviewing care notes and monitoring visit data in one system.", tags: ["react", "ts"] },
      { text: "Implemented referral intake and submission experiences that improved throughput and supported measurable revenue impact.", tags: ["react", "api"] },
      { text: "Built and integrated REST APIs and microservices connecting patient records, scheduling context and visit documentation.", tags: ["api", "micro", "node"] },
      { text: "Improved role-based access and workflow routing so each clinical and operational user saw the right patient information at the right step.", tags: ["auth"] },
      { text: "Integrated third-party services and modernized core UI modules with TypeScript + React for maintainability and release velocity.", tags: ["ts", "react", "perf"] },
      { text: "Partnered with product and operations to turn home-health requirements into scalable, compliant software.", tags: ["agile"] },
    ],
  },
  {
    id: "b2gnow",
    company: "B2Gnow",
    title: "Software Engineer II",
    period: "Aug 2019 — Aug 2021",
    domain: "Gov-tech SaaS",
    blurb: "Supplier-diversity and contract-compliance software for public agencies.",
    bullets: [
      { text: "Maintained and enhanced the core application with C#, .NET, SQL and HTML/CSS, contributing to a ~20% retention increase.", tags: ["dotnet", "sql"] },
      { text: "Managed L1/L2 escalations and production support to keep the platform stable.", tags: ["dotnet"] },
      { text: "Built custom SQL/SSRS reports that improved customer reporting and decision-making.", tags: ["sql"] },
      { text: "Collaborated cross-functionally to ship customer-driven features.", tags: ["agile"] },
    ],
  },
];

export const whalor = {
  name: "Whalor",
  url: "https://whalor.app",
  year: "2025 — Present",
  role: "Founder · Product · Full-stack engineering",
  tagline: "Real-time options alerts, on web and iPhone.",
  intro:
    "Whalor turns a firehose of options activity into a short list of setups worth a look, with the context to understand them in seconds. I designed and built the whole system: the React web app, the React Native iOS app, and the Go services and PostgreSQL data behind them.",
  stack: ["React Native", "TypeScript", "React", "Go", "PostgreSQL", "Clerk Auth"],
  highlights: [
    { title: "Two clients, one system", text: "A React web app and a React Native mobile app built on the same Go backend services and PostgreSQL, so both stay in sync." },
    { title: "Signal over noise", text: "Configurable filters and real-time alerts that cut through options-flow noise and surface high-signal setups." },
    { title: "Practice without risk", text: "Paper-trading workflows let users simulate ideas and measure how a strategy performs without placing real orders." },
    { title: "Secure by default", text: "Clerk-based authentication and user-scoped data access across the web and mobile clients." },
  ],
  shots: [
    { src: "/whalor-homepage.png", alt: "Whalor website hero: live unusual options alerts", kind: "web" },
    { src: "/whalor-mobile-1.png", alt: "Whalor iOS app home: market status, paper portfolio, earnings and news", kind: "phone" },
    { src: "/whalor-mobile-2.png", alt: "Whalor iOS app whale trades: large options trades filtered by size", kind: "phone" },
  ],
};
