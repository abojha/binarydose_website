import React, { useEffect, useState } from "react";
import styles from "./ReadingProgressBar.module.css";

export default function ReadingProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight =
            document.documentElement.scrollHeight - window.innerHeight;
          if (totalHeight > 100) {
            const currentScroll = window.scrollY;
            const progress = Math.min(100, Math.max(0, (currentScroll / totalHeight) * 100));
            setScrollProgress(progress);
            setIsVisible(currentScroll > 50);
          } else {
            setIsVisible(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={styles.progressContainer}
      role="progressbar"
      aria-valuenow={Math.round(scrollProgress)}
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <div
        className={styles.progressBar}
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
      />
    </div>
  );
}
