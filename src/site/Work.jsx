import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { whalor } from "../content";
import { Reveal, RiseText, SectionLabel } from "./motion";

function Phone({ src, alt, style, kind = "phone", className = "" }) {
  const card = kind === "card";
  return (
    <motion.figure style={style} className={`relative shrink-0 ${card ? "w-[52%] max-w-[340px]" : "w-[44%] max-w-[260px]"} ${className}`}>
      <div className={`overflow-hidden border border-white/10 bg-black shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] ${card ? "rounded-[1.6rem]" : "rounded-[2.2rem] p-1.5"}`}>
        <img src={src} alt={alt} loading="lazy" className={`block w-full ${card ? "" : "rounded-[1.8rem]"}`} />
      </div>
    </motion.figure>
  );
}

export default function Work() {
  const stage = useRef(null);
  const { scrollYProgress } = useScroll({ target: stage, offset: ["start end", "end start"] });
  const webY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const phoneA = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);
  const phoneB = useTransform(scrollYProgress, [0, 1], ["24%", "-22%"]);
  const [web, ...phones] = whalor.shots;

  return (
    <section id="work" className="py-24 md:py-36">
      <div className="wrap">
        <SectionLabel index="02">Selected work</SectionLabel>

        <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-[clamp(5rem,16vw,15rem)] leading-[0.85] tracking-[-0.03em]">
            <RiseText text="Whalor" />
          </h2>
          <Reveal className="max-w-sm pb-4">
            <p className="eyebrow mb-3">{whalor.year} · {whalor.role}</p>
            <p className="text-xl text-paper">{whalor.tagline}</p>
          </Reveal>
        </div>

        <div ref={stage} className="relative mt-16 md:mt-24">
          <motion.a
            href={whalor.url}
            target="_blank"
            rel="noreferrer"
            data-cursor="Visit"
            style={{ y: webY }}
            className="group block overflow-hidden rounded-2xl border border-line bg-coal"
          >
            <div className="flex items-center gap-2 border-b border-line px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="ml-4 font-mono text-xs text-mute">whalor.app</span>
            </div>
            <img src={web.src} alt={web.alt} loading="lazy" className="block w-full transition-transform duration-[1.2s] ease-out group-hover:scale-[1.02]" />
          </motion.a>
          <div className="pointer-events-none relative -mt-[18%] flex justify-end gap-4 pr-2 md:-mt-[22%] md:gap-8 md:pr-10">
            {phones.map((shot, i) => (
              <Phone key={shot.src} src={shot.src} alt={shot.alt} kind={shot.kind} style={{ y: i ? phoneB : phoneA }} className={i ? "hidden sm:block self-end" : ""} />
            ))}
          </div>
        </div>

        <dl className="mt-24 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:mt-44 md:grid-cols-3 lg:grid-cols-6">
          {whalor.metrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.05} className="bg-ink p-5">
              <dt className="sr-only">{m.label}</dt>
              <dd>
                <span className="block font-display text-5xl leading-none">{m.value}</span>
                <span className="mt-2 block text-xs text-mute">{m.label}</span>
              </dd>
            </Reveal>
          ))}
        </dl>

        <div className="mt-20 grid gap-12 md:mt-28 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <p className="text-2xl leading-snug text-paper md:text-3xl">{whalor.intro}</p>
            <ul className="mt-8 flex flex-wrap gap-2" aria-label="Tech stack">
              {whalor.stack.map((t) => (
                <li key={t} className="rounded-full border border-line px-3 py-1 font-mono text-xs text-paper/80">{t}</li>
              ))}
            </ul>
            <a href={whalor.url} target="_blank" rel="noreferrer" className="mt-10 inline-flex items-center gap-3 text-lg">
              <span className="underline decoration-signal underline-offset-8">Visit whalor.app</span>
              <span aria-hidden="true">↗</span>
            </a>
          </Reveal>
          <ol className="md:col-span-6 md:col-start-7">
            {whalor.highlights.map((h, i) => (
              <Reveal as="li" key={h.title} delay={i * 0.06} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-line py-7">
                <span className="font-mono text-xs text-signal">0{i + 1}</span>
                <div>
                  <h3 className="font-display text-3xl leading-tight">{h.title}</h3>
                  <p className="mt-2 text-paper/70">{h.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
