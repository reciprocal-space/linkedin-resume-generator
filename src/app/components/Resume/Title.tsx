import React, { PropsWithChildren } from 'react';
import { Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Lato Bold',
    fontSize: 14,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
});

const Title: React.FC<PropsWithChildren> = ({ children }) => <Text style={styles.title}>{children}</Text>;

export default Title;