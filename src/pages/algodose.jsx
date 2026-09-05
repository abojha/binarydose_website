import React from "react";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import AlgoDoseShell from "@site/src/components/AlgoDose/AlgoDoseShell";

export default function AlgoDosePage() {
  const pageTitle = "AlgoDose – Interactive Algorithm Visualizer Lab";
  const pageDescription =
    "Gain crystal-clear visual intuition for core Computer Science algorithms with AlgoDose. Step through executions, watch pointers move in real-time, and synchronize line-by-line code logic.";

  return (
    <Layout title={pageTitle} description={pageDescription}>
      <Head>
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
      </Head>
      <AlgoDoseShell />
    </Layout>
  );
}
