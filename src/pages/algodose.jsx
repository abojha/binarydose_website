import React from "react";
import Layout from "@theme/Layout";
import AlgoDoseShell from "@site/src/components/AlgoDose/AlgoDoseShell";

export default function AlgoDosePage() {
  return (
    <Layout
      title="AlgoDose – Interactive Algorithm Visualizer Lab"
      description="Gain crystal-clear visual intuition for core Computer Science algorithms with AlgoDose. Step through executions, watch pointers move in real-time, and synchronize line-by-line code logic."
    >
      <AlgoDoseShell />
    </Layout>
  );
}
