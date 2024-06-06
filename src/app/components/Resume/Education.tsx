
import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

import Title from './Title';
import { Education as EducationProps } from '@/app/types';

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  school: {
    fontFamily: 'Lato Bold',
    fontSize: 10,
  },
  degree: {
    fontFamily: 'Lato',
    fontSize: 10,
  },
  candidate: {
    fontFamily: 'Lato Italic',
    fontSize: 10,
  },
});

const Education: React.FC<{ education: EducationProps[] }> = ({ education }) => {
  return (
    <View style={styles.container}>
    <Title>Education</Title>
      {education.map((e) => (
        <div>
          <Text style={styles.school}>{e.university}</Text>
          <Text style={styles.degree}>{e.degree}, {e.years}</Text>
          <Text style={styles.candidate}>{e.description}</Text>
        </div>
      ))}
    </View>
  )
};

export default Education;
