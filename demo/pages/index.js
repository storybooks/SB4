import React from 'react';

import withDocs, { inCategory, sortByDate } from '@sb/serve/docs';

import DocListEntry from '../components/doc-list-entry';
import SBHello from '../components/sb-hello';
import Navigation from '../components/navigation';

const Index = ({ docs }) => {
  const inDocs = docs.filter(inCategory('doc')).sort(sortByDate);
  const inHome = docs.filter(inCategory('home'));

  return (
    <main style={styles.main}>
      <Navigation style={styles.navigation} />
      <SBHello />
      <section style={styles.section}>
        <h1>/doc</h1>
        <p>{inDocs.length} entries found.</p>
        {inDocs.map((doc, idx) => <DocListEntry key={`doc-${idx}`} {...doc} />)}
      </section>
      <section style={styles.section}>
        <h1>/home</h1>
        <p>{inHome.length} entries found.</p>
        {inHome.map((doc, idx) => <DocListEntry key={`home-${idx}`} {...doc} />)}
      </section>
    </main>
  );
};

export default withDocs(Index);

const styles = {
  main: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", "Fira Sans", Avenir, "Helvetica Neue", "Lucida Grande", sans-serif',
    fontWeight: 100,
    display: 'flex',
    flexDirection: 'column',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '60vw',
  },
  navigation: {
    position: 'absolute',
    alignSelf: 'center',
    width: '60vw',
  },
};