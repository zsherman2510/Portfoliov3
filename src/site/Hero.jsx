import { useEffect, useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { profile } from "../content";
import { ease } from "./motion";

function PhoenixClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const time = now.toLocaleTimeString("en-US", { timeZone: "America/Phoenix", hour: "2-digit", minute: "2-digit", second: "2-digit" });
  return <span className="tabular-nums">{time} MST</span>;
}

function Line({ children, delay, className = "" }) {
  const reduce = useReducedMotion();
  return (
    <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
      <motion.span
        className={`block ${className}`}
        initial={reduce ? false : { y: "105%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.2, ease, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const mx = useMotionValue(50);
  const my = useMotionValue(40);
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${mx}% ${my}%, rgba(62,230,160,0.13), transparent 60%)`;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const lift = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  };

  return (
    <section id="top" ref={ref} onPointerMove={onMove} className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-10 pt-28">
      <motion.div aria-hidden="true" className="absolute inset-0" style={{ background: spotlight }} />
      <motion.div className="wrap relative" style={{ y: lift, opacity: fade }}>
        <div className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-2">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-xs text-paper/80">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
            </span>
            Open to senior full-stack roles
          </motion.span>
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="eyebrow">
            {profile.location} · <PhoenixClock />
          </motion.span>
        </div>

        <h1 className="font-display leading-[0.84] tracking-[-0.035em] text-[clamp(4.2rem,17vw,17rem)]">
          <Line delay={0.15}>{profile.first}</Line>
          <Line delay={0.3} className="pl-[12vw] italic">
            {profile.last}
            <span className="text-signal">.</span>
          </Line>
        </h1>

        <div className="mt-10 grid gap-8 border-t border-line pt-6 md:grid-cols-12">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.9, ease }} className="text-xl leading-snug text-paper md:col-span-6 md:text-2xl">
            Senior software engineer, full stack &amp; AI. Seven years shipping fintech, healthcare and SaaS products at{" "}
            <span className="italic font-display text-[1.15em]">American Express</span>, Tango and B2Gnow, and the founder of{" "}
            <a href="#work" className="underline decoration-signal decoration-1 underline-offset-4">Whalor</a>.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="flex flex-wrap items-end gap-3 md:col-span-6 md:justify-end">
            <a href={`mailto:${profile.email}`} className="rounded-full bg-paper px-6 py-3 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5">
              Get in touch
            </a>
            <a href={profile.resumePdf} target="_blank" rel="noreferrer" className="rounded-full border border-line px-6 py-3 text-sm text-paper transition-colors hover:border-paper">
              Résumé PDF ↗
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
