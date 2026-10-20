import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/** A dot plus a lagging ring; the ring grows over links and buttons. Fine pointers only. */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState("");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 300, damping: 30, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 300, damping: 30, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target.closest?.("a, button, [data-cursor]");
      setHovering(Boolean(target));
      setLabel(target?.getAttribute?.("data-cursor") || "");
    };
    window.addEventListener("pointermove", move);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;
  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[70] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal"
        style={{ x, y }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[70] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-paper/40 mix-blend-difference"
        style={{ x: rx, y: ry }}
        animate={{ width: label ? 88 : hovering ? 56 : 32, height: label ? 88 : hovering ? 56 : 32, backgroundColor: label ? "rgba(236,235,230,1)" : "rgba(236,235,230,0)" }}
        transition={{ duration: 0.25 }}
      >
        {label ? <span className="font-mono text-[10px] uppercase tracking-widest text-ink">{label}</span> : null}
      </motion.div>
    </>
  );
}
