import React from "react";
import Layout from "@theme/Layout";
import DevDoseHub from "@site/src/components/DevDose/DevDoseHub";

export default function DevDosePage() {
  return (
    <Layout
      title="DevDose – Software Engineering, System Design & Modern Tech"
      description="Production-ready language guides, system design blueprints, and high-yield interview frameworks for software engineers."
    >
      <main>
        <DevDoseHub />
      </main>
    </Layout>
  );
}
