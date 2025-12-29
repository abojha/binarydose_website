import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Learn on YouTube, Revise Here',
    Svg: require('@site/static/img/video.svg').default,
    description: (
      <>
        Binary Dose is primarily a YouTube channel where Computer Science
        concepts are explained in a clear and practical way. This website
        exists to support and complement those video lessons.
      </>
    ),
  },
  {
    title: 'Computer Science, Made Simple',
    Svg: require('@site/static/img/made_simple.svg').default,
    description: (
      <>
        Operating Systems, DBMS, C++, and core CS fundamentals are broken
        down into simple explanations — focused on understanding, not rote
        memorization.
      </>
    ),
  },
  {
    title: 'Notes & Key Insights',
    Svg: require('@site/static/img/notes.svg').default,
    description: (
      <>
        Along with videos, you’ll find short written insights, revision notes,
        and important details that help reinforce concepts and prepare for
        exams and interviews.
      </>
    ),
  },
];


function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
