import React, { useEffect, useRef } from "react";
import { useColorMode } from "@docusaurus/theme-common";

export default function GiscusComments({
  repo = "abojha/binarydose_website",
  repoId = "R_kgDONXXXXXXXX", // Configurable
  category = "General",
  categoryId = "DIC_kwDONXXXXXXXX", // Configurable
  mapping = "pathname",
  term = "",
  strict = "0",
  reactionsEnabled = "1",
  emitMetadata = "0",
  inputPosition = "top",
  lang = "en",
}) {
  const { colorMode } = useColorMode();
  const commentsRef = useRef(null);

  useEffect(() => {
    const theme = colorMode === "dark" ? "dark_dimmed" : "light";

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
    script.setAttribute("data-theme", theme);
    script.setAttribute("data-lang", lang);
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;

    if (commentsRef.current) {
      commentsRef.current.appendChild(script);
    }
  }, [colorMode, repo, repoId, category, categoryId, mapping, term]);

  return (
    <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid var(--ifm-color-emphasis-200)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
        <span style={{ fontSize: "1.3rem" }}>💬</span>
        <h3 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 700 }}>
          Discussion & Doubts
        </h3>
      </div>
      <div ref={commentsRef} id="giscus-comments-container" />
    </div>
  );
}
