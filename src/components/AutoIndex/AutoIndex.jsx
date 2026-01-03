import React, { useState, useRef } from "react";
import { useAllDocsData } from "@docusaurus/plugin-content-docs/client";
import Link from "@docusaurus/Link";
import { useLocation, useHistory } from "@docusaurus/router";
import "./AutoIndex.css";

export default function AutoIndex({ docsPluginId, basePath, indexDocId }) {
  const allDocsData = useAllDocsData();
  const location = useLocation();
  const history = useHistory();

  // store section refs
  const sectionRefs = useRef({});

  // ---------- LOADING ----------
  if (!allDocsData?.[docsPluginId]?.versions?.length) {
    return <p>Loading...</p>;
  }

  const docs = allDocsData[docsPluginId].versions[0].docs;

  // ---------- SCOPE ----------
  const scopedDocs = docs.filter(
    (doc) => doc.path.startsWith(basePath) && doc.id !== indexDocId
  );

  // ---------- GROUPING ----------
  const groups = {};
  scopedDocs.forEach((doc) => {
    const relativePath = doc.path.replace(basePath, "");
    const parts = relativePath.split("/");
    const groupName = parts.length > 1 ? parts[0] : "";

    if (!groups[groupName]) groups[groupName] = [];
    groups[groupName].push(doc);
  });

  const groupKeys = Object.keys(groups);
  const isFlatStructure = groupKeys.length === 1 && groupKeys[0] === "";

  // ---------- SORT ----------
  const DIFFICULTY_ORDER = ["easy", "med", "hard"];

  const sortedGroups = Object.entries(groups).sort(([a], [b]) => {
    const aIdx = DIFFICULTY_ORDER.indexOf(a.toLowerCase());
    const bIdx = DIFFICULTY_ORDER.indexOf(b.toLowerCase());

    if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
    if (aIdx !== -1) return -1;
    if (bIdx !== -1) return 1;
    return a.localeCompare(b);
  });

  // ---------- INITIAL OPEN GROUP ----------
  const params = new URLSearchParams(location.search);
  const initialOpenGroup = params.get("open");

  const [openGroup, setOpenGroup] = useState(initialOpenGroup);

  // ---------- TOGGLE HANDLER ----------
  const toggleGroup = (group) => {
    const nextGroup = openGroup === group ? null : group;
    setOpenGroup(nextGroup);

    const nextParams = new URLSearchParams(location.search);
    if (nextGroup) {
      nextParams.set("open", nextGroup);
    } else {
      nextParams.delete("open");
    }

    history.replace({
      pathname: location.pathname,
      search: nextParams.toString(),
    });

    // ✅ Scroll to SECTION (not toggle, not li)
    if (nextGroup) {
      requestAnimationFrame(() => {
        const section = sectionRefs.current[nextGroup];
        if (!section) return;

        const NAVBAR_OFFSET = 72; // adjust if your navbar height differs
        const y =
          section.getBoundingClientRect().top +
          window.pageYOffset -
          NAVBAR_OFFSET;

        window.scrollTo({
          top: y,
          behavior: "smooth",
        });
      });
    }
  };

  // ==============================
  // 🔹 FLAT STRUCTURE
  // ==============================
  if (isFlatStructure) {
    return (
      <ul className="auto-index-list">
        {groups[""]
          .sort((a, b) => a.id.localeCompare(b.id))
          .map((doc) => (
            <li key={doc.id} className="auto-index-item">
              <Link to={doc.path} className="auto-index-link">
                {formatLabel(getFileName(doc.id))}
              </Link>
            </li>
          ))}
      </ul>
    );
  }

  // ==============================
  // 🔹 NESTED STRUCTURE
  // ==============================
  return (
    <>
      {sortedGroups.map(([group, docs]) => {
        const isOpen = openGroup === group;

        return (
          <section
            key={group}
            className="auto-index-section"
            ref={(el) => (sectionRefs.current[group] = el)}
          >
            <button
              className="auto-index-toggle"
              onClick={() => toggleGroup(group)}
            >
              <span>{formatLabel(group)}</span>
              <span className="auto-index-meta">
                {docs.length} questions {isOpen ? "▲" : "▼"}
              </span>
            </button>

            {isOpen && (
              <ul className="auto-index-list">
                {docs
                  .sort((a, b) => a.id.localeCompare(b.id))
                  .map((doc) => (
                    <li key={doc.id} className="auto-index-item">
                      <Link to={doc.path} className="auto-index-link">
                        {formatLabel(getFileName(doc.id))}
                      </Link>
                    </li>
                  ))}
              </ul>
            )}
          </section>
        );
      })}
    </>
  );
}

/* ---------- helpers ---------- */

function getFileName(id) {
  return id.split("/").pop();
}

function formatLabel(text) {
  return text
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
