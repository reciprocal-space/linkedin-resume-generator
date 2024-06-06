import React from 'react';
import {
  Text,
  Font,
  Page,
  View,
  Image,
  Document,
  StyleSheet,
} from '@react-pdf/renderer';

import Header from './Header';
import Education from './Education';
import Experience from './Experience';
import { PageSize, ScrapedResult, WorkExperience, WorkExperienceProps } from '@/app/types';

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    '@media max-width: 400': {
      flexDirection: 'column',
    },
  },
  image: {
    marginBottom: 10,
  },
  leftColumn: {
    flexDirection: 'column',
    width: 170,
    paddingTop: 30,
    paddingRight: 15,
    '@media max-width: 400': {
      width: '100%',
      paddingRight: 0,
    },
    '@media orientation: landscape': {
      width: 200,
    },
  },
  footer: {
    fontSize: 12,
    fontFamily: 'Lato Bold',
    textAlign: 'center',
    marginTop: 15,
    paddingTop: 5,
    borderWidth: 3,
    borderColor: 'gray',
    borderStyle: 'dashed',
    '@media orientation: landscape': {
      marginTop: 10,
    },
  },
});

Font.register({
  family: 'Open Sans',
  src: `https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0e.ttf`,
});

Font.register({
  family: 'Lato',
  src: `https://fonts.gstatic.com/s/lato/v16/S6uyw4BMUTPHjx4wWw.ttf`,
});

Font.register({
  family: 'Lato Italic',
  src: `https://fonts.gstatic.com/s/lato/v16/S6u8w4BMUTPHjxsAXC-v.ttf`,
});

Font.register({
  family: 'Lato Bold',
  src: `https://fonts.gstatic.com/s/lato/v16/S6u9w4BMUTPHh6UVSwiPHA.ttf`,
});

const Resume: React.FC<{size: PageSize , data: ScrapedResult }> = (props) => {
  const { info, education, experience } = props.data;
  console.log({experience})

  const positions = experience.reduce((positionsResult: WorkExperienceProps[], experience: WorkExperience) => {
    const _positions: WorkExperienceProps[] = experience.positions.map((position => ({ company: experience.company, ...position } )))
    return positionsResult.concat(_positions)
  }, []);

  return(
    <Page {...props} style={styles.page}>
      <Header name={info.name} />
      <View style={styles.container}>
        <View style={styles.leftColumn}>
          <Image
            src={info.profilePictureLink}
            style={styles.image}
          />
          <Education education={education} />
        </View>
        <Experience positions={positions}/>
      </View>
      <Text style={styles.footer}>This IS the candidate you are looking for</Text>
    </Page>
  );
};

const App: React.FC<{ data: ScrapedResult }> = (props) => (
  <Document
    author="Luke Skywalker"
    keywords="awesome, resume, start wars"
    subject="The resume of Luke Skywalker"
    title="Resume"
  >
    <Resume size="A4" {...props} />
  </Document>
);

export default App;