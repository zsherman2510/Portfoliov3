// Every fact on the site comes from the résumé served at profile.resumePdf
// (iCloud Drive › Desktop › Resume_2026 › Zavion_Sherman_Resume_2026-10, Oct 19 2026).
// Keep the two in sync: edit the résumé first, then this file.
// Deliberately left off the site: the Whalor Trader / SnapTrade broker integration
// (owner request: no broker or trading material on the portfolio).

export const profile = {
  name: "Zavion Sherman",
  first: "Zavion",
  last: "Sherman",
  role: "Senior Software Engineer · Full Stack & AI Engineering",
  location: "Phoenix, AZ",
  email: "shermanzavion@gmail.com",
  site: "zavionsherman.com",
  resumePdf: "/Zavion_Sherman_Resume.pdf",
  links: [
    { label: "LinkedIn", href: "https://linkedin.com/in/zavionsherman" },
    { label: "GitHub", href: "https://github.com/zavionz" },
    { label: "Whalor", href: "https://whalor.app" },
  ],
  summary:
    "Full stack and AI engineer with 7 years of experience shipping customer-facing products in fintech, healthcare and enterprise SaaS. At American Express I build Java/Kotlin services and React experiences for Platinum and international card products, and use AI-assisted development to double delivery speed. As founder of Whalor, I single-handedly built and operate a production real-time platform spanning a Go backend, a React Native iOS app and a React web app.",
};

export const stats = [
  { value: "7", label: "Years shipping fintech, healthcare and SaaS" },
  { value: "2,000+", label: "Whalor downloads" },
  { value: "12.8s", label: "Median bar close → push alert on Whalor" },
  { value: "900+", label: "High-risk vulnerabilities remediated at Amex" },
];

// Core technologies, grouped as on the résumé. Ids tag the résumé bullets so the
// interactive résumé can filter by skill.
export const skills = [
  { id: "ts", label: "TypeScript", group: "Languages" },
  { id: "js", label: "JavaScript", group: "Languages" },
  { id: "go", label: "Go", group: "Languages" },
  { id: "java", label: "Java", group: "Languages" },
  { id: "kotlin", label: "Kotlin", group: "Languages" },
  { id: "csharp", label: "C#", group: "Languages" },
  { id: "sql", label: "SQL", group: "Languages" },
  { id: "llm", label: "Anthropic & Gemini APIs", group: "AI & LLM" },
  { id: "structured", label: "Structured outputs & fallback", group: "AI & LLM" },
  { id: "agents", label: "AI agent orchestration", group: "AI & LLM" },
  { id: "aitest", label: "AI-driven test generation", group: "AI & LLM" },
  { id: "react", label: "React", group: "Frontend & Mobile" },
  { id: "rn", label: "React Native / Expo", group: "Frontend & Mobile" },
  { id: "html", label: "HTML & CSS", group: "Frontend & Mobile" },
  { id: "fiber", label: "Go (Fiber)", group: "Backend & APIs" },
  { id: "dotnet", label: ".NET", group: "Backend & APIs" },
  { id: "jvm", label: "Java/Kotlin services", group: "Backend & APIs" },
  { id: "rest", label: "REST", group: "Backend & APIs" },
  { id: "ws", label: "WebSockets", group: "Backend & APIs" },
  { id: "events", label: "Event-driven architecture", group: "Backend & APIs" },
  { id: "soap", label: "SOAP-to-REST migration", group: "Backend & APIs" },
  { id: "pg", label: "PostgreSQL", group: "Data" },
  { id: "sqlserver", label: "SQL Server", group: "Data" },
  { id: "redis", label: "Redis", group: "Data" },
  { id: "ssrs", label: "SSRS", group: "Data" },
  { id: "gha", label: "GitHub Actions", group: "Cloud & Delivery" },
  { id: "cnb", label: "Cloud Native Buildpacks", group: "Cloud & Delivery" },
  { id: "railway", label: "Railway", group: "Cloud & Delivery" },
  { id: "sec", label: "CI security scanning", group: "Cloud & Delivery" },
  { id: "stripe", label: "Stripe", group: "Cloud & Delivery" },
];

