import React from "react";
import Layout from "@theme/Layout";
import CoreDoseHub from "@site/src/components/CoreDose/CoreDoseHub";

export default function CoreDosePage() {
  return (
    <Layout
      title="CoreDose – Core Computer Science Hub"
      description="Master Computer Science subjects (DBMS, Operating Systems, Computer Networks, and OOPs) with textbook notes, architecture diagrams, and curated video lectures."
    >
      <main>
        <CoreDoseHub />
      </main>
    </Layout>
  );
}
