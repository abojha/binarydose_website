import React from "react";
import styles from "./CoreDoseVideoBanner.module.css";

export default function CoreDoseVideoBanner({ youtubeId, title = "Topic Video Lecture" }) {
  // If there is no video recorded yet, render nothing so the reading experience is 100% clean
  if (!youtubeId) {
    return null;
  }

  return (
    <div className={styles.videoWrapper}>
      <div className={styles.responsiveContainer}>
        <iframe
          className={styles.iframe}
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>
      <p className={styles.caption}>
        📺 <strong>Video Lecture</strong>: {title} •{" "}
        <a
          href="https://www.youtube.com/@binarydose"
          target="_blank"
          rel="noopener noreferrer"
        >
          Binary Dose YouTube
        </a>
      </p>
    </div>
  );
}
