import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, ScrollView } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function ModalScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>This section is designed to explain the basic functionalities of the application.</Text>
      <Text></Text>
      <Text style={styles.title}>My Progression Screen</Text>
      <Text style={styles.subtitle}>The Progression Box</Text>
      <Text style={styles.text}>The box at the top of the screen represents your own chord progression. Within this box, it is possible to add up to eight different chords. A chord can be added by pressing the plus button on one of the spaces. After a chord has been added, it can also be deleted be holding the chosen square.</Text>
      <Text></Text>
      <Text style={styles.subtitle}>Adding a chord</Text>
      <Text style={styles.text}>When the plus button has been pressed, a new box appears, where you can build your chord. First you can pick the root note, and specify whether it should be natural, sharp, or flat. Next, the chord quality can be chosen. There are six options, major, minor, augmented, diminished, sus2 or sus4. After the quality has been selected, you have the option to add further extensions with the plus button next to “Extensions”. Here the extension value can be picked, along with whether it is natural, sharp, or flat. Extensions can also be deleted with the minus button.</Text>
      <Text style={styles.text}>Once you are finished, press “Done” to add the chord to the progression.</Text>
      <Text></Text>
      <Text style={styles.subtitle}>Seeing scales for a chord</Text>
      <Text style={styles.text}>The scales for any chord in your progression can be seen be clicking on it in the progression box. A short list of scales should then appear. More compatible scales can be shown by pressing the “Show more” button. </Text>
      <Text></Text>
      <Text style={styles.subtitle}>Seeing scales for the entire progression</Text>
      <Text style={styles.text}>To see the scales for the entire progression, there must first be at least one scale in your progression box. Once this is the case, the “Progression Scales” dropdown below the progression box can be opened, showing all the scales for the progression. If you are still viewing scales for a single chord, the first “Scales” dropdown can be closed to easier find the progression dropdown.</Text>
      <Text></Text>
      <Text></Text>

      <Text style={styles.title}>Chord Progressions Screen</Text>
      <Text style={styles.subtitle}>Choosing a sample progression</Text>
      <Text style={styles.text}>In this screen, you have the possibility to see some sample progressions if you are unsure of what to add in the “My Progressions” screen. If you have found a progression that you like, simply press on it, and it will open in the “My Progressions” screen, where you can see all the scales, and further edit that progression.</Text>
      <Text></Text>
      <Text></Text>

      <Text style={styles.title}>Scales Screen</Text>
      <Text style={styles.subtitle}>Setting the key</Text>
      <Text style={styles.text}>On this screen, you can see all the scales available within the app. To do this, you can set a specific key by setting the root note, and whether it should be natural, sharp, or flat. All the scales in that key will then be shown.</Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 22,
    fontStyle: 'italic',
  },
  text: {
    fontSize: 15,
    textAlign: 'justify',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
