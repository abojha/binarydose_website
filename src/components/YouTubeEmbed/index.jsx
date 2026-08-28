import React from "react";
import styles from "./styles.module.css";

export default function YouTubeEmbed({ id, title = "YouTube video player", caption }) {
  if (!id) return null;

  return (
    <div className={styles.videoWrapper}>
      <div className={styles.responsiveIframeContainer}>
        <iframe
          className={styles.iframe}
          src={`https://www.youtube-nocookie.com/embed/${id}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>
      {caption && <p className={styles.caption}>{caption}</p>}
    </div>
  );
}
