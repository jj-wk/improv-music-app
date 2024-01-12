import { StyleSheet, ScrollView, Pressable } from 'react-native';
import { Component, useState, useRef, useEffect } from 'react'

import { RootTabScreenProps } from '../types';
import ProgressionBox from '../components/ProgressionBox';
import AddChordBox from '../components/AddChordBox';
import MyProgressionContent from '../components/MyProgressionContent';
import { Text, View } from '../components/Themed';

// export default function MyProgressionScreen({ navigation }: RootTabScreenProps<'MyProgression'>, route:any) {

  export default function MyProgressionScreen({navigation, route} : {navigation:any, route:any}) {

  return (
    <ScrollView style={{ backgroundColor: '#9DD6FF' }}>
      <MyProgressionContent navigationData={route.params}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#9DD6FF',
    flex: 1,
    alignItems: 'center',
    marginBottom: '25%'
  },
});
