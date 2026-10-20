import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { experience, profile, skills } from "../content";
import { ease, Reveal, RiseText } from "./motion";

// Timeline spans Aug 2019 → now, in months.
const START = { y: 2019, m: 7 };
const monthsFrom = (y, m) => (y - START.y) * 12 + (m - START.m);
const now = new Date();
const TOTAL = monthsFrom(now.getFullYear(), now.getMonth());
const SPANS = {
  b2gnow: [monthsFrom(2019, 7), monthsFrom(2021, 7)],
  tango: [monthsFrom(2021, 7), monthsFrom(2022, 8)],
  amex: [monthsFrom(2022, 8), TOTAL],
};
const YEARS = Array.from({ length: now.getFullYear() - 2019 }, (_, i) => 2020 + i);

const usedSkillIds = new Set(experience.flatMap((e) => e.bullets.flatMap((b) => b.tags)));
const filterable = skills.filter((s) => usedSkillIds.has(s.id));

export default function Resume() {
  const [active, setActive] = useState("amex");
  const [skill, setSkill] = useState(null);
  const job = experience.find((e) => e.id === active);

  const matches = useMemo(() => {
    const out = {};
    for (const e of experience) out[e.id] = skill ? e.bullets.filter((b) => b.tags.includes(skill)).length : e.bullets.length;
    return out;
  }, [skill]);

  const pickSkill = (id) => {
    const next = skill === id ? null : id;
    setSkill(next);
    if (next && !experience.find((e) => e.id === active).bullets.some((b) => b.tags.includes(next))) {
      const first = experience.find((e) => e.bullets.some((b) => b.tags.includes(next)));
      if (first) setActive(first.id);
    }
  };

  return (
    <section id="resume" className="bg-paper py-24 text-ink md:py-36">
      <div className="wrap">
        <div className="flex items-center gap-4 border-t border-ink/15 pt-5">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#13996a]">(03)</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">Interactive résumé</span>
        </div>

        <div className="mt-10 flex flex-wrap items-end justify-between gap-8">
          <h2 className="max-w-4xl font-display text-5xl leading-[1] tracking-tight md:text-7xl lg:text-8xl">
            <RiseText text="Six years, three teams," /> <span className="italic"><RiseText text="one through-line." delay={0.2} /></span>
          </h2>
          <a href={profile.resumePdf} target="_blank" rel="noreferrer" className="rounded-full bg-ink px-6 py-3 text-sm text-paper transition-transform hover:-translate-y-0.5">
            Download PDF ↗
          </a>
        </div>

        {/* Timeline */}
        <Reveal className="mt-16">
          <div className="relative h-16" role="tablist" aria-label="Roles by date">
            {experience.slice().reverse().map((e) => {
              const [a, b] = SPANS[e.id];
              const on = e.id === active;
              const dim = skill && matches[e.id] === 0;
              return (
                <button
                  key={e.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  aria-controls="role-panel"
                  onClick={() => setActive(e.id)}
                  className={`absolute top-0 flex h-12 items-center overflow-hidden rounded-full border px-4 text-left text-xs transition-all duration-500 ${on ? "border-ink bg-ink text-paper" : "border-ink/20 bg-transparent text-ink hover:border-ink"} ${dim ? "opacity-30" : ""}`}
                  style={{ left: `${(a / TOTAL) * 100}%`, width: `calc(${((b - a) / TOTAL) * 100}% - 6px)` }}
                >
                  <span className="truncate font-medium">{e.company}</span>
                </button>
              );
            })}
          </div>
          <div className="relative mt-2 h-4 font-mono text-[10px] text-ink/45" aria-hidden="true">
            {YEARS.map((y) => (
              <span key={y} className="absolute -translate-x-1/2 border-l border-ink/20 pl-1" style={{ left: `${(monthsFrom(y, 0) / TOTAL) * 100}%` }}>{y}</span>
            ))}
          </div>
        </Reveal>

        {/* Skill filter */}
        <Reveal className="mt-14">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">Filter by skill — see where I used it</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {filterable.map((s) => {
              const on = skill === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => pickSkill(s.id)}
                  className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${on ? "border-ink bg-ink text-paper" : "border-ink/20 hover:border-ink"}`}
                >
                  {s.label}
                </button>
              );
            })}
            {skill ? (
              <button type="button" onClick={() => setSkill(null)} className="px-3 py-1.5 text-sm text-ink/55 underline underline-offset-4">
                Clear
              </button>
            ) : null}
          </div>
        </Reveal>

        {/* Role panel */}
        <div className="mt-14 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <ul className="space-y-1">
              {experience.map((e) => (
                <li key={e.id}>
                  <button
                    type="button"
                    onClick={() => setActive(e.id)}
                    className={`group flex w-full items-baseline justify-between gap-4 border-t border-ink/15 py-5 text-left transition-opacity ${e.id === active ? "opacity-100" : "opacity-45 hover:opacity-100"}`}
                  >
                    <span>
                      <span className="block font-display text-4xl leading-none">{e.company}</span>
                      <span className="mt-2 block text-sm text-ink/60">{e.period}</span>
                    </span>
                    {skill ? <span className="font-mono text-xs">{matches[e.id]} match{matches[e.id] === 1 ? "" : "es"}</span> : <span className="font-mono text-xs">{e.domain}</span>}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div id="role-panel" role="tabpanel" className="md:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div key={job.id} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.45, ease }}>
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">{job.period} · {job.domain}</p>
                <h3 className="mt-3 font-display text-4xl leading-tight md:text-5xl">{job.title}</h3>
                <p className="mt-3 text-lg text-ink/70">{job.blurb}</p>
                <ul className="mt-8">
                  {job.bullets.map((b, i) => {
                    const hit = !skill || b.tags.includes(skill);
                    return (
                      <motion.li
                        key={i}
                        layout
                        className={`grid grid-cols-[2.5rem_1fr] gap-3 border-t border-ink/15 py-4 transition-all duration-500 ${hit ? "opacity-100" : "opacity-25"}`}
                      >
                        <span className={`font-mono text-xs ${hit && skill ? "text-[#13996a]" : "text-ink/40"}`}>{String(i + 1).padStart(2, "0")}</span>
                        <span className="text-[17px] leading-relaxed">
                          {b.text}
                          <span className="mt-2 flex flex-wrap gap-1.5">
                            {b.tags.map((t) => (
                              <span key={t} className={`rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${t === skill ? "bg-ink text-paper" : "bg-ink/[0.06] text-ink/60"}`}>
                                {skills.find((s) => s.id === t)?.label}
                              </span>
                            ))}
                          </span>
                        </span>
                      </motion.li>
                    );
                  })}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

