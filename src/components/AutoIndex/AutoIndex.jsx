import React, { useState } from "react";
import { useAllDocsData } from "@docusaurus/plugin-content-docs/client";
import Link from "@docusaurus/Link";
import "./AutoIndex.css";

export default function AutoIndex({ docsPluginId, basePath, indexDocId }) {
  const allDocsData = useAllDocsData();
  const [openGroups, setOpenGroups] = useState({});

  // Loading guard
  if (!allDocsData?.[docsPluginId]?.versions?.length) {
    return <p>Loading...</p>;
  }

  const docs = allDocsData[docsPluginId].versions[0].docs;

  // Scope docs to current path
  const scopedDocs = docs.filter(
    (doc) => doc.path.startsWith(basePath) && doc.id !== indexDocId
  );

  // -------- GROUPING --------
  const groups = {};

  scopedDocs.forEach((doc) => {
    const relativePath = doc.path.replace(basePath, "");
    const parts = relativePath.split("/");

    // If no subfolder → flat structure
    const groupName = parts.length > 1 ? parts[0] : "";

    if (!groups[groupName]) {
      groups[groupName] = [];
    }
    groups[groupName].push(doc);
  });

  // -------- FLAT STRUCTURE DETECTION --------
  const groupKeys = Object.keys(groups);
  const isFlatStructure =
    groupKeys.length === 1 && groupKeys[0] === "";

  // -------- SORTING LOGIC --------
  const DIFFICULTY_ORDER = ["easy", "med", "hard"];

  const sortedGroups = Object.entries(groups).sort(([a], [b]) => {
    const aKey = a.toLowerCase();
    const bKey = b.toLowerCase();

    const aIndex = DIFFICULTY_ORDER.indexOf(aKey);
    const bIndex = DIFFICULTY_ORDER.indexOf(bKey);

    // Both are known difficulties
    if (aIndex !== -1 && bIndex !== -1) {
      return aIndex - bIndex;
    }

    // One is difficulty
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;

    // Alphabetical fallback
    return aKey.localeCompare(bKey);
  });

  // -------- TOGGLE HANDLER --------
  const toggleGroup = (group) => {
    setOpenGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }));
  };

  // ==============================
  // 🔹 CASE 1: FLAT STRUCTURE
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
  // 🔹 CASE 2: NESTED STRUCTURE
  // ==============================
  return (
    <>
      {sortedGroups.map(([group, docs]) => {
        const isOpen = openGroups[group];

        return (
          <section key={group} className="auto-index-section">
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
