import { StyleSheet, Button, View, Text, Pressable, TextInput, Animated } from 'react-native';
import { Component, useState, useRef, useEffect } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker';

import AddExtension from '../components/AddExtension';

export default function AddChordBox({getNewChord} : {getNewChord:any}) {
    const [note, onChangeText] = useState("C");
    const [accidental, accidentalChange] = useState("");
    const [quality, qualityChange] = useState("major");
    
    const accidentalAnimation = useRef(new Animated.Value(0)).current;
    const natural = () => {
        accidentalChange("");
        Animated.timing(accidentalAnimation, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }).start();
    };
    const sharp = () => {
        accidentalChange("#");
        Animated.timing(accidentalAnimation, {
            toValue: 30,
            duration: 200,
            useNativeDriver: true,
          }).start();
    };
    const flat = () => {
        accidentalChange("b");
        Animated.timing(accidentalAnimation, {
            toValue: 60,
            duration: 200,
            useNativeDriver: true,
          }).start();
    };

    const qualityXAnimation = useRef(new Animated.Value(-98)).current;
    const qualityYAnimation = useRef(new Animated.Value(9)).current;
    const qualityXScale = useRef(new Animated.Value(1)).current;
    const qualityOpacity = useRef(new Animated.Value(1)).current;
    const major = () => {
        Animated.parallel([
            Animated.timing(qualityXAnimation, {
                toValue: -98,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(qualityYAnimation, {
                toValue: 9,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(qualityXScale, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(qualityOpacity, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(susOpacity, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start(() => {
        });
        qualityChange("major");
    };
    const minor = () => {
        Animated.parallel([
            Animated.timing(qualityXAnimation, {
                toValue: -98,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(qualityYAnimation, {
                toValue: 43,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(qualityXScale, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(qualityOpacity, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(susOpacity, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start(() => {
        });
        qualityChange("minor");
    };
    const diminished = () => {
        Animated.parallel([
            Animated.timing(qualityXAnimation, {
                toValue: 62,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(qualityYAnimation, {
                toValue: 9,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(qualityXScale, {
                toValue: 1.55,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(qualityOpacity, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(susOpacity, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start(() => {
        });
        qualityChange("diminished");
    };
    const augmented = () => {
        Animated.parallel([
            Animated.timing(qualityXAnimation, {
                toValue: 62,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(qualityYAnimation, {
                toValue: 43,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(qualityXScale, {
                toValue: 1.55,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(qualityOpacity, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(susOpacity, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start(() => {
        });
        qualityChange("augmented");
    };

    const susAnimation = useRef(new Animated.Value(0)).current;
    const susOpacity = useRef(new Animated.Value(0)).current;
    const sus2 = () => {
        Animated.parallel([
            Animated.timing(susAnimation, {
                toValue: 30,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(susOpacity, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(qualityOpacity, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start(() => {
        });
        qualityChange("sus2");
    };
    const sus4 = () => {
        Animated.parallel([
            Animated.timing(susAnimation, {
                toValue: 175,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(susOpacity, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(qualityOpacity, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start(() => {
        });
        qualityChange("sus4");
    };


    const [displayedExtensions, extensionChange] = useState([false,false,false,false,false,false,false]);
    const [extensionValues, extensionValueChange] = useState(['','','','','','','']);
    const addExtension = () => {
        for(let i=0; i<displayedExtensions.length; i++) {
            if(displayedExtensions[i] == false){
                let tempArray = displayedExtensions;
                tempArray[i] = true;
                extensionChange(tempArray);

                changeExtension('7','7','',i);

                if(data == true) {
                    updateData(false);
                }
                else{
                    updateData(true);
                }
                return
            }
        }
    };


    const [data, updateData] = useState(true);

    const addOrRemoveExtension = (extensionData: string, option: number) => {
        let tempArray = displayedExtensions;
        tempArray[option] = false;
        extensionChange(tempArray);

        let tempArray2 = extensionValues;
        tempArray2[option] = '';
        extensionValueChange(tempArray2);

        if(data == true) {
            updateData(false);
        }
        else{
            updateData(true);
        }
    }

    const changeExtension = (extensionData: string, extensionNumber: string, extensionAccidental: string, option: number) => {
        let tempArray = extensionValues;
        for (let i=0; i<displayedExtensions.length; i++) {
            if (displayedExtensions[i] == false) {

            }
            else {
                tempArray[option] = extensionData;
                extensionValueChange(tempArray);
            }
        }  
    }

    
    const [chord, updateChord] = useState([0]);
    const noteNames = ['C','C#/Db','D','D#/Eb','E','F','F#/Gb','G','G#/Ab','A','A#/Bb','B'];

    const printChord = () => {
        let chordName = note + accidental; 

        let tempArray = [];
        tempArray.push(noteNames.indexOf(note));

        if (quality == 'major') {
            tempArray.push(noteNames.indexOf(note) + 4);
            tempArray.push(noteNames.indexOf(note) + 7);

            chordName += 'Maj';
        }
        else if (quality == 'minor') {
            tempArray.push(noteNames.indexOf(note) + 3);
            tempArray.push(noteNames.indexOf(note) + 7);

            chordName += 'min';
        }
        else if (quality == 'diminished') {
            tempArray.push(noteNames.indexOf(note) + 3);
            tempArray.push(noteNames.indexOf(note) + 6);

            chordName += 'dim';
        }
        else if (quality == 'augmented') {
            tempArray.push(noteNames.indexOf(note) + 4);
            tempArray.push(noteNames.indexOf(note) + 8);

            chordName += 'aug';
        }
        else if (quality == 'sus2') {
            tempArray.push(noteNames.indexOf(note) + 2);
            tempArray.push(noteNames.indexOf(note) + 7);

            chordName += quality;
        }
        else if (quality == 'sus4') {
            tempArray.push(noteNames.indexOf(note) + 5);
            tempArray.push(noteNames.indexOf(note) + 7);

            chordName += quality;
        }


        let naturalExtensions = [];
        let naturalExtensionLocations = [];

        let r = /\d+/;  //regex finds digits
        let r2 = /\D/g; //regex finds all non digits
        for (let i=0; i<displayedExtensions.length; i++) {
            if (displayedExtensions[i] == false) {

            }
            else {
                if (extensionValues[i].replace(r2, "") == '4') {
                    if (extensionValues[i].replace(r, "") == '') {
                        tempArray.push(noteNames.indexOf(note) + 5);
                    }
                    else if (extensionValues[i].replace(r, "") == '#') {
                        tempArray.push(noteNames.indexOf(note) + 6);
                    }
                    else {
                        tempArray.push(noteNames.indexOf(note) + 4);
                    }
                }
                if (extensionValues[i].replace(r2, "") == '5') {
                    if (extensionValues[i].replace(r, "") == '') {
                        tempArray.push(noteNames.indexOf(note) + 7);
                    }
                    else if (extensionValues[i].replace(r, "") == '#') {
                        tempArray.push(noteNames.indexOf(note) + 8);
                    }
                    else {
                        tempArray.push(noteNames.indexOf(note) + 6);
                    }
                }
                if (extensionValues[i].replace(r2, "") == '6') {
                    if (extensionValues[i].replace(r, "") == '') {
                        tempArray.push(noteNames.indexOf(note) + 9);
                        naturalExtensions.push(extensionValues[i]);
                        naturalExtensionLocations.push(i);
                    }
                    else if (extensionValues[i].replace(r, "") == '#') {
                        tempArray.push(noteNames.indexOf(note) + 10);
                    }
                    else {
                        tempArray.push(noteNames.indexOf(note) + 8);
                    }
                }
                if (extensionValues[i].replace(r2, "") == '7') {
                    if (extensionValues[i].replace(r, "") == '') {
                        tempArray.push(noteNames.indexOf(note) + 11);
                        naturalExtensions.push(extensionValues[i]);
                        naturalExtensionLocations.push(i);
                    }
                    else if (extensionValues[i].replace(r, "") == '#') {
                        tempArray.push(noteNames.indexOf(note) + 12);
                    }
                    else {
                        tempArray.push(noteNames.indexOf(note) + 10);
                        naturalExtensions.push(extensionValues[i]);
                        naturalExtensionLocations.push(i);
                    }
                }
                if (extensionValues[i].replace(r2, "") == '9') {
                    if (extensionValues[i].replace(r, "") == '') {
                        tempArray.push(noteNames.indexOf(note) + 14);
                        naturalExtensions.push(extensionValues[i]);
                        naturalExtensionLocations.push(i);
                    }
                    else if (extensionValues[i].replace(r, "") == '#') {
                        tempArray.push(noteNames.indexOf(note) + 15);
                    }
                    else {
                        tempArray.push(noteNames.indexOf(note) + 13);
                    }
                }
                if (extensionValues[i].replace(r2, "") == '11') {
                    if (extensionValues[i].replace(r, "") == '') {
                        tempArray.push(noteNames.indexOf(note) + 17);
                        naturalExtensions.push(extensionValues[i]);
                        naturalExtensionLocations.push(i);
                    }
                    else if (extensionValues[i].replace(r, "") == '#') {
                        tempArray.push(noteNames.indexOf(note) + 18);
                    }
                    else {
                        tempArray.push(noteNames.indexOf(note) + 16);
                    }
                }
                if (extensionValues[i].replace(r2, "") == '13') {
                    if (extensionValues[i].replace(r, "") == '') {
                        tempArray.push(noteNames.indexOf(note) + 21);
                        naturalExtensions.push(extensionValues[i]);
                        naturalExtensionLocations.push(i);
                    }
                    else if (extensionValues[i].replace(r, "") == '#') {
                        tempArray.push(noteNames.indexOf(note) + 22);
                    }
                    else {
                        tempArray.push(noteNames.indexOf(note) + 20);
                    }
                }
            }
        }  

        if (accidental == '') {
            
        }
        else if (accidental == '#') {
            for (let i=0; i<tempArray.length; i++) {
                tempArray[i]++;
            }
        }
        else {
            for (let i=0; i<tempArray.length; i++) {
                tempArray[i]--;
            }
        }

        updateChord(tempArray);



        //makes an array with natural extensions as integers
        let tempArray2 = [];
        for (let i=0; i<naturalExtensions.length; i++) {
            tempArray2.push(parseInt(naturalExtensions[i].replace(r2, "")));
        }

        //removes Maj from name unless no extensions, or major 7th
        if (quality == 'major') {
            if (tempArray2.includes(7) && naturalExtensions[tempArray2.indexOf(7)] == '7') {

            }
            else {
                let numExtensions = 0;
                for (let i=0; i<extensionValues.length; i++) {
                    if (extensionValues[i] != '') {
                        numExtensions++;
                    }
                }
                
                if (numExtensions != 0) {
                    chordName = chordName.slice(0,-3);
                }
            }
        }

        //sets the maximum natural extension
        let maxExtension = Math.max(...tempArray2);
        if (tempArray2.length == 0) {
            
        }
        else if (tempArray2.length == 1 && maxExtension != 7 && maxExtension != 6){
            chordName += 'add' + maxExtension;
        }
        else {
            if (naturalExtensions.includes('7') && quality != 'major') {
                chordName += 'M7'
            }
            else {
                chordName += maxExtension;
            }
        }

        //removes natural extensions from all other extensions
        for (let i=0; i<naturalExtensionLocations.length; i++) {
            extensionValues[naturalExtensionLocations[i]] = '';
        }
        
        chordName += ' ' + extensionValues.join("");

        // let chordName = note + accidental + ' ' + quality + ' ' + extensionValues.join("");
        getNewChord(chordName, tempArray);
    };

    return (
        <View style={{ width: '100%' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20 }}>
                <Text style={styles.title}>Add a chord</Text>
                <Pressable onPress={printChord} style={[styles.addButton, styles.smallShadow]}>
                    <Text style={styles.buttonText}>Done</Text>
                </Pressable>
            </View>
            <View style={[styles.addChordBox, styles.shadow]}>
                <View style={styles.rootBox}>
                    <Text style={styles.rootTitle}>Root note</Text>
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
                            <MaterialCommunityIcons name="music-accidental-natural" size={30} color="black" />
                        </Pressable>
                        <Pressable onPress={sharp}>
                            <MaterialCommunityIcons name="music-accidental-sharp" size={30} color="black" />
                        </Pressable>
                        <Pressable onPress={flat}>
                            <MaterialCommunityIcons name="music-accidental-flat" size={30} color="black" />
                        </Pressable>
                    </View>
                </View>
                <View style={[styles.qualitiesBox, styles.smallShadow]}>
                    <Animated.View style={[styles.selectedQuality, styles.smallShadow, {transform: [{translateX: qualityXAnimation}, {translateY: qualityYAnimation}, {scaleX: qualityXScale}], opacity: qualityOpacity}]}/>

                    <View style={{ width: '100%', height: '50%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: '8%' }}>
                        <Pressable onPress={major}>
                            <Text style={styles.qualitiesText}>major</Text>
                        </Pressable>
                        <Pressable onPress={diminished}>
                            <Text style={styles.qualitiesText}>diminished</Text>
                        </Pressable>
                    </View>
                    <View style={{ width: '100%', height: '50%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: '8%' }}>
                        <Pressable onPress={minor}>
                            <Text style={styles.qualitiesText}>minor</Text>
                        </Pressable>
                        <Pressable onPress={augmented}>
                            <Text style={styles.qualitiesText}>augmented</Text>
                        </Pressable>
                    </View>
                </View>

                <View style={[styles.qualitiesBox, styles.smallShadow]}>
                    <Text style={styles.rootTitle}>Sustained</Text>
                    <View style={{ width: '100%', height: '50%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: '17%' }}>
                        <Animated.View style={[styles.selectedQuality, styles.smallShadow, {transform: [{translateX: susAnimation}], opacity: susOpacity}]}/>
                        
                        <Pressable onPress={sus2}>
                            <Text style={styles.qualitiesText}>sus2</Text>
                        </Pressable>
                        <Pressable onPress={sus4}>
                            <Text style={styles.qualitiesText}>sus4</Text>
                        </Pressable>
                    </View>
                </View>

                <View style={[styles.extensionsBox, styles.smallShadow]}>
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: '6.7%' }}>
                        <Text style={styles.rootTitle}>Add extensions</Text>
                        <Pressable onPress={addExtension}>
                            <MaterialCommunityIcons name="plus-circle-outline" size={24} color="black" />
                        </Pressable>
                    </View>
                        { displayedExtensions[0] && 
                            <View>
                                <AddExtension addOrRemoveExtension={addOrRemoveExtension} option={0} changeExtension={changeExtension}/>
                            </View>
                        }
                        { displayedExtensions[1] && 
                            <View>
                                <AddExtension addOrRemoveExtension={addOrRemoveExtension} option={1} changeExtension={changeExtension}/>
                            </View>
                        }
                        { displayedExtensions[2] && 
                            <View>
                                <AddExtension addOrRemoveExtension={addOrRemoveExtension} option={2} changeExtension={changeExtension}/>
                            </View>
                        }
                        { displayedExtensions[3] && 
                            <View>
                                <AddExtension addOrRemoveExtension={addOrRemoveExtension} option={3} changeExtension={changeExtension}/>
                            </View>
                        }
                        { displayedExtensions[4] && 
                            <View>
                                <AddExtension addOrRemoveExtension={addOrRemoveExtension} option={4} changeExtension={changeExtension}/>
                            </View>
                        }
                        { displayedExtensions[5] && 
                            <View>
                                <AddExtension addOrRemoveExtension={addOrRemoveExtension} option={5} changeExtension={changeExtension}/>
                            </View>
                        }
                        { displayedExtensions[6] && 
                            <View>
                                <AddExtension addOrRemoveExtension={addOrRemoveExtension} option={6} changeExtension={changeExtension}/>
                            </View>
                        }
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    addChordBox: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 15,
        alignItems: 'center', 
        padding: 10,
        marginTop: 10,
        alignSelf: 'center',
    },
    title: {
        marginTop: 15,
        fontWeight: 'bold',
        fontSize: 30,
        fontStyle: 'italic',
    },
    rootBox: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignContent: 'center', 
        width: '100%',
        paddingHorizontal: '3%',
        marginTop: 10,
    },
    rootTitle: {
        fontWeight: 'bold',
        fontSize: 30,
        fontStyle: 'italic',
    },
    input: {
        height: 40, 
        width: 40,
        borderRadius: 8,
        fontWeight: 'bold',
        fontSize: 25,
        fontStyle: 'italic',
        textAlign: 'center',
        backgroundColor: 'white',
    },
    accidentalBox: {
        height: 40, 
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
        height: 30, 
        width: 30,
        borderRadius: 8,
        backgroundColor: 'white',
        position: 'absolute',
    },
    qualitiesBox: {
        marginTop: 20,
        height: 80, 
        width: '96%',
        borderRadius: 15,
        backgroundColor: 'white',
        padding: 5,
        alignItems: 'center',
    },
    qualitiesText: {
        fontWeight: 'bold',
        fontSize: 25,
    },
    selectedQuality: {
        height: 30, 
        width: 100,
        borderRadius: 8,
        backgroundColor: 'white',
        position: 'absolute',
    },
    extensionsBox: {
        marginTop: 20,
        width: '96%',
        borderRadius: 15,
        backgroundColor: 'white',
        padding: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    addButton: {
        backgroundColor: 'white',
        padding: 8,
        marginTop: 12,
        borderRadius: 12,
    },
    buttonText: {
        fontSize: 20,
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
          width: 3,
          height: 3,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 16,
    },
});