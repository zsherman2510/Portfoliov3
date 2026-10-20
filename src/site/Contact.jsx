import { useState } from "react";
import { profile } from "../content";
import { Reveal, RiseText, SectionLabel } from "./motion";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden pb-10 pt-24 md:pt-36">
      <div className="wrap">
        <SectionLabel index="05">Contact</SectionLabel>
        <h2 className="mt-12 font-display text-[clamp(3.5rem,13vw,13rem)] leading-[0.88] tracking-[-0.03em]">
          <RiseText text="Let's build" />
          <br />
          <span className="italic text-signal"><RiseText text="something good." delay={0.15} /></span>
        </h2>
        <Reveal className="mt-14 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <a href={`mailto:${profile.email}`} data-cursor="Email" className="rounded-full bg-paper px-7 py-4 text-base font-medium text-ink transition-transform hover:-translate-y-0.5">
              {profile.email}
            </a>
            <button type="button" onClick={copy} className="rounded-full border border-line px-5 py-4 text-sm text-paper transition-colors hover:border-paper" aria-live="polite">
              {copied ? "Copied ✓" : "Copy email"}
            </button>
          </div>
          <ul className="flex flex-wrap gap-6">
            {profile.links.map((l) => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 text-lg">
                  <span className="border-b border-transparent transition-colors group-hover:border-paper">{l.label}</span>
                  <span aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                </a>
              </li>
            ))}
            <li>
              <a href={profile.resumePdf} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 text-lg">
                <span className="border-b border-transparent transition-colors group-hover:border-paper">Résumé PDF</span>
                <span aria-hidden="true">↗</span>
              </a>
            </li>
          </ul>
        </Reveal>
      </div>
      <footer className="wrap mt-28 flex flex-col gap-3 border-t border-line pt-6 text-sm text-mute sm:flex-row sm:justify-between">
        <span>© {new Date().getFullYear()} {profile.name} · {profile.location}</span>
        <span>Designed and built by me with React, Tailwind and Framer Motion.</span>
        <a href="#top" className="text-paper">Back to top ↑</a>
      </footer>
    </section>
  );
}
