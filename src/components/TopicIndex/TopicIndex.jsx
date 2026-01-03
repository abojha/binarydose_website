// src/components/TopicIndex.jsx
import React from "react";
import Link from "@docusaurus/Link";
import "./TopicIndex.css";

export default function TopicIndex({ topics }) {
  return (
    <section>
      <div className="topic-grid">
        {topics.map((t) => (
          <Link key={t.path} to={t.path} className="topic-card">
            <h3>{t.label}</h3>

            {/* optional */}
            {t.desc && <p>{t.desc}</p>}

            {/* optional future */}
            {t.meta && <span className="topic-meta">{t.meta}</span>}
          </Link>
        ))}
      </div>
    </section>
  );
}
