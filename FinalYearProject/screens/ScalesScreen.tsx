import { StyleSheet, Button, View, Text, Pressable, TextInput, Animated, ScrollView } from 'react-native';
import { Component, useState, useRef, useEffect } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SingleScale from '../components/SingleScale';
import GroupedScales from '../components/GroupedScales';

export default function ScalesScreen() {
  const [note, onChangeText] = useState("C");
  const noteNames = ['C','C#/Db','D','D#/Eb','E','F','F#/Gb','G','G#/Ab','A','A#/Bb','B'];
  const [allScales, editAllScales] = useState(fillScaleArray);
  const [scalesToReturn, changeReturningScales] = useState([{key: 'C', scale: 'Major', notes: [0,2,4,5,7,9,11], group: 'Major'}]);
  const [accidental, accidentalChange] = useState("");

  const accidentalAnimation = useRef(new Animated.Value(0)).current;
  const natural = () => {
      accidentalChange("");
      Animated.timing(accidentalAnimation, {
          toValue: -1,
          duration: 200,
          useNativeDriver: true,
        }).start();
  };
  const sharp = () => {
      accidentalChange("#");
      Animated.timing(accidentalAnimation, {
          toValue: 32,
          duration: 200,
          useNativeDriver: true,
        }).start();
  };
  const flat = () => {
      accidentalChange("b");
      Animated.timing(accidentalAnimation, {
          toValue: 64,
          duration: 200,
          useNativeDriver: true,
        }).start();
  };

  function fillScaleArray() {
    let scales = [];

    for (let i=0; i<noteNames.length; i++) {
        scales.push({key: noteNames[i], scale: 'Major', notes: [0,2,4,5,7,9,11].map(n => n + i), group: 'Major'})
        scales.push({key: noteNames[i], scale: 'Pentatonic', notes: [0,2,4,7,9].map(n => n + i), group: 'Major'})
        scales.push({key: noteNames[i], scale: 'Blues', notes: [0,3,5,6,7,10].map(n => n + i), group: 'Blues'})
        scales.push({key: noteNames[i], scale: '9 Note Blues', notes: [0,2,3,4,5,7,9,10,11].map(n => n + i), group: 'Blues'})
        scales.push({key: noteNames[i], scale: 'Minor Pentatonic', notes: [0,3,5,7,10].map(n => n + i), group: 'Minor'})
        scales.push({key: noteNames[i], scale: 'Dorian', notes: [0,2,3,5,7,9,10].map(n => n + i), group: 'Modes'})
        scales.push({key: noteNames[i], scale: 'Phrygian', notes: [0,1,3,5,7,8,10].map(n => n + i), group: 'Modes'})
        scales.push({key: noteNames[i], scale: 'Lydian', notes: [0,2,4,6,7,9,11].map(n => n + i), group: 'Modes'})
        scales.push({key: noteNames[i], scale: 'Mixolydian', notes: [0,2,4,5,7,9,10].map(n => n + i), group: 'Modes'})
        scales.push({key: noteNames[i], scale: 'Minor', notes: [0,2,3,5,7,8,10].map(n => n + i), group: 'Minor'})
        scales.push({key: noteNames[i], scale: 'Locrian', notes: [0,1,3,5,6,8,10].map(n => n + i), group: 'Modes'})
        scales.push({key: noteNames[i], scale: 'Melodic Minor', notes: [0,2,3,5,7,9,11].map(n => n + i), group: 'Minor'})
        scales.push({key: noteNames[i], scale: 'Harmonic Minor', notes: [0,2,3,5,7,8,11].map(n => n + i), group: 'Minor'})
        scales.push({key: noteNames[i], scale: 'Dominant', notes: [0,1,3,4,6,7,9,10].map(n => n + i), group: 'Jazz'})
        scales.push({key: noteNames[i], scale: 'Diminished', notes: [0,2,3,5,6,8,9,11].map(n => n + i), group: 'Jazz'})
        scales.push({key: noteNames[i], scale: 'Whole Tone', notes: [0,2,4,6,8,10].map(n => n + i), group: 'Jazz'})
        scales.push({key: noteNames[i], scale: 'Altered', notes: [0,1,3,4,6,8,10].map(n => n + i), group: 'Jazz'})
        scales.push({key: noteNames[i], scale: 'Chromatic', notes: [0,1,2,3,4,5,6,7,8,9,10,11].map(n => n + i), group: 'Jazz'})
        scales.push({key: noteNames[i], scale: 'Dominant Bebop', notes: [0,2,4,5,7,9,10,11].map(n => n + i), group: 'Jazz'})
        scales.push({key: noteNames[i], scale: 'Major Bebop', notes: [0,2,4,5,7,8,9,11].map(n => n + i), group: 'Jazz'})
        scales.push({key: noteNames[i], scale: 'Minor Bebop', notes: [0,2,3,5,7,9,10,11].map(n => n + i), group: 'Jazz'})
    }

    return [...scales];
}

useEffect(() => {
  updateList();
}, [note]);

useEffect(() => {
  updateList();
}, [accidental]);

const updateList = () => {
  let val = noteNames.indexOf(note);

  if (accidental == '') {
    
  }
  else if (accidental == '#') {
    val++;
  }
  else {
    val--;
  }

  if (val == -1) {
    val += 12;
  }
  if (val == 12) {
    val -= 12;
  }

  let tempArray = [];

  for (let i=0; i<allScales.length; i++) {
    if (allScales[i].key == noteNames[val]) {
      tempArray.push(allScales[i]);
    }
  }

  changeReturningScales(tempArray);
}

  return (
    <View style={styles.container}>
      <ScrollView style={{ backgroundColor: '#9DD6FF', width: '100%', }}>
        <View style={{ alignItems: 'center', marginBottom: '25%'}}>
          <View style={{ flexDirection: 'row', alignItems: 'center', width: '90%', justifyContent: 'space-between'}}>
            <Text style={styles.rootTitle}>Show scales in     </Text>
            <TextInput 
                style={[styles.input, styles.smallShadow]}
                value={note}
                onChangeText={onChangeText}
                multiline={true}
                autoCapitalize='characters'
                maxLength={1}
            />
            <View style={[styles.accidentalBox, styles.smallShadow]}>
                <Animated.View style={[styles.selectedAccidental, styles.smallShadow, {transform: [{translateX: accidentalAnimation}]}]}/>

                <Pressable onPress={natural}>
                    <MaterialCommunityIcons name="music-accidental-natural" size={24} color="black" />
                </Pressable>
                <Pressable onPress={sharp}>
                    <MaterialCommunityIcons name="music-accidental-sharp" size={24} color="black" />
                </Pressable>
                <Pressable onPress={flat}>
                    <MaterialCommunityIcons name="music-accidental-flat" size={24} color="black" />
                </Pressable>
            </View>
          </View>

          <View style={styles.scaleContainer}>
            <GroupedScales scalesToReturn={scalesToReturn}/>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#9DD6FF',
    flex: 1,
    alignItems: 'center',
  },
  rootTitle: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  input: {
      height: 33, 
      width: 33,
      borderRadius: 8,
      fontWeight: 'bold',
      fontSize: 20,
      textAlign: 'center',
      backgroundColor: 'white',
  },
  scaleContainer: {
    width: '90%',
    alignItems: 'center', 
    justifyContent: 'center',
  },
  accidentalBox: {
    height: 33, 
    width: 100,
    borderRadius: 8,
    backgroundColor: 'white',
    padding: 5,
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
},
selectedAccidental: {
    marginLeft: 5,
    height: 26, 
    width: 26,
    borderRadius: 8,
    backgroundColor: 'white',
    position: 'absolute',
},
  smallShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 16,
  },
});
