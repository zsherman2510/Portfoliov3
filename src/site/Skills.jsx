import { useState } from "react";
import { experience, skills } from "../content";
import { Reveal, RiseText, SectionLabel } from "./motion";

// Where each skill shows up: the roles whose résumé bullets are tagged with it.
const usedAt = (id) => experience.filter((e) => e.bullets.some((b) => b.tags.includes(id))).map((e) => e.company);
const groups = [...new Set(skills.map((s) => s.group))];

export default function Skills() {
  const [hover, setHover] = useState(null);
  return (
    <section id="skills" className="py-24 md:py-36">
      <div className="wrap">
        <SectionLabel index="04">Toolkit</SectionLabel>
        <h2 className="mt-10 max-w-4xl font-display text-5xl leading-[1] tracking-tight md:text-7xl">
          <RiseText text="Full stack," /> <span className="italic"><RiseText text="AI native." delay={0.15} /></span>
        </h2>
        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((g, gi) => (
            <Reveal key={g} delay={gi * 0.06} className="bg-ink p-6">
              <p className="eyebrow mb-6">{g}</p>
              <ul className="space-y-1">
                {skills.filter((s) => s.group === g).map((s) => {
                  const places = usedAt(s.id);
                  const on = hover === s.id;
                  return (
                    <li key={s.id}>
                      <button
                        type="button"
                        onMouseEnter={() => setHover(s.id)}
                        onMouseLeave={() => setHover(null)}
                        onFocus={() => setHover(s.id)}
                        onBlur={() => setHover(null)}
                        className="w-full py-1.5 text-left"
                        aria-describedby={`used-${s.id}`}
                      >
                        <span className={`text-lg transition-colors ${on ? "text-signal" : "text-paper"}`}>{s.label}</span>
                        <span id={`used-${s.id}`} className={`block overflow-hidden font-mono text-[11px] text-mute transition-all duration-300 ${on ? "max-h-10 opacity-100" : "max-h-0 opacity-0"}`}>
                          {places.length ? places.join(" · ") : "On my résumé"}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