// start/end are [year, month 0-11]; end null = present. lane 1 = parallel role.
export const experience = [
  {
    id: "amex",
    company: "American Express",
    title: "Engineer II, Full Stack",
    period: "Sep 2022 — Present",
    start: [2022, 8],
    end: null,
    lane: 0,
    domain: "Fintech",
    tech: "Java, Kotlin, React, TypeScript, REST, SOAP, GitHub Actions, Cloud Native Buildpacks",
    blurb: "Platinum and international card products for one of the world's largest card issuers.",
    bullets: [
      { text: "Led development of Mexico \"numberless\" instant card numbers, giving Mexican cardmembers immediate card access on par with the US market and increasing Mexico sign-ups by 12%.", tags: ["jvm", "java", "kotlin", "react"] },
      { text: "Built features for the Platinum Card refresh, including Guided Setup for new cardmembers and integrations with offer partners such as Lululemon and Resy, contributing to a 12% lift in Platinum conversion and 13% year-over-year growth in Platinum revenue and sign-ups.", tags: ["react", "ts", "rest"] },
      { text: "Led the migration of the team's deployments from XL Release to GitHub Actions using Cloud Native Buildpacks images.", tags: ["gha", "cnb"] },
      { text: "Remediated 900+ high-risk vulnerabilities across five Java backend services by upgrading vulnerable dependencies and refactoring affected code.", tags: ["java", "jvm", "sec"] },
      { text: "Engineer on the migration of Know Your Customer (KYC) functions from legacy SOAP services to REST endpoints in Java and Kotlin.", tags: ["soap", "rest", "java", "kotlin"] },
      { text: "Raised unit test coverage across five frontend applications to 100%, and took the Java/Kotlin backend services from 50% to 100% using AI-assisted testing.", tags: ["aitest", "react", "jvm"] },
      { text: "Halved feature delivery time, from two sprints to one, by adopting AI-assisted development workflows.", tags: ["agents"] },
    ],
  },
  {
    id: "whalor",
    company: "Whalor",
    title: "Founder & Sole Engineer (SocialGo LLC)",
    period: "2025 — Present",
    start: [2025, 0],
    end: null,
    lane: 1,
    domain: "Founder",
    tech: "Go (Fiber), PostgreSQL, Redis, WebSockets, React Native/Expo, React/TypeScript, Stripe, Railway, Anthropic & Gemini APIs",
    blurb: "A production real-time 0DTE options-alert platform I designed, built and operate on my own.",
    bullets: [
      { text: "Designed, built and operate a production iOS app, web app and Go API that deliver real-time 0DTE options alerts (ticker, contract, entry, take-profit ladder, stop and trigger rationale); 2,000+ downloads and ~12,700 push notifications per month.", tags: ["go", "fiber", "rn", "react", "ts", "pg"] },
      { text: "Built a real-time market-data pipeline, from a streaming WebSocket feed into a typed Go event bus with bounded concurrency, scanning 8 tickers every minute and fanning out alerts with a median 12.8s (p95 18.6s) from bar close to notification.", tags: ["go", "ws", "events", "redis"] },
      { text: "Designed a three-lane strategy platform (live, shadow, rejected) tracking 550+ strategy profiles and ~240 candidate evaluations per trading day, with gate-based admission, roster promotion and automated outcome grading of 1,300+ setups against a TP1/TP2/TP3 take-profit ladder.", tags: ["go", "pg", "sql"] },
      { text: "Grew the platform to ~250K lines of Go and ~160K lines of TypeScript across 3 repositories with 6,700+ automated tests, 269 database migrations and CI security scanning, shipping ~8 production deploys per day at a 0.011% server error rate.", tags: ["go", "ts", "pg", "sec", "gha", "railway"] },
      { text: "Built the product with an AI-native workflow, orchestrating multiple AI coding agents (Claude Code, Codex) for implementation, code review, test generation and iOS simulator QA, while owning architecture, review and production decisions.", tags: ["agents", "aitest"] },
      { text: "Integrated Anthropic and Gemini LLM APIs with provider fallback and structured outputs, powering AI-generated content and an LLM decision assistant evaluated against graded trade outcomes, while live alert decisions stay deterministic and rule-based.", tags: ["llm", "structured"] },
      { text: "Own Stripe subscription billing, lifecycle and daily recap email (1,600+ recipients) and the SEO content web app.", tags: ["stripe", "react", "ts"] },
    ],
  },
  {
    id: "tango",
    company: "Tango Home Healthcare",
    title: "Full Stack Engineer Consultant",
    period: "Aug 2021 — Sep 2022",
    start: [2021, 7],
    end: [2022, 8],
    lane: 0,
    domain: "Healthcare",
    tech: "React, TypeScript, C#/.NET, SQL Server, REST APIs",
    blurb: "Clinical and operational software for a home-healthcare provider network.",
    bullets: [
      { text: "Built a public-facing referral website in React and C#/.NET where physicians and clinicians submit patient referrals directly to Tango, increasing referral volume by 35%.", tags: ["react", "dotnet", "csharp"] },
      { text: "Designed and built a fault-tolerant, low-latency data sync in C#/.NET and SQL Server that reconciled patient insurance and visit counts across two external systems and Tango's platform, keeping data accurate across all three.", tags: ["dotnet", "csharp", "sqlserver", "sql"] },
      { text: "Modernized the React UI of the provider portal, where providers manage their patients, contributing to a 20% increase in provider renewals.", tags: ["react", "ts"] },
      { text: "Helped modernize the provider network application (patients, insurance, visit counts) on React, C#/.NET and SQL Server, reducing bugs and complexity and contributing to 15% revenue growth.", tags: ["react", "dotnet", "sqlserver"] },
      { text: "Cut feature delivery time by 50%, from four sprints to two, and sped up critical bug fixes on the modernized codebase.", tags: ["react", "dotnet"] },
    ],
  },
  {
    id: "b2gnow",
    company: "B2Gnow",
    title: "Software Engineer II",
    period: "Aug 2019 — Aug 2021",
    start: [2019, 7],
    end: [2021, 7],
    lane: 0,
    domain: "Enterprise SaaS",
    tech: "C#/.NET, VB6, JavaScript, HTML, CSS, SQL Server, SSRS",
    blurb: "Modernizing a 20-year-old platform without taking it offline.",
    bullets: [
      { text: "Core developer on the modernization of B2Gnow's 20-year-old VB6 platform to C#/.NET, migrating 70+ modules and 200+ screens over two years while keeping the product live for customers.", tags: ["csharp", "dotnet"] },
      { text: "Rewrote core business logic and data access in C#/.NET and SQL Server, contributing to a 40% reduction in page load times.", tags: ["csharp", "dotnet", "sqlserver", "sql"] },
      { text: "Helped cut defect volume by 80% and bug-fix turnaround from 7 days to under 12 hours on the modernized codebase.", tags: ["dotnet"] },
      { text: "Rebuilt legacy UI flows with JavaScript, HTML and CSS, and built custom SQL and SSRS reports for client reporting.", tags: ["js", "html", "sql", "ssrs"] },
    ],
  },
];

