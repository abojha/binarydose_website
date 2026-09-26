import React from 'react';
// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';
import YouTubeEmbed from '@site/src/components/YouTubeEmbed';
import GiscusComments from '@site/src/components/GiscusComments';
import TopicTracker from '@site/src/components/TopicTracker';
import CoreDoseTOC from '@site/src/components/CoreDose/CoreDoseTOC';
import CoreDoseLessonHeader from '@site/src/components/CoreDose/CoreDoseLessonHeader';
import CoreDoseNav from '@site/src/components/CoreDose/CoreDoseNav';

function ResponsiveTable(props) {
  return (
    <div className="table-responsive-wrapper">
      <table {...props} />
    </div>
  );
}

export default {
  // Re-use the default mapping
  ...MDXComponents,
  table: ResponsiveTable,
  // Map custom components
  YouTubeEmbed,
  GiscusComments,
  TopicTracker,
  CoreDoseTOC,
  CoreDoseLessonHeader,
  CoreDoseNav,
};
