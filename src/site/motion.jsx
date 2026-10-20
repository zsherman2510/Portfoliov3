import { motion, useReducedMotion } from "framer-motion";

export const ease = [0.22, 1, 0.36, 1];

/** Fades and lifts children into view once. */
export function Reveal({ children, delay = 0, y = 28, className = "", as = "div" }) {
  const reduce = useReducedMotion();
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </Tag>
  );
}

/** Splits a line into words that rise out of a mask. The observer sits on the
 *  visible wrapper (the words start clipped, so they can't trigger it). */
export function RiseText({ text, className = "", delay = 0, stagger = 0.06 }) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  if (reduce) return <span className={className}>{text}</span>;
  return (
    <motion.span
      className={className}
      aria-label={text}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {words.map((word, i) => (
        <span key={i} aria-hidden="true" className="-mb-[0.14em] inline-block overflow-hidden pb-[0.22em] align-bottom">
          <motion.span
            className="inline-block"
            variants={{ hidden: { y: "110%" }, show: { y: "0%", transition: { duration: 1, ease } } }}
          >
            {word}
            {i < words.length - 1 ? "\u00a0" : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

export function SectionLabel({ index, children }) {
  return (
    <div className="flex items-center gap-4 border-t border-line pt-5">
      <span className="eyebrow text-signal">({index})</span>
      <span className="eyebrow">{children}</span>
    </div>
  );
}
