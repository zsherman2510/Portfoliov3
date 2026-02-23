export const projects = [
  {
    number: "01",
    slug: "whalor",
    title: "Whalor",
    tagline: "Options flow platform across mobile, web, and backend execution",
    description:
      "Whalor is a multi-surface trading product focused on unusual options activity. I built it as a full system: mobile app, web app, and a Go backend that handles market logic, auth, and execution services.",
    imageUrl: "/whalor-homepage.png",
    media: {
      web: [
        { label: "Web app homepage", src: "/whalor-homepage.png" },
      ],
      mobile: [
        {
          label: "Mobile home",
          src: "/whalor/whalor-01-home.png",
          expectedFile: "/whalor/whalor-01-home.png",
        },
        {
          label: "Flow feed",
          src: "/whalor/whalor-02-whale-trades.png",
          expectedFile: "/whalor/whalor-02-whale-trades.png",
        },
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
        "Mobile app: Expo + React Native + Clerk + Convex for real-time UX.",
        "Web app: React + Vite + TypeScript + Tailwind + Convex + Clerk.",
        "Backend: Go (Fiber) APIs with websocket support, scheduling, and broker/payment integrations.",
        "Data + auth flows designed for low-latency reads and secure user-scoped access.",
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
      "Expo",
      "React Native",
      "React",
      "Vite",
      "TypeScript",
      "Go",
      "Tailwind CSS",
      "Convex",
      "Clerk",
      "Fiber",
      "WebSockets",
      "Stripe",
    ],
    highlights: [
      "Cross-platform product: mobile app + web app + Go backend",
      "Real-time unusual activity feed and filter workflows",
      "Explainable market context layered on raw flow",
      "Production auth, billing, and event infrastructure",
    ],
    whatItDoes: [
      {
        title: "Filters noise fast",
        body: "Ranks and surfaces options flow that deserves immediate attention.",
      },
      {
        title: "Keeps traders in context",
        body: "Adds clear rationale so users can quickly understand why a print matters.",
      },
      {
        title: "Works across surfaces",
        body: "Mobile and web experiences stay aligned through shared backend logic and data models.",
      },
    ],
  },

  {
    number: "02",
    slug: "quicksign",
    title: "QuickSign",
    tagline: "Modern e-signature + AI document workflow platform",
    description:
      "QuickSign is an end-to-end document workflow platform for businesses that need fast e-signatures, automation, and clean billing. It includes a web app and an in-progress mobile app companion.",
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
        "Persistence and data access: Prisma.",
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
      "Web e-signature platform with AI-assisted document workflows",
      "Billing + identity + analytics integrations",
      "In-progress mobile app for document actions on the go",
      "Conversion-focused UX from document creation to signed completion",
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
      "LEENR is a habit-driven fitness app built to improve adherence. The product emphasizes low-friction tracking, clear progress signals, and supportive coaching loops instead of overwhelming users with complexity.",
    imageUrl: "/leenr-homepage.png",
    media: {
      web: [
        { label: "Landing page", src: "/leenr-homepage.png" },
      ],
      mobile: [
        {
          label: "Create program",
          src: "/leenr/leenr-02-create-program.png",
          expectedFile: "/leenr/leenr-02-create-program.png",
        },
        {
          label: "Programs list",
          src: "/leenr/leenr-03-programs.png",
          expectedFile: "/leenr/leenr-03-programs.png",
        },
        {
          label: "Progress overview",
          src: "/leenr/leenr-04-progress.png",
          expectedFile: "/leenr/leenr-04-progress.png",
        },
        {
          label: "Plan overview",
          src: "/leenr/leenr-01-plan.png",
          expectedFile: "/leenr/leenr-01-plan.png",
        },
        {
          label: "Weight log and momentum",
          src: "/leenr/leenr-05-plan-overview.png",
          expectedFile: "/leenr/leenr-05-plan-overview.png",
        },
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
        "Clerk authentication with Convex-backed app data.",
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
      "Convex",
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