export const education = {
  school: "University of Arizona",
  place: "Tucson, AZ",
  detail: "Computer Science coursework",
  period: "Aug 2016 — Aug 2019",
};

export const whalor = {
  name: "Whalor",
  url: "https://whalor.app",
  year: "2025 — Present",
  role: "Founder & sole engineer",
  tagline: "Real-time 0DTE options alerts, built and run by one engineer.",
  intro:
    "Whalor delivers real-time 0DTE options alerts with the ticker, contract, entry, take-profit ladder, stop and the reason it triggered, and publishes how every alert turned out. I designed, built and operate all of it: the Go API and market-data pipeline, the React Native iOS app and the React web app.",
  stack: ["Go (Fiber)", "PostgreSQL", "Redis", "WebSockets", "React Native / Expo", "React / TypeScript", "Stripe", "Railway", "Anthropic & Gemini APIs"],
  metrics: [
    { value: "2,000+", label: "downloads" },
    { value: "~12,700", label: "push alerts a month" },
    { value: "12.8s", label: "median bar close → notification (p95 18.6s)" },
    { value: "6,700+", label: "automated tests" },
    { value: "~8", label: "production deploys a day" },
    { value: "0.011%", label: "server error rate" },
  ],
  highlights: [
    { title: "Real-time pipeline", text: "A streaming WebSocket feed into a typed Go event bus with bounded concurrency, scanning 8 tickers every minute and fanning alerts out in a median 12.8 seconds from bar close." },
    { title: "Strategy platform", text: "Three lanes (live, shadow, rejected) tracking 550+ strategy profiles and ~240 candidate evaluations a day, with gate-based admission and automated grading of 1,300+ setups." },
    { title: "AI-native engineering", text: "Multiple AI coding agents (Claude Code, Codex) for implementation, review, test generation and iOS simulator QA, while I own architecture and production decisions." },
    { title: "LLMs where they belong", text: "Anthropic and Gemini APIs with provider fallback and structured outputs power content and a decision assistant; live alert decisions stay deterministic and rule-based." },
  ],
  shots: [
    { src: "/whalor/web-home-2026-10.png", alt: "Whalor website, October 2026: 0DTE options alerts that post their losses", kind: "web" },
    { src: "/whalor/ios-welcome-2026-10.png", alt: "Whalor iOS app, October 2026: welcome screen with an example graded setup", kind: "phone" },
    { src: "/whalor/ios-setups-2026-10-20.png", alt: "Whalor iOS app, Oct 20 2026: the day's setups, 2 won and 0 lost, with a SPY call graded at +100%", kind: "card" },
  ],
};
