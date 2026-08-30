import React, { useState, useMemo } from "react";
import Link from "@docusaurus/Link";
import "./InterviewHub.css";

// Load frontmatter from all markdown files in 100-days via Webpack require.context
// Automatically discovers day-01, day-02, day-03, etc.
function loadInterviewDocs() {
  try {
    const context = require.context("@site/100-days", false, /\.mdx?$/);
    return context.keys()
      .filter((key) => !/^\.\/index\./i.test(key))
      .map((key) => {
        const mod = context(key);
        const frontMatter = mod.frontMatter || {};
        const filename = key.replace(/^\.\//, "").replace(/\.mdx?$/, "");
        
        const dayMatch = filename.match(/day[_-]?(\d+)/i);
        const day = frontMatter.day || (dayMatch ? parseInt(dayMatch[1], 10) : 0);

        return {
          id: filename,
          path: `/100-days/${filename}`,
          title: frontMatter.title || filename.replace(/-/g, " "),
          day,
          category: frontMatter.category || "Core CS",
          tags: frontMatter.tags || [],
          youtubeId: frontMatter.youtubeId || null,
        };
      })
      .sort((a, b) => a.day - b.day);
  } catch (e) {
    console.error("Failed to load interview docs via context", e);
    return [];
  }
}

export default function InterviewHub() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const docs = useMemo(() => loadInterviewDocs(), []);

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
        doc.category.toLowerCase().includes(search) ||
        doc.tags.some((t) => t.toLowerCase().includes(search)) ||
        `day ${doc.day}`.includes(search) ||
        `day-${doc.day}`.includes(search) ||
        `#${doc.day}`.includes(search);

      return matchesCat && matchesSearch;
    });
  }, [docs, activeCategory, searchTerm]);

  return (
    <div className="hubContainer">
      <div className="hubHeader">
        <div className="hubBadge">
          <span>🔥</span> Daily YouTube Shorts & Deep Dives
        </div>
        <h1 className="hubTitle">100 Days of Interview Questions</h1>
        <p className="hubSubtitle">
          High-yield Computer Science, Operating Systems, System Design, and Concurrency questions explained intuitively with visual notes and code.
        </p>
      </div>

      {/* Search & Category Filters */}
      <div className="controlsWrapper">
        <input
          type="text"
          className="searchInput"
          placeholder="🔍 Search questions by topic, keyword, or Day number (e.g. 'TCP', 'Mutex', '#1')..."
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

      {/* Ultra-Clean Minimalist Question List */}
      {filteredDocs.length > 0 ? (
        <div className="questionList">
          {filteredDocs.map((doc) => {
            const formattedDay = doc.day > 0 ? (doc.day < 10 ? `#0${doc.day}` : `#${doc.day}`) : "#";
            return (
              <Link key={doc.id} to={doc.path} className="questionItem">
                <div className="itemLeft">
                  <span className="dayNumber">{formattedDay}</span>
                  <span className="itemTitle">{doc.title}</span>
                </div>

                <div className="itemRight">
                  <span className="categoryPill">{doc.category}</span>
                  <span className="arrowIcon">&rarr;</span>
                </div>
              </Link>
            );
          })}
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
