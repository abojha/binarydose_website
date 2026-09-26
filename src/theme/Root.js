import React from "react";
import ReadingProgressBar from "@site/src/components/Navigation/ReadingProgressBar";
import ScrollToTopButton from "@site/src/components/Navigation/ScrollToTopButton";

export default function Root({ children }) {
  return (
    <>
      <ReadingProgressBar />
      {children}
      <ScrollToTopButton />
    </>
  );
}
