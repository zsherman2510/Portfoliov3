import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { profile } from "../content";

const links = [
  { href: "#work", label: "Work" },
  { href: "#resume", label: "Résumé" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div className="h-px origin-left bg-signal" style={{ scaleX: progress }} />
      <nav className="wrap flex items-center justify-between py-5 mix-blend-difference" aria-label="Main">
        <a href="#top" className="font-display text-2xl leading-none tracking-tight text-paper">
          Z<span className="italic">S</span>
          <span className="sr-only">{profile.name}, back to top</span>
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="group relative text-sm text-paper">
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-paper transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>
        <a href={profile.resumePdf} target="_blank" rel="noreferrer" className="hidden rounded-full border border-paper/40 px-4 py-2 text-sm text-paper transition-colors hover:bg-paper hover:text-ink md:inline-block">
          Résumé PDF ↗
        </a>
        <button type="button" className="text-sm text-paper md:hidden" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((v) => !v)}>
          {open ? "Close" : "Menu"}
        </button>
      </nav>
      {open ? (
        <div id="mobile-menu" className="fixed inset-0 top-[61px] z-40 flex flex-col justify-between bg-ink px-5 pb-10 pt-8 md:hidden">
          <ul className="space-y-2">
            {links.map((l, i) => (
              <motion.li key={l.href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <a href={l.href} onClick={() => setOpen(false)} className="font-display text-6xl leading-tight">
                  {l.label}
                </a>
              </motion.li>
            ))}
          </ul>
          <a href={profile.resumePdf} target="_blank" rel="noreferrer" className="eyebrow text-paper">
            Download résumé (PDF) ↗
          </a>
        </div>
      ) : null}
    </header>
  );
}
