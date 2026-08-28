import React from 'react';
// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';
import YouTubeEmbed from '@site/src/components/YouTubeEmbed';
import GiscusComments from '@site/src/components/GiscusComments';
import TopicTracker from '@site/src/components/TopicTracker';

export default {
  // Re-use the default mapping
  ...MDXComponents,
  // Map custom components
  YouTubeEmbed,
  GiscusComments,
  TopicTracker,
};
