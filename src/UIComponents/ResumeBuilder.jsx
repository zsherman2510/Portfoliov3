import React, { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "zs_resume_builder_v1";

const defaultResume = {
  basics: {
    name: "Zavion Sherman",
    title: "Full-Stack Engineer",
    website: "zavionsherman.com",
    email: "",
    phone: "",
    location: "Phoenix, AZ",
    linkedin: "",
    github: "",
  },
  summary:
    "Senior Full-Stack Engineer with 6+ years delivering customer-facing and internal SaaS products in fintech and healthcare. Experienced across frontend architecture, backend/API integration, performance optimization, testing strategy, and production release quality using React, Next.js, Node.js, .NET, SQL/PostgreSQL, and AI-assisted development workflows.",
  skills: [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "REST APIs",
    "API Integration",
    "Microservices",
    "C#",
    ".NET Core",
    "SQL",
    "PostgreSQL",
    "Performance Optimization",
    "Jest",
    "React Testing Library",
    "Agile/Scrum",
    "WCAG 2.1 AA",
    "AI-Assisted Development",
  ],
  experience: [
    {
      company: "American Express",
      role: "Engineer II (Full-Stack)",
      start: "Sep 2022",
      end: "Present",
      bullets: [
        "Owned and shipped key cardmember onboarding journeys, including activation flow, registration flow, and account servicing flows (remove card and add account user experiences).",
        "Built frontend + backend-integrated features for acquisition and servicing experiences, connecting UI states to secure REST APIs with robust validation and fallback handling.",
        "Implemented API orchestration patterns to combine profile, eligibility, and account service responses into cohesive user flows with lower failure rates.",
        "Applied performance optimizations (code splitting, lazy loading, smarter data-fetching strategies) to improve load speed and reduce client bundle impact.",
        "Contributed to AI-assisted feature development workflows (prompt-driven generation, iteration, and validation) to accelerate delivery and improve implementation quality.",
        "Wrote and maintained unit/integration coverage with Jest + React Testing Library for high-traffic releases and regression protection.",
        "Partnered with product, design, and platform stakeholders to translate compliance-heavy banking requirements into production-ready full-stack solutions.",
      ],
    },
    {
      company: "Tango (Home Healthcare)",
      role: "Mid-Level Full-Stack Engineer (Consultant)",
      start: "Aug 2021",
      end: "Sep 2022",
      bullets: [
        "Built Oasis (Outcome and Assessment Information Set) workflows used in home healthcare operations to digitize critical patient-assessment documentation and reduce paper processes.",
        "Developed provider-facing portal features that enabled teams to track patient visits, review care notes, and monitor key visit data in one operational system.",
        "Implemented referral intake and submission experiences across provider workflows, improving throughput and supporting measurable revenue impact.",
        "Built and integrated REST APIs + microservices to connect patient records, scheduling context, and visit documentation with reliable data flow across systems.",
        "Improved role-based access and workflow routing so clinical and operational users could see the right patient information at the right step.",
        "Integrated third-party services and modernized core UI modules with TypeScript + React to improve maintainability, performance, and release velocity.",
        "Partnered with product and operations teams to translate home-health requirements into scalable, compliant software experiences.",
      ],
    },
    {
      company: "B2Gnow",
      role: "Software Engineer II",
      start: "Aug 2019",
      end: "Aug 2021",
      bullets: [
        "Maintained and enhanced core application with C#, .NET, SQL, HTML/CSS.",
        "Built custom SQL/SSRS reports for customer analytics and operational reporting.",
        "Owned L1/L2 escalation support to keep production reliability high.",
      ],
    },
  ],
  projects: [
    {
      name: "Whalor",
      links: "whalor.app",
      tech: "React Native, TypeScript, React (Web), Go (Backend), PostgreSQL, Clerk Auth",
      bullets: [
        "Built Whalor as both a web application and mobile application, with Go backend services and PostgreSQL powering market-data and user workflows.",
        "Implemented paper-trading workflows so users can simulate trades and evaluate strategy performance without placing real-money orders.",
        "Built configurable filters and alerting features to help users cut through options-flow noise and focus on high-signal setups.",
        "Implemented secure Clerk-based authentication and user-scoped data access across React web and React Native clients.",
      ],
    },
    {
      name: "QuickSign",
      links: "quicksign.it",
      tech: "Next.js, React, TypeScript, PostgreSQL, Prisma, Clerk, Stripe, Expo (Mobile)",
      bullets: [
        "Built QuickSign as a web-first e-signature platform with a companion mobile application for on-the-go document actions.",
        "Implemented end-to-end document lifecycle workflows, including drafting, signature routing, signer status tracking, and completion handling.",
        "Integrated Clerk authentication, Stripe billing, and backend data models to support secure, auditable business workflows.",
        "Shipped AI-assisted document tooling to reduce manual drafting time and improve workflow speed.",
      ],
    },
    {
      name: "LEENR",
      links: "leenr.app",
      tech: "React Native, Expo, TypeScript, PostgreSQL, Clerk, API Services",
      bullets: [
        "Built LEENR as a mobile-first fitness application focused on consistency, adherence, and low-friction daily tracking.",
        "Implemented check-in, progress, and habit-loop features that help users track workouts and health behaviors over time.",
        "Designed secure auth and synced data experiences for personalized, reliable user sessions.",
        "Iterated onboarding and retention-focused UX flows to improve repeat engagement and long-term usage.",
      ],
    },
  ],
};

const toLines = (resume) => {
  const { basics, summary, skills, experience, projects } = resume;
  const lines = [];

  lines.push((basics.name || "").toUpperCase());
  lines.push(basics.title || "");
  lines.push(
    [basics.website, basics.email, basics.phone, basics.location]
      .filter(Boolean)
      .join(" | ")
  );
  lines.push([basics.linkedin, basics.github].filter(Boolean).join(" | "));
  lines.push("");
  lines.push("SUMMARY");
  lines.push(summary || "");
  lines.push("");
  lines.push("SKILLS");
  lines.push((skills || []).filter(Boolean).join(", "));
  lines.push("");
  lines.push("EXPERIENCE");

  (experience || []).forEach((job) => {
    lines.push(`${job.role || ""} — ${job.company || ""} | ${job.start || ""} - ${job.end || ""}`);
    (job.bullets || []).forEach((b) => lines.push(`- ${b}`));
    lines.push("");
  });

  lines.push("PROJECTS");
  (projects || []).forEach((p) => {
    lines.push(`${p.name || ""}${p.links ? ` (${p.links})` : ""}`);
    if (p.tech) lines.push(`Tech: ${p.tech}`);
    (p.bullets || []).forEach((b) => lines.push(`- ${b}`));
    lines.push("");
  });

  return lines.filter((l, i, arr) => !(l === "" && arr[i - 1] === "")).join("\n");
};

const downloadFile = (filename, content, type = "text/plain;charset=utf-8") => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};

