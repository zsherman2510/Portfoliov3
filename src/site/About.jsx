import { profile, skills, stats } from "../content";
import { Reveal, RiseText, SectionLabel } from "./motion";

function Marquee() {
  const items = skills.map((s) => s.label);
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-line py-6" aria-hidden="true">
      <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
        {row.map((label, i) => (
          <span key={i} className={`font-display text-5xl md:text-7xl ${i % 2 ? "outline-text italic" : "text-paper"}`}>
            {label}
            <span className="ml-10 text-signal">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="py-24 md:py-36">
      <Marquee />
      <div className="wrap mt-24 md:mt-36">
        <SectionLabel index="01">About</SectionLabel>
        <div className="mt-10 grid gap-12 md:grid-cols-12">
          <h2 className="font-display text-4xl leading-[1.05] tracking-tight md:col-span-8 md:text-6xl lg:text-7xl">
            <RiseText text="I build the parts of a product people actually touch, and the systems that keep them fast, correct and safe." />
          </h2>
          <Reveal className="md:col-span-4 md:pt-3" delay={0.2}>
            <p className="text-lg leading-relaxed text-paper/75">{profile.summary}</p>
          </Reveal>
        </div>
        <dl className="mt-20 grid grid-cols-2 border-t border-line md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="border-b border-line py-8 pr-6 md:border-b-0 md:border-r md:pl-6 md:first:pl-0 md:last:border-r-0">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block font-display text-7xl leading-none md:text-8xl">{s.value}</span>
                <span className="mt-3 block text-sm text-mute">{s.label}</span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
