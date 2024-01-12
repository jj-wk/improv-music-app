import { StyleSheet, Button, View, Text, Pressable, TextInput, Animated } from 'react-native';
import { Component, useState, useRef, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SingleScale from '../components/SingleScale';

export default function GroupedScales({scalesToReturn} : {scalesToReturn:any}) {
    const noteNames = ['C','C#/Db','D','D#/Eb','E','F','F#/Gb','G','G#/Ab','A','A#/Bb','B',
                       'C','C#/Db','D','D#/Eb','E','F','F#/Gb','G','G#/Ab','A','A#/Bb','B'];

    const [majorScales, changeMajorScales] = useState([{key: 'C', scale: 'Major', notes: [0,2,4,5,7,9,11], group: 'Major'}]);
    const [minorScales, changeMinorScales] = useState([{key: 'C', scale: 'Major', notes: [0,2,4,5,7,9,11], group: 'Major'}]);
    const [modeScales, changeModeScales] = useState([{key: 'C', scale: 'Major', notes: [0,2,4,5,7,9,11], group: 'Major'}]);
    const [bluesScales, changeBluesScales] = useState([{key: 'C', scale: 'Major', notes: [0,2,4,5,7,9,11], group: 'Major'}]);
    const [jazzScales, changeJazzScales] = useState([{key: 'C', scale: 'Major', notes: [0,2,4,5,7,9,11], group: 'Major'}]);

    const [accidental, accidentalChange] = useState("#");
    const accidentalAnimation = useRef(new Animated.Value(0)).current;
    const sharp = () => {
        accidentalChange("#");
    };
    const flat = () => {
        accidentalChange("b");
    };

    useEffect(() => {
        if (accidental == '#') {
            Animated.timing(accidentalAnimation, {
                toValue: -1,
                duration: 200,
                useNativeDriver: true,
            }).start();
        }
        else {
            Animated.timing(accidentalAnimation, {
                toValue: 22,
                duration: 200,
                useNativeDriver: true,
              }).start();
        }
    }, [accidental]);

    useEffect(() => {
        let tempArray = [];
        let tempArray2 = [];
        let tempArray3 = [];
        let tempArray4 = [];
        let tempArray5 = [];

        for (let i=0; i<scalesToReturn.length; i++) {
            if (scalesToReturn[i].group == 'Major') {
                tempArray.push(scalesToReturn[i]);
            }
            else if (scalesToReturn[i].group == 'Minor') {
                tempArray2.push(scalesToReturn[i]);
            }
            else if (scalesToReturn[i].group == 'Modes') {
                tempArray3.push(scalesToReturn[i]);
            }
            else if (scalesToReturn[i].group == 'Blues') {
                tempArray4.push(scalesToReturn[i]);
            }
            else {
                tempArray5.push(scalesToReturn[i]);
            }
        }

        changeMajorScales(tempArray);
        changeMinorScales(tempArray2);
        changeModeScales(tempArray3);
        changeBluesScales(tempArray4);
        changeJazzScales(tempArray5);
    }, [scalesToReturn]);

    return (
        <View style={{ width: '100%' }}>
            { majorScales.length != 0 && 
                <View style={[styles.scaleBox, styles.shadow]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Text style={styles.groupTitle}>Major</Text>

                        <View style={[styles.accidentalBox, styles.smallShadow]}>
                            <Animated.View style={[styles.selectedAccidental, styles.smallShadow, {transform: [{translateX: accidentalAnimation}]}]}/>

                            <Pressable onPress={sharp}>
                                <MaterialCommunityIcons name="music-accidental-sharp" size={22} color="black" />
                            </Pressable>
                            <Pressable onPress={flat}>
                                <MaterialCommunityIcons name="music-accidental-flat" size={22} color="black" />
                            </Pressable>
                        </View>
                    </View>

                    {majorScales.map(i => {
                        return <SingleScale key={i.notes.join()} scale={i} accidental={accidental}/>
                    })}
                </View>
            }

            { minorScales.length != 0 && 
                <View style={[styles.scaleBox, styles.shadow]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Text style={styles.groupTitle}>Minor</Text>

                        <View style={[styles.accidentalBox, styles.smallShadow]}>
                            <Animated.View style={[styles.selectedAccidental, styles.smallShadow, {transform: [{translateX: accidentalAnimation}]}]}/>

                            <Pressable onPress={sharp}>
                                <MaterialCommunityIcons name="music-accidental-sharp" size={22} color="black" />
                            </Pressable>
                            <Pressable onPress={flat}>
                                <MaterialCommunityIcons name="music-accidental-flat" size={22} color="black" />
                            </Pressable>
                        </View>
                    </View>

                    {minorScales.map(i => {
                        return <SingleScale key={i.notes.join()} scale={i} accidental={accidental}/>
                    })}
                </View>
            }

            { modeScales.length != 0 && 
                <View style={[styles.scaleBox, styles.shadow]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Text style={styles.groupTitle}>Modes</Text>

                        <View style={[styles.accidentalBox, styles.smallShadow]}>
                            <Animated.View style={[styles.selectedAccidental, styles.smallShadow, {transform: [{translateX: accidentalAnimation}]}]}/>

                            <Pressable onPress={sharp}>
                                <MaterialCommunityIcons name="music-accidental-sharp" size={22} color="black" />
                            </Pressable>
                            <Pressable onPress={flat}>
                                <MaterialCommunityIcons name="music-accidental-flat" size={22} color="black" />
                            </Pressable>
                        </View>
                    </View>

                    {modeScales.map(i => {
                        return <SingleScale key={i.notes.join()} scale={i} accidental={accidental}/>
                    })}
                </View>
            }

            { bluesScales.length != 0 && 
                <View style={[styles.scaleBox, styles.shadow]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Text style={styles.groupTitle}>Blues</Text>

                        <View style={[styles.accidentalBox, styles.smallShadow]}>
                            <Animated.View style={[styles.selectedAccidental, styles.smallShadow, {transform: [{translateX: accidentalAnimation}]}]}/>

                            <Pressable onPress={sharp}>
                                <MaterialCommunityIcons name="music-accidental-sharp" size={22} color="black" />
                            </Pressable>
                            <Pressable onPress={flat}>
                                <MaterialCommunityIcons name="music-accidental-flat" size={22} color="black" />
                            </Pressable>
                        </View>
                    </View>

                    {bluesScales.map(i => {
                        return <SingleScale key={i.notes.join()} scale={i} accidental={accidental}/>
                    })}
                </View>
            }

            { jazzScales.length != 0 && 
                <View style={[styles.scaleBox, styles.shadow]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Text style={styles.groupTitle}>Jazz</Text>

                        <View style={[styles.accidentalBox, styles.smallShadow]}>
                            <Animated.View style={[styles.selectedAccidental, styles.smallShadow, {transform: [{translateX: accidentalAnimation}]}]}/>

                            <Pressable onPress={sharp}>
                                <MaterialCommunityIcons name="music-accidental-sharp" size={22} color="black" />
                            </Pressable>
                            <Pressable onPress={flat}>
                                <MaterialCommunityIcons name="music-accidental-flat" size={22} color="black" />
                            </Pressable>
                        </View>
                    </View>

                    {jazzScales.map(i => {
                        return <SingleScale key={i.notes.join()} scale={i} accidental={accidental}/>
                    })}
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    scaleBox: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 10,
        marginTop: 10,
    },
    groupTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        fontStyle: 'italic',
    },
    accidentalBox: {
        height: 33, 
        width: 55,
        borderRadius: 8,
        backgroundColor: 'white',
        padding: 5,
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    selectedAccidental: {
        marginLeft: 5,
        height: 23, 
        width: 23,
        borderRadius: 8,
        backgroundColor: 'white',
        position: 'absolute',
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
          width: 10,
          height: 10,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 16,
    },
    smallShadow: {
        shadowColor: '#000',
        shadowOffset: {
          width: 1,
          height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 16,
      },
});