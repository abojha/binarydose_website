import React, { useEffect, useRef } from "react";
import { useColorMode } from "@docusaurus/theme-common";

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

  // Directly check the document attribute to ensure accurate dark/light state from initial mount
  const getGiscusTheme = () => {
    if (typeof document !== "undefined") {
      const docTheme = document.documentElement.getAttribute("data-theme");
      if (docTheme === "dark") return "dark";
      if (docTheme === "light") return "light";
    }
    return colorMode === "dark" ? "dark" : "light";
  };

  useEffect(() => {
    const currentTheme = getGiscusTheme();

    // Clear previous giscus iframe if any
    if (commentsRef.current) {
      commentsRef.current.innerHTML = "";
    }

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
    script.setAttribute("data-theme", currentTheme);
    script.setAttribute("data-lang", lang);
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;

    if (commentsRef.current) {
      commentsRef.current.appendChild(script);
    }
  }, [
    colorMode,
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

  // Synchronize theme dynamically if user toggles colorMode
  useEffect(() => {
    const currentTheme = getGiscusTheme();
    const iframe = commentsRef.current?.querySelector("iframe.giscus-frame");
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(
        { giscus: { setConfig: { theme: currentTheme } } },
        "https://giscus.app"
      );
    }
  }, [colorMode]);

  // Re-verify theme when Giscus iframe completes its handshake
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== "https://giscus.app") return;
      if (typeof event.data !== "object" || !event.data.giscus) return;
      const currentTheme = getGiscusTheme();
      const iframe = commentsRef.current?.querySelector("iframe.giscus-frame");
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage(
          { giscus: { setConfig: { theme: currentTheme } } },
          "https://giscus.app"
        );
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div
      style={{
        marginTop: "3.5rem",
        paddingTop: "2rem",
        borderTop: "1px solid var(--ifm-color-emphasis-200)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
          marginBottom: "1.5rem",
        }}
      >
        <span style={{ fontSize: "1.3rem" }}>💬</span>
        <h3
          style={{
            margin: 0,
            fontSize: "1.25rem",
            fontWeight: 700,
            fontFamily: "var(--ifm-font-family-heading)",
          }}
        >
          Discussion & Doubts
        </h3>
      </div>
      <div ref={commentsRef} id="giscus-comments-container" />
    </div>
  );
}
