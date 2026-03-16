export const projects = [
  {
    number: "01",
    slug: "whalor",
    title: "Whalor",
    tagline: "Options flow platform across mobile, web, and backend execution",
    description:
      "Whalor helps traders make faster, higher-quality decisions by turning noisy options flow into actionable signal. I built it as a full system: web app, mobile app, and a Go backend with PostgreSQL + Clerk powering secure, real-time workflows.",
    imageUrl: "/whalor-homepage.png",
    media: {
      web: [
        { label: "Web app homepage", src: "/whalor-homepage.png" },
      ],
      mobile: [
        { label: "Mobile home", src: "/whalor-mobile-1.png", expectedFile: "/whalor-mobile-1.png" },
        { label: "Flow feed", src: "/whalor-mobile-2.png", expectedFile: "/whalor-mobile-2.png" },
        { label: "Alert detail", src: "", expectedFile: "/whalor-mobile-3.png" },
      ],
    },
    projectUrl: "https://whalor.app",
    comingSoon: false,

    caseStudy: {
      role: "Founder, CTO, product + full-stack engineering",
      status: "Active development",
      timeline: "2025 to present",
      context:
        "Most retail traders see the same options prints, but miss timing because tools are noisy and hard to interpret quickly.",
      problem:
        "Raw flow data is high-volume and high-noise. Traders need clean, fast context to decide in seconds.",
      goals: [
        "Deliver a mobile-first real-time flow experience.",
        "Build explainable signal context, not black-box scores.",
        "Keep web and mobile in sync with reliable backend APIs.",
      ],
      nonGoals: [
        "Not trying to be a generic broker terminal.",
        "Not pretending AI can perfectly predict markets.",
      ],
      constraints: [
        "Low-latency feed expectations during market hours.",
        "High throughput filtering + ranking of options activity.",
        "Cross-platform consistency between web and mobile.",
      ],
      decisions: [
        {
          title: "Split product into focused services",
          why: "Mobile UX speed and backend reliability improve when each layer is purpose-built.",
          tradeoff: "More operational complexity across repos and deployments.",
        },
        {
          title: "Built explainable context into the feed",
          why: "Traders trust systems they can reason about under pressure.",
          tradeoff: "Extra work in copy, scoring logic, and UI structure.",
        },
      ],
      architecture: [
        "Mobile app: React Native + TypeScript client focused on low-latency trading UX.",
        "Web app: React + Vite + TypeScript + Tailwind for scanner and account workflows.",
        "Backend: Go (Fiber) APIs with websocket support, scheduling, and broker/payment integrations.",
        "Data + auth: PostgreSQL persistence with Clerk-based authentication and secure user-scoped access.",
      ],
      responsibilities: [
        "Product strategy and UX system design",
        "Backend architecture, APIs, and platform integrations",
        "Mobile and web feature implementation",
        "Operational monitoring and release workflows",
      ],
      outcomes: [
        "Fast scan workflow for unusual flow by strike, expiry, and premium.",
        "Cleaner signal-to-noise experience for traders.",
        "Stable base to expand alerts, personalization, and execution tooling.",
      ],
      next: [
        "Personalized ranking by trader behavior.",
        "Deeper multi-leg context and confidence scoring.",
        "Further optimization of push + watchlist alert timing.",
      ],
    },

    stack: [
      "React Native",
      "React",
      "Vite",
      "TypeScript",
      "Go",
      "PostgreSQL",
      "Tailwind CSS",
      "Clerk",
      "Fiber",
      "WebSockets",
      "Stripe",
    ],
    highlights: [
      "Cross-platform product: web app + mobile app + Go backend",
      "Paper-trading workflow for strategy testing without real-money execution",
      "Real-time unusual activity filters and alerts to reduce feed noise",
      "PostgreSQL + Clerk architecture for secure, user-scoped trading workflows",
    ],
    whatItDoes: [
      {
        title: "Filters noise fast",
        body: "Configurable filters and alert logic surface high-signal flow and suppress low-value noise.",
      },
      {
        title: "Paper trade with confidence",
        body: "Paper-trading workflows let users test setups and evaluate strategy behavior in live conditions.",
      },
      {
        title: "Works across web + mobile",
        body: "React web and React Native clients stay aligned through shared Go APIs, PostgreSQL data models, and Clerk auth.",
      },
    ],
  },

  {
    number: "02",
    slug: "quicksign",
    title: "QuickSign",
    tagline: "Modern e-signature + AI document workflow platform",
    description:
      "QuickSign helps businesses close documents faster by removing signature bottlenecks and manual follow-up. It’s an end-to-end e-sign workflow platform with a web app plus companion mobile experience, backed by secure auth, billing, and auditable data flows.",
    imageUrl: "/quicksign-homepage.png",
    media: {
      web: [
        { label: "Marketing homepage", src: "/quicksign-homepage.png" },
      ],
      mobile: [
        { label: "Mobile dashboard", src: "", expectedFile: "/quicksign-mobile-1.png" },
        { label: "Document preview", src: "", expectedFile: "/quicksign-mobile-2.png" },
      ],
    },
    projectUrl: "https://quicksign.it",
    comingSoon: false,

    caseStudy: {
      role: "Product + engineering lead",
      status: "Active development",
      timeline: "2025 to present",
      context:
        "Most small businesses use fragmented tools for contracts, signatures, invoices, and follow-ups.",
      problem:
        "Document workflows are slow, manual, and hard to track end-to-end.",
      goals: [
        "Create an affordable, high-speed document signing workflow.",
        "Integrate AI support for document generation and analysis.",
        "Support web now and mobile workflows next.",
      ],
      nonGoals: ["Not trying to mimic legacy enterprise suites with heavyweight UX."],
      constraints: [
        "Security and trust requirements for signed documents.",
        "Reliable email deliverability and signer experience.",
      ],
      decisions: [
        {
          title: "Built on Next.js full-stack architecture",
          why: "Fast iteration speed and strong fit for API + frontend in one repo.",
          tradeoff: "Careful boundary management between server/client logic.",
        },
        {
          title: "Embedded product analytics early",
          why: "Needed real usage insight to refine conversion and completion flows.",
          tradeoff: "Additional event instrumentation overhead.",
        },
      ],
      architecture: [
        "Web platform: Next.js + React + TypeScript + Tailwind.",
        "Persistence and data access: PostgreSQL + Prisma.",
        "Auth and identity: Clerk.",
        "Billing and payments: Stripe.",
        "Lifecycle intelligence: PostHog analytics + AI-assisted document tooling.",
        "Mobile companion: Expo + React Native app under active development.",
      ],
      responsibilities: [
        "System architecture and feature roadmap",
        "Signature workflow and document lifecycle UX",
        "Integrations (auth, billing, email, analytics)",
        "Mobile roadmap and implementation planning",
      ],
      outcomes: [
        "Fast e-sign flow from generation to signature completion.",
        "Clear foundation for business onboarding and recurring usage.",
      ],
      next: [
        "Expand mobile capabilities for on-the-go signing and approvals.",
        "Improve AI-assisted drafting and field automation.",
      ],
    },

    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL",
      "Prisma",
      "Clerk",
      "Stripe",
      "PostHog",
      "Expo",
      "React Native",
      "NativeWind",
      "Zustand",
    ],
    highlights: [
      "Web-first e-signature platform with companion mobile app",
      "End-to-end document lifecycle: drafting, routing, signer tracking, completion",
      "PostgreSQL/Prisma data model with Clerk identity and Stripe billing",
      "AI-assisted workflows to reduce setup time and accelerate completion",
    ],
    whatItDoes: [
      {
        title: "Speeds up signatures",
        body: "Businesses can create, send, and complete document signatures with less friction.",
      },
      {
        title: "Improves operations",
        body: "Reduces manual steps around document prep, tracking, and follow-up.",
      },
      {
        title: "Scales with product data",
        body: "Analytics and instrumentation guide feature decisions and conversion improvements.",
      },
    ],
  },

  {
    number: "03",
    slug: "leenr",
    title: "LEENR",
    tagline: "Mobile-first fitness app focused on daily consistency",
    description:
      "LEENR helps users stay consistent with fitness by reducing daily friction and making progress easy to understand. It’s a mobile-first product designed around adherence loops, clear feedback, and practical habit-building instead of feature overload.",
    imageUrl: "/leenr-homepage.png",
    media: {
      web: [
        { label: "Landing page", src: "/leenr-homepage.png" },
      ],
      mobile: [
        { label: "Onboarding", src: "/leenr-mobile-1.png", expectedFile: "/leenr-mobile-1.png" },
        { label: "Daily check-in", src: "/leenr-mobile-2.png", expectedFile: "/leenr-mobile-2.png" },
        { label: "Progress screen", src: "/leenr-mobile-3.png", expectedFile: "/leenr-mobile-3.png" },
      ],
    },
    projectUrl: "https://leenr.app",
    comingSoon: false,

    caseStudy: {
      role: "Founder, product architect, mobile engineer",
      status: "Active development",
      timeline: "2025 to present",
      context:
        "Most users drop fitness apps quickly because setup friction is high and feedback loops are weak.",
      problem:
        "People need a system that makes consistency easier, not another app with too many dashboards.",
      goals: [
        "Minimize daily friction in logging and routines.",
        "Create clear, motivating progress feedback.",
        "Ship a stable cross-platform mobile experience first.",
      ],
      nonGoals: ["Not designed as an advanced bodybuilder data warehouse in v1."],
      constraints: [
        "Onboarding drop-off sensitivity.",
        "Need strong auth + sync while keeping UX lightweight.",
      ],
      decisions: [
        {
          title: "Chose consistency-first UX",
          why: "Long-term behavior change beats feature novelty.",
          tradeoff: "Delayed advanced analytics and edge-case tooling.",
        },
      ],
      architecture: [
        "Expo + React Native + TypeScript mobile app.",
        "Expo Router navigation architecture.",
        "Clerk authentication with PostgreSQL-backed app data via API services.",
        "Supporting services include payments and secure storage integrations.",
      ],
      responsibilities: [
        "Product vision and behavior design",
        "Mobile implementation and architecture",
        "Auth, persistence, and monetization integration",
      ],
      outcomes: [
        "Clear MVP direction centered on adherence and repeat daily usage.",
        "Stable foundation for progressive coaching features.",
      ],
      next: [
        "Ship improved onboarding and streak loops.",
        "Expand coaching intelligence and personalized plans.",
      ],
    },

    stack: [
      "Expo",
      "React Native",
      "TypeScript",
      "Expo Router",
      "PostgreSQL",
      "Clerk",
      "Stripe",
      "Zustand",
    ],
    highlights: [
      "Mobile-first habit loop architecture",
      "Low-friction tracking and streak design",
      "Strong auth + synced state for daily usage",
      "Built for retention and long-term consistency",
    ],
    whatItDoes: [
      {
        title: "Removes friction",
        body: "Makes daily check-ins fast so users are more likely to stay consistent.",
      },
      {
        title: "Builds momentum",
        body: "Progress cues and streak mechanics reinforce repeat behavior.",
      },
      {
        title: "Supports long-term change",
        body: "Focuses on adherence systems instead of short-term hype features.",
      },
    ],
  },
];
