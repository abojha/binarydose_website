import React from "react";
import { useAllDocsData } from "@docusaurus/plugin-content-docs/client";
import Link from "@docusaurus/Link";
import "./autoIndex.css";



/**
 * Generic auto indexer for docs based on folder structure
 *
 * Props:
 * - docsPluginId: string  (e.g. "coding")
 * - basePath: string      (e.g. "/coding/arrays/")
 * - indexDocId: string    (e.g. "arrays/index")
 */
export default function AutoIndex({
  docsPluginId,
  basePath,
  indexDocId,
}) {
  const allDocsData = useAllDocsData();

  if (!allDocsData?.[docsPluginId]?.versions?.length) {
    return <p>Loading...</p>;
  }

  const docs = allDocsData[docsPluginId].versions[0].docs;

  // Filter docs under the basePath, excluding index.mdx itself
  const scopedDocs = docs.filter(
    (doc) =>
      doc.path.startsWith(basePath) &&
      doc.id !== indexDocId
  );

  // Group by first folder after basePath
  const groups = {};

  scopedDocs.forEach((doc) => {
    const relativePath = doc.path.replace(basePath, "");
    const parts = relativePath.split("/");

    const groupName = parts.length > 1 ? parts[0] : "";

    if (!groups[groupName]) {
      groups[groupName] = [];
    }

    groups[groupName].push(doc);
  });

  // Sort groups alphabetically (easy, hard, medium → easy, hard, medium)
  const sortedGroups = Object.entries(groups).sort(([a], [b]) =>
    a.localeCompare(b)
  );

  return (
    <>
  {sortedGroups.map(([group, docs]) => (
    <section key={group} className="auto-index-section">
      <h2 className="auto-index-heading">
        {formatLabel(group)}
      </h2>

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
    </section>
  ))}
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
