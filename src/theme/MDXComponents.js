import React from 'react';
// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';
import YouTubeEmbed from '@site/src/components/YouTubeEmbed';
import GiscusComments from '@site/src/components/GiscusComments';
import TopicTracker from '@site/src/components/TopicTracker';
import CoreDoseTOC from '@site/src/components/CoreDose/CoreDoseTOC';
import CoreDoseLessonHeader from '@site/src/components/CoreDose/CoreDoseLessonHeader';
import CoreDoseNav from '@site/src/components/CoreDose/CoreDoseNav';
import HeroHeader from '@site/src/components/Common/HeroHeader';
import BackNav from '@site/src/components/Common/BackNav';
import StatsRibbon from '@site/src/components/Common/StatsRibbon';
import {
  ArchitectureStack,
  SubsystemGrid,
  ConceptComparison,
  DualModeDiagram,
  ProcessFlow,
  FlowPipeline,
  ExecutionBlueprint,
  CurriculumRoadmap,
  CourseCurriculum,
  StateTransitionDiagram,
  FlowGraph,
  FlowDiagram,
  ProcessMemoryMap,
  GanttChart,
  DiskSchedulingChart,
  ProtocolLadder,
  ContentionTimeline,
  FrameFormat,
  PacketHeaderGrid,
} from '@site/src/components/Diagrams';


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
  HeroHeader,
  BackNav,
  StatsRibbon,
  // Educational Diagram System (Globally available in all MDX files)
  ArchitectureStack,
  SubsystemGrid,
  ConceptComparison,
  DualModeDiagram,
  ProcessFlow,
  FlowPipeline,
  ExecutionBlueprint,
  CurriculumRoadmap,
  CourseCurriculum,
  StateTransitionDiagram,
  FlowGraph,
  FlowDiagram,
  ProcessMemoryMap,
  GanttChart,
  DiskSchedulingChart,
  ProtocolLadder,
  ContentionTimeline,
  FrameFormat,
  PacketHeaderGrid,
};

