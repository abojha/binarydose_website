import React from 'react';
import Footer from '@theme-original/DocItem/Footer';
import GiscusComments from '@site/src/components/GiscusComments';
import DocSeriesNav from '@site/src/components/Navigation/DocSeriesNav';
import { useDoc } from '@docusaurus/plugin-content-docs/client';

export default function FooterWrapper(props) {
  let permalink = '';
  try {
    const { metadata } = useDoc();
    permalink = metadata?.permalink || '';
  } catch (e) {
    // Graceful fallback if rendered outside doc context
  }

  return (
    <>
      <DocSeriesNav permalink={permalink} />
      <Footer {...props} />
      <GiscusComments />
    </>
  );
}
