import React, { useState, useEffect, useRef } from "react";
import styles from "./StatsRibbon.module.css";

/**
 * Parses numeric strings like "391+", "64+", "99", "100%"
 */
function parseNumber(raw) {
  if (typeof raw === "number") {
    return { value: raw, prefix: "", suffix: "" };
  }
  const str = String(raw).trim();
  const match = str.match(/^([^\d]*)(\d+)([^\d]*)$/);
  if (!match) {
    return { value: null, raw: str };
  }
  return {
    prefix: match[1] || "",
    value: parseInt(match[2], 10),
    suffix: match[3] || "",
  };
}

/**
 * Smooth 60fps/120fps easeOutExpo counter animation.
 * Respects prefers-reduced-motion, SSR safe, and activates via IntersectionObserver.
 */
function AnimatedNumber({ target }) {
  const parsed = parseNumber(target);
  // Initial SSR / hydration state matches final value for SEO and zero flash
  const [displayVal, setDisplayVal] = useState(parsed.value ?? target);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (parsed.value === null) return;

    // Respect accessibility settings
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      setDisplayVal(parsed.value);
      return;
    }

    const element = ref.current;
    if (!element) return;

    // Trigger smooth count-up once in view
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1200; // ms
          const startTime = performance.now();
          const targetNum = parsed.value;

          const tick = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Smooth easeOutExpo curve: fast initial acceleration, graceful landing
            const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const current = Math.round(targetNum * ease);

            setDisplayVal(current);

            if (progress < 1) {
              requestAnimationFrame(tick);
            } else {
              setDisplayVal(targetNum);
            }
          };

          setDisplayVal(0);
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [parsed.value]);

  if (parsed.value === null) {
    return (
      <span ref={ref} className={styles.statNumber}>
        {target}
      </span>
    );
  }

  return (
    <span ref={ref} className={styles.statNumber}>
      {parsed.prefix}
      {displayVal}
      {parsed.suffix}
    </span>
  );
}

/**
 * Universal Stats Ribbon Component
 * Reusable across Homepage, CoreDose, etc.
 * Features smooth count-up ticker animations and dynamic proportional width distribution.
 *
 * @param {{
 *   items: Array<{ number: string | number, label: string }>,
 *   className?: string
 * }} props
 */
export default function StatsRibbon({ items = [], className = "" }) {
  if (!items || items.length === 0) return null;

  return (
    <div className={`${styles.statsRibbon} ${className}`}>
      {items.map((item, idx) => (
        <div key={idx} className={styles.statItem}>
          <AnimatedNumber target={item.number} />
          <span className={styles.statLabel}>{item.label}</span>
        </div>
      ))}
    </div>
  );
}
