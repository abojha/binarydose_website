import React, { useState, useMemo } from "react";
import { useAllDocsData } from "@docusaurus/plugin-content-docs/client";
import Link from "@docusaurus/Link";
import "./InterviewHub.css";

export default function InterviewHub({ docsPluginId = "interview", basePath = "/100-days" }) {
  const allDocsData = useAllDocsData();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const docs = useMemo(() => {
    if (!allDocsData?.[docsPluginId]?.versions?.length) {
      return [];
    }

    const rawDocs = allDocsData[docsPluginId].versions[0].docs;

    // Filter out root index
    return rawDocs
      .filter((doc) => doc.path !== basePath && doc.path !== `${basePath}/`)
      .map((doc) => {
        // Extract Day number from path/id or frontmatter
        const id = doc.id;
        const dayMatch = id.match(/day[_-]?(\d+)/i) || doc.path.match(/day[_-]?(\d+)/i);
        const day = doc.frontMatter?.day || (dayMatch ? parseInt(dayMatch[1], 10) : 0);

        const category = doc.frontMatter?.category || "Core CS";
        const summary = doc.frontMatter?.summary || doc.description || "Read full interview explanation, code, and diagrams.";
        const tags = doc.frontMatter?.tags || [];

        return {
          id: doc.id,
          path: doc.path,
          title: doc.title,
          day,
          category,
          summary,
          tags,
          youtubeId: doc.frontMatter?.youtubeId || null,
        };
      })
      .sort((a, b) => a.day - b.day);
  }, [allDocsData, docsPluginId, basePath]);

  // Extract unique categories & counts
  const categories = useMemo(() => {
    const counts = { All: docs.length };
    docs.forEach((doc) => {
      counts[doc.category] = (counts[doc.category] || 0) + 1;
    });
    return counts;
  }, [docs]);

  // Filtered docs based on search and category
  const filteredDocs = useMemo(() => {
    return docs.filter((doc) => {
      const matchesCat = activeCategory === "All" || doc.category === activeCategory;
      const search = searchTerm.toLowerCase();
      const matchesSearch =
        !search ||
        doc.title.toLowerCase().includes(search) ||
        doc.summary.toLowerCase().includes(search) ||
        doc.category.toLowerCase().includes(search) ||
        doc.tags.some((t) => t.toLowerCase().includes(search)) ||
        `day ${doc.day}`.includes(search) ||
        `day-${doc.day}`.includes(search);

      return matchesCat && matchesSearch;
    });
  }, [docs, activeCategory, searchTerm]);

  if (!docs.length && (!allDocsData?.[docsPluginId]?.versions?.length)) {
    return (
      <div className="hubContainer">
        <p>Loading 100 Days Interview Hub...</p>
      </div>
    );
  }

  return (
    <div className="hubContainer">
      <div className="hubHeader">
        <div className="hubBadge">
          <span>🔥</span> Daily YouTube Shorts & Deep Dives
        </div>
        <h1 className="hubTitle">100 Days of Interview Questions</h1>
        <p className="hubSubtitle">
          Master Computer Science, Operating Systems, System Design, and Concurrency with bite-sized video shorts, visual memory diagrams, and interview-ready notes.
        </p>
      </div>

      {/* Search & Category Filters */}
      <div className="controlsWrapper">
        <input
          type="text"
          className="searchInput"
          placeholder="🔍 Search questions by topic, keyword, or Day number (e.g. 'Mutex', 'Cache', 'Day 14')..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="filterPills">
          {Object.entries(categories).map(([cat, count]) => (
            <button
              key={cat}
              className={`filterBtn ${activeCategory === cat ? "filterBtnActive" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat} ({count})
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      {filteredDocs.length > 0 ? (
        <div className="cardsGrid">
          {filteredDocs.map((doc) => (
            <Link key={doc.id} to={doc.path} className="questionCard">
              <div className="cardHeader">
                <span className="dayBadge">Day {doc.day || "#"}</span>
                <span className="categoryTag">{doc.category}</span>
              </div>
              <h3 className="cardTitle">{doc.title}</h3>
              <p className="cardSummary">{doc.summary}</p>
              <div className="cardFooter">
                <span>{doc.youtubeId ? "▶ Video & Notes" : "📖 Read Notes"}</span>
                <span>&rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="emptyState">
          <h3>No matching questions found</h3>
          <p>Try searching for a different keyword or resetting your category filter.</p>
        </div>
      )}
    </div>
  );
}
