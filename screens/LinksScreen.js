import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default function LinksScreen({ navigation }) {
  React.useEffect(() => {
    navigation.setParams({ query: undefined });
  }, []);
  return (
    <ScrollView style={{ flex: 1 }}>
      {/**
       * Go ahead and delete ExpoLinksView and replace it with your content;
       * we just wanted to provide you with some helpful links.
       */}
      <ExpoLinksView />
    </ScrollView>
  );
}
