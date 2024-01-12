import { StyleSheet, Pressable, ScrollView } from 'react-native';
import { Component, useState, useRef, useEffect } from 'react'
import Navigation from '../navigation';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SingleChordProgression from '../components/SingleChordProgression';
import { Text, View } from '../components/Themed';

export default function ChordProgressionsScreen({navigation, route} : {navigation:any, route:any}) {

  const [progressionsList, editProgressionsList] = useState(fillProgressionArray);

  function fillProgressionArray() {
    let progressions = [];

    progressions.push({
      title: 'Major 2-5-1',
      chordNames: ["Dmin7", "G7", "CMaj7", "", "", "", "", ""], 
      chordValues:[[2,5,9,12],[7,11,14,17],[0,4,7,11], "", "", "", "", ""],
      key: 0,
    })

    progressions.push({
      title: 'Circle of 5ths',
      chordNames: ["FMaj7", "Bdim7", "Emin7", "", "", "", "", ""], 
      chordValues:[[5,9,12,16],[11,14,17,21],[4,7,11,14], "", "", "", "", ""],
      key: 1,
    })

    progressions.push({
      title: 'Vamp-turnaround',
      chordNames: ["CMaj", "A7", "Dmin7", "G7", "", "", "", ""], 
      chordValues:[[0,4,7],[9,13,16,19],[2,5,9,12],[7,11,14,17], "", "", "", ""],
      key: 2,
    })

    progressions.push({
      title: 'Parallel Progression ',
      chordNames: ["FMaj7", "Emin7", "Dmin7", "CMaj7", "", "", "", ""], 
      chordValues:[[5,9,12,16],[4,7,11,14],[2,5,9,12],[0,4,7,11], "", "", "", ""],
      key: 3,
    })

    progressions.push({
      title: 'Line Progression',
      chordNames: ["CMaj", "Emin7", "Amin7", "CMaj", "", "", "", ""], 
      chordValues:[[0,4,7],[4,7,11,14],[9,12,16,19],[0,4,7], "", "", "", ""],
      key: 4,
    })

    progressions.push({
      title: 'Pop 4 Chords',
      chordNames: ["CMaj", "G7", "Amin7", "FMaj", "", "", "", ""], 
      chordValues:[[0,4,7],[7,11,14,17],[9,12,16,19],[5,9,12], "", "", "", ""],
      key: 5,
    })

    progressions.push({
      title: 'Fourths Progression',
      chordNames: ["CMaj", "FMaj", "BbMaj", "FMaj", "", "", "", ""], 
      chordValues:[[0,4,7],[5,9,12],[10,14,17],[5,9,12], "", "", "", ""],
      key: 6,
    })

    progressions.push({
      title: 'Minor Progression',
      chordNames: ["Cmin7", "Abadd9", "G7 b9", "Cmin7", "", "", "", ""], 
      chordValues:[[0,3,7,10],[8,12,15,22],[7,11,14,17,20],[0,3,7,10], "", "", "", ""],
      key: 7,
    })

    progressions.push({
      title: 'Minor 2-5-1',
      chordNames: ["Ddim7", "G7 b9", "Cmin7", "", "", "", "", ""], 
      chordValues:[[2,5,8,12],[7,11,14,17,20],[0,3,7,10], "", "", "", "", ""],
      key: 8,
    })

    return [...progressions];
}

  const openProgression = (chordNames:any, chordValues:any, num:any) => {
    editProgressionsList(fillProgressionArray());

    navigation.navigate('MyProgression', {
      navigationChordNames: progressionsList[num].chordNames,
      navigationChordValues: progressionsList[num].chordValues
      })
  }

  return (
    <ScrollView style={{ backgroundColor: '#9DD6FF' }}>
      <View style={styles.container}>
        {progressionsList.map(i => {
          return <SingleChordProgression openProgression={openProgression} title={i.title} chordNames={i.chordNames} chordValues={i.chordValues} num={i.key} key={i.key}/>
        })}
      </View>
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