const SectionTitle = ({ children }) => <h3 className="brutal-h4 uppercase mb-3">{children}</h3>;

const ResumePreview = ({ resume }) => {
  const { basics, summary, skills, experience, projects } = resume;

  return (
    <div className="resume-preview bg-white border-4 border-brutal-black p-8 md:p-10">
      <header className="border-b-2 border-brutal-black pb-4 mb-6">
        <h1 className="font-heading text-4xl uppercase leading-none font-extrabold tracking-tight">{basics.name}</h1>
        <p className="font-heading text-lg uppercase mt-1 font-bold">{basics.title}</p>
        <p className="text-sm mt-2 font-medium">
          {[basics.website, basics.email, basics.phone, basics.location].filter(Boolean).join(" | ")}
        </p>
        <p className="text-sm font-medium">{[basics.linkedin, basics.github].filter(Boolean).join(" | ")}</p>
      </header>

      <section className="mb-5">
        <h2 className="font-heading uppercase text-[15px] tracking-widest border-b-2 border-brutal-black mb-2 font-extrabold">Summary</h2>
        <p className="text-sm leading-relaxed">{summary}</p>
      </section>

      <section className="mb-5">
        <h2 className="font-heading uppercase text-[15px] tracking-widest border-b-2 border-brutal-black mb-2 font-extrabold">Skills</h2>
        <p className="text-sm leading-relaxed">{skills.join(", ")}</p>
      </section>

      <section className="mb-5">
        <h2 className="font-heading uppercase text-[15px] tracking-widest border-b-2 border-brutal-black mb-2 font-extrabold">Experience</h2>
        <div className="space-y-4">
          {experience.map((job, idx) => (
            <div key={idx}>
              <div className="flex justify-between items-baseline gap-3 flex-wrap">
                <p className="font-heading text-sm uppercase font-extrabold">{job.role} — {job.company}</p>
                <p className="text-xs uppercase font-semibold">{job.start} - {job.end}</p>
              </div>
              <ul className="list-disc pl-5 text-sm mt-1.5 space-y-1.5">
                {(job.bullets || []).map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-heading uppercase text-[15px] tracking-widest border-b-2 border-brutal-black mb-2 font-extrabold">Projects</h2>
        <div className="space-y-4">
          {projects.map((p, idx) => (
            <div key={idx}>
              <p className="font-heading text-sm uppercase font-extrabold">{p.name} {p.links ? `(${p.links})` : ""}</p>
              {p.tech && <p className="text-xs mt-1"><span className="font-semibold">Tech:</span> {p.tech}</p>}
              <ul className="list-disc pl-5 text-sm mt-1 space-y-1">
                {(p.bullets || []).map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const ResumeBuilder = () => {
  const [resume, setResume] = useState(defaultResume);
  const [savedAt, setSavedAt] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setResume(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resume));
      setSavedAt(new Date());
    }, 250);
    return () => clearTimeout(t);
  }, [resume]);

  const resumeText = useMemo(() => toLines(resume), [resume]);

  const updateBasics = (field, value) => {
    setResume((prev) => ({ ...prev, basics: { ...prev.basics, [field]: value } }));
  };

  const updateJob = (idx, patch) => {
    setResume((prev) => ({
      ...prev,
      experience: prev.experience.map((j, i) => (i === idx ? { ...j, ...patch } : j)),
    }));
  };

  const updateProject = (idx, patch) => {
    setResume((prev) => ({
      ...prev,
      projects: prev.projects.map((p, i) => (i === idx ? { ...p, ...patch } : p)),
    }));
  };

  return (
    <section className="brutal-section bg-brutal-offwhite">
      <div className="brutal-container space-y-8">
        <div className="flex items-start justify-between gap-4 flex-wrap no-print">
          <div>
            <h2 className="brutal-h2">resume builder</h2>
            <p className="brutal-body-lg mt-2">edit once, autosave, export for job boards.</p>
            {savedAt && <p className="brutal-body mt-2">saved: {savedAt.toLocaleTimeString()}</p>}
          </div>
          <div className="flex gap-3 flex-wrap">
            <button
              className="brutal-btn-secondary"
              onClick={() => downloadFile("zavion-resume.txt", resumeText)}
            >
              export txt
            </button>
            <button
              className="brutal-btn-secondary"
              onClick={() =>
                downloadFile("zavion-resume.json", JSON.stringify(resume, null, 2), "application/json")
              }
            >
              export json
            </button>
            <button className="brutal-btn-primary" onClick={() => window.print()}>
              print / save PDF
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 no-print">
          <div className="space-y-6">
            <div className="brutal-card p-6">
              <SectionTitle>basics</SectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.entries(resume.basics).map(([key, value]) => (
                  <label key={key} className="flex flex-col gap-1">
                    <span className="brutal-label">{key}</span>
                    <input
                      className="border-4 border-brutal-black p-2"
                      value={value}
                      onChange={(e) => updateBasics(key, e.target.value)}
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className="brutal-card p-6">
              <SectionTitle>summary</SectionTitle>
              <textarea
                className="w-full border-4 border-brutal-black p-3 min-h-[120px]"
                value={resume.summary}
                onChange={(e) => setResume((p) => ({ ...p, summary: e.target.value }))}
              />
            </div>

            <div className="brutal-card p-6">
              <SectionTitle>skills (comma separated)</SectionTitle>
              <textarea
                className="w-full border-4 border-brutal-black p-3 min-h-[90px]"
                value={resume.skills.join(", ")}
                onChange={(e) =>
                  setResume((p) => ({
                    ...p,
                    skills: e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean),
                  }))
                }
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="brutal-card p-6">
              <SectionTitle>experience</SectionTitle>
              <div className="space-y-6">
                {resume.experience.map((job, idx) => (
                  <div key={idx} className="border-4 border-brutal-black p-3">
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <input className="border-2 border-brutal-black p-2" value={job.role} onChange={(e) => updateJob(idx, { role: e.target.value })} placeholder="Role" />
                      <input className="border-2 border-brutal-black p-2" value={job.company} onChange={(e) => updateJob(idx, { company: e.target.value })} placeholder="Company" />
                      <input className="border-2 border-brutal-black p-2" value={job.start} onChange={(e) => updateJob(idx, { start: e.target.value })} placeholder="Start" />
                      <input className="border-2 border-brutal-black p-2" value={job.end} onChange={(e) => updateJob(idx, { end: e.target.value })} placeholder="End" />
                    </div>
                    <textarea
                      className="w-full border-2 border-brutal-black p-2 min-h-[110px]"
                      value={(job.bullets || []).join("\n")}
                      onChange={(e) =>
                        updateJob(idx, {
                          bullets: e.target.value
                            .split("\n")
                            .map((x) => x.replace(/^[-•]\s*/, "").trim())
                            .filter(Boolean),
                        })
                      }
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="brutal-card p-6">
              <SectionTitle>projects</SectionTitle>
              <div className="space-y-6">
                {resume.projects.map((p, idx) => (
                  <div key={idx} className="border-4 border-brutal-black p-3">
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <input className="border-2 border-brutal-black p-2" value={p.name} onChange={(e) => updateProject(idx, { name: e.target.value })} placeholder="Project" />
                      <input className="border-2 border-brutal-black p-2" value={p.links} onChange={(e) => updateProject(idx, { links: e.target.value })} placeholder="Link" />
                    </div>
                    <input className="border-2 border-brutal-black p-2 w-full mb-2" value={p.tech} onChange={(e) => updateProject(idx, { tech: e.target.value })} placeholder="Tech stack" />
                    <textarea
                      className="w-full border-2 border-brutal-black p-2 min-h-[90px]"
                      value={(p.bullets || []).join("\n")}
                      onChange={(e) =>
                        updateProject(idx, {
                          bullets: e.target.value
                            .split("\n")
                            .map((x) => x.replace(/^[-•]\s*/, "").trim())
                            .filter(Boolean),
                        })
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="brutal-card p-6 print:border-0 print:p-0 print:shadow-none">
          <SectionTitle>styled preview (used for Print / Save PDF)</SectionTitle>
          <ResumePreview resume={resume} />
        </div>

        <div className="brutal-card p-6 no-print">
          <SectionTitle>plain text preview</SectionTitle>
          <pre className="whitespace-pre-wrap text-sm bg-brutal-cream border-4 border-brutal-black p-4">{resumeText}</pre>
        </div>
      </div>
    </section>
  );
};

export default ResumeBuilder;
