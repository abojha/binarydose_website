import React, { useEffect, useRef, useState } from "react";
import { useColorMode } from "@docusaurus/theme-common";
import styles from "./GiscusComments.module.css";

export default function GiscusComments({
  repo = "abojha/binarydose_website",
  repoId = "R_kgDOQwuAxg",
  category = "General",
  categoryId = "DIC_kwDOQwuAxs4DEW38",
  mapping = "pathname",
  term = "",
  strict = "0",
  reactionsEnabled = "1",
  emitMetadata = "0",
  inputPosition = "bottom",
  lang = "en",
}) {
  const { colorMode } = useColorMode();
  const commentsRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showTips, setShowTips] = useState(false);

  // Use transparent_dark for seamless obsidian blend in dark mode; light in light mode
  const giscusTheme = colorMode === "dark" ? "transparent_dark" : "light";

  // Check if Giscus configuration is provided
  const isConfigured = Boolean(
    repoId &&
      categoryId &&
      !repoId.includes("XXXXXXXX") &&
      !categoryId.includes("XXXXXXXX")
  );

  // Listen for iframe initialization message from Giscus to dismiss skeleton
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== "https://giscus.app") return;
      if (typeof event.data !== "object" || !event.data.giscus) return;
      setIsLoading(false);
    };

    window.addEventListener("message", handleMessage);
    // Fallback safety timeout (1.8s) so skeleton doesn't stay if message is delayed
    const timer = setTimeout(() => setIsLoading(false), 1800);

    return () => {
      window.removeEventListener("message", handleMessage);
      clearTimeout(timer);
    };
  }, []);

  // Dynamic live theme switching via postMessage without reloading iframe
  useEffect(() => {
    if (!commentsRef.current) return;
    const iframe = commentsRef.current.querySelector("iframe.giscus-frame");
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(
        { giscus: { setConfig: { theme: giscusTheme } } },
        "https://giscus.app"
      );
    }
  }, [giscusTheme]);

  // Initial script mount
  useEffect(() => {
    if (!isConfigured || !commentsRef.current) return;

    // Clear previous elements if re-mounting
    commentsRef.current.innerHTML = "";
    setIsLoading(true);

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", repo);
    script.setAttribute("data-repo-id", repoId);
    script.setAttribute("data-category", category);
    script.setAttribute("data-category-id", categoryId);
    script.setAttribute("data-mapping", mapping);
    if (term) script.setAttribute("data-term", term);
    script.setAttribute("data-strict", strict);
    script.setAttribute("data-reactions-enabled", reactionsEnabled);
    script.setAttribute("data-emit-metadata", emitMetadata);
    script.setAttribute("data-input-position", inputPosition);
    script.setAttribute("data-theme", giscusTheme);
    script.setAttribute("data-lang", lang);
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;

    commentsRef.current.appendChild(script);
  }, [
    isConfigured,
    repo,
    repoId,
    category,
    categoryId,
    mapping,
    term,
    strict,
    reactionsEnabled,
    emitMetadata,
    inputPosition,
    lang,
  ]);

  const githubDiscussionsUrl = `https://github.com/${repo}/discussions`;

  return (
    <div className={styles.commentsCard}>
      {/* Top ambient glow accent line */}
      <div className={styles.topGlowBar} />

      <div className={styles.innerPadding}>
        {/* Header Bar */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.iconBadge} aria-hidden="true">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </div>
            <div className={styles.titleGroup}>
              <h3 className={styles.title}>Discussion & Doubts</h3>
              <p className={styles.subtitle}>
                Ask questions, explore architectural nuances, or share alternate
                approaches with the community.
              </p>
            </div>
          </div>

          <div className={styles.headerRight}>
            <div className={styles.liveBadge} title="Real-time synchronization with GitHub Discussions">
              <span className={styles.pulseDot} />
              <span>Live GitHub Sync</span>
            </div>

            <a
              href={githubDiscussionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.githubBtn}
              title="Open Binary Dose Discussions in GitHub"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>Open on GitHub ↗</span>
            </a>
          </div>
        </div>

        {/* Community guidance chips & collapsible tips toggle */}
        <div className={styles.guidanceRow}>
          <div className={styles.chipsList}>
            <span className={styles.chip}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              GitHub Auth
            </span>
            <span className={styles.chip}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
              Markdown & Code Blocks
            </span>
            <span className={styles.chip}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="4" x2="20" y2="4" />
                <line x1="4" y1="20" x2="20" y2="20" />
                <line x1="14" y1="4" x2="8" y2="20" />
              </svg>
              KaTeX Formulas
            </span>
          </div>

          <button
            type="button"
            className={styles.toggleTipsBtn}
            onClick={() => setShowTips((prev) => !prev)}
            aria-expanded={showTips}
          >
            <span>{showTips ? "Hide formatting tips" : "Formatting tips"}</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                transform: showTips ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s ease",
              }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>

        {/* Collapsible Tips Drawer */}
        {showTips && (
          <div className={styles.tipsDrawer}>
            <div className={styles.tipsGrid}>
              <div className={styles.tipItem}>
                <span className={styles.tipTitle}>💻 Code Snippets</span>
                <p className={styles.tipText}>
                  Wrap code in triple backticks with a language specifier like{" "}
                  <code className={styles.tipCode}>```cpp</code>,{" "}
                  <code className={styles.tipCode}>```verilog</code>, or{" "}
                  <code className={styles.tipCode}>```python</code>.
                </p>
              </div>

              <div className={styles.tipItem}>
                <span className={styles.tipTitle}>📐 Mathematical Notation</span>
                <p className={styles.tipText}>
                  Use standard LaTeX syntax with dollar signs:{" "}
                  <code className={styles.tipCode}>$CPI = \frac{Cycles}{IC}$</code>{" "}
                  for inline math, or double dollars for equations.
                </p>
              </div>

              <div className={styles.tipItem}>
                <span className={styles.tipTitle}>💡 Precision Doubts</span>
                <p className={styles.tipText}>
                  Reference specific clock cycles (e.g. <i>CC4</i>), register
                  names (<i>$MAR</i>, <i>$MDR</i>), or worked example numbers for
                  faster, targeted assistance.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Unconfigured Fallback Notice */}
        {!isConfigured && (
          <div className={styles.unconfiguredBox}>
            <h4 className={styles.unconfiguredTitle}>
              💬 Live Discussion Setup Required
            </h4>
            <p className={styles.unconfiguredText}>
              To activate live GitHub Discussions comments on this site, obtain your{" "}
              <code>repoId</code> and <code>categoryId</code> from{" "}
              <a
                href="https://giscus.app"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontWeight: 650 }}
              >
                giscus.app
              </a>{" "}
              and configure them in <code>src/components/GiscusComments/index.jsx</code>.
            </p>
          </div>
        )}

        {/* Skeleton Shimmer Loading Placeholder */}
        {isConfigured && isLoading && (
          <div className={styles.skeleton} aria-hidden="true">
            <div className={styles.skeletonHeader}>
              <div className={styles.skeletonAvatar} />
              <div className={styles.skeletonInput} />
            </div>
            <div className={styles.skeletonFooter}>
              <div className={styles.skeletonBtn} />
            </div>
          </div>
        )}

        {/* Giscus Iframe Target Container */}
        {isConfigured && (
          <div
            ref={commentsRef}
            id="giscus-comments-container"
            className={styles.giscusContainer}
            style={{
              opacity: isLoading ? 0 : 1,
              transition: "opacity 0.3s ease",
            }}
          />
        )}
      </div>
    </div>
  );
}
