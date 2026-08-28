import React from 'react';
import Footer from '@theme-original/DocItem/Footer';
import GiscusComments from '@site/src/components/GiscusComments';

export default function FooterWrapper(props) {
  return (
    <>
      <Footer {...props} />
      <GiscusComments />
    </>
  );
}
