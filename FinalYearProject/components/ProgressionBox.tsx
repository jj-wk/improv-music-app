import { StyleSheet, Button, View, Text, Pressable, TextInput } from 'react-native';
import { Component, useState, useRef, useEffect } from 'react'
import { Entypo } from '@expo/vector-icons';

export default function ProgressionBox({getProgressionBoxData, activeOption, chordName, chord, navigationData, getSelectedChord, onDelete, onAdd, onClickAway} : {getProgressionBoxData:any, activeOption:any, chordName:any, chord:any, navigationData:any, getSelectedChord:any, onDelete:any, onAdd:any, onClickAway:any}) {
    const [activeBox, changeActiveBox] = useState(-1);
    const [activeBackground, backgroundChange] = useState(['white','white','white','white','white','white','white','white']);
    const [displayedFields, fieldsChange] = useState([true,false,false,false,false,false,false,false]);
    const [allChordNames, changeChords] = useState(['','','','','','','','']);
    const [allChordValues, changeChordsValues] = useState(['','','','','','','','']);

    const plusButton = (option: number) => {
        if (activeBox == option) {
            let tempArray = displayedFields;
            tempArray[option] = false;  //removes plus
            fieldsChange(tempArray);

            let tempArray2 = ['white','white','white','white','white','white','white','white'];
            tempArray2[option] = '#d1ecff';
            backgroundChange(tempArray2);

            getProgressionBoxData(option);
        }
        else if (allChordNames[option] != '' && activeBackground[activeBox] != '#d1ecff') {
            getSelectedChord(allChordNames[option], allChordValues[option], allChordValues);

            let tempArray2 = ['white','white','white','white','white','white','white','white'];
            tempArray2[option] = '#9DD6FF';
            backgroundChange(tempArray2);
        }
        else if (activeBackground[activeBox] != '#d1ecff') {
            backgroundChange(['white','white','white','white','white','white','white','white']);
            onClickAway();
        }
    }

    //when chordName changes
    useEffect(() => {
        if (chordName == navigationData) {
            if (navigationData != undefined) {
                changeChords(navigationData.navigationChordNames);
                changeChordsValues(navigationData.navigationChordValues);

                onAdd(navigationData.navigationChordValues);

                let tempArray4 = [false,false,false,false,false,false,false,false];
                tempArray4[navigationData.navigationChordNames.indexOf('')] = true;
                fieldsChange(tempArray4);
                changeActiveBox(navigationData.navigationChordNames.indexOf(''));

                backgroundChange(['white','white','white','white','white','white','white','white']);
            }
        }
        else {
        let tempArray = allChordNames;
        tempArray[activeOption] = chordName;
        changeChords([...tempArray]);

        let tempArray2 = allChordValues;
        tempArray2[activeOption] = chord;
        changeChordsValues([...tempArray2]);

        onAdd(tempArray2);

        let tempArray3 = activeBackground;
        tempArray3[activeOption] = 'white';
        backgroundChange(tempArray3);

        let tempArray4 = displayedFields;
        tempArray4[allChordNames.indexOf('')] = true;
        fieldsChange(tempArray4);
        changeActiveBox(allChordNames.indexOf(''));
        }
    }, [chordName]);


    const deleteChord = (option: number) => {
        if (activeBackground.includes('#d1ecff')) {

        }
        else {
            if (allChordNames[option] == '') {

            }
            else {
                backgroundChange(['white','white','white','white','white','white','white','white']);

                let tempArray = allChordNames;
                tempArray.splice(option, 1);
                tempArray.push('');
                changeChords([...tempArray]);

                let tempArray3 = allChordValues;
                tempArray3.splice(option, 1);
                tempArray3.push('');
                changeChordsValues([...tempArray3]);

                let tempArray2 = displayedFields;
                tempArray2[activeBox] = false;
                tempArray2[allChordNames.indexOf('')] = true;
                fieldsChange(tempArray2);
                changeActiveBox(allChordNames.indexOf(''));

                onDelete(tempArray3);
            }
        }
    }

    return (
        <View style={[styles.progressionBox, styles.shadow]}>
            <View style={styles.progressionBoxLine}>
                <View style={{ width: '100%', height: '49.5%', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Pressable style={[styles.chord, { borderTopLeftRadius: 8, backgroundColor: activeBackground[0] }]} onPress={() => plusButton(0)} onLongPress={() => deleteChord(0)}>
                    { displayedFields[0] && 
                        <Entypo name="plus" size={40} color="black"/>  
                    }
                    { !displayedFields[0] && 
                        <Text style={styles.chordNames}>{allChordNames[0]}</Text>
                    }
                </Pressable>
                <Pressable style={[styles.chord, { backgroundColor: activeBackground[1] }]} onPress={() => plusButton(1)} onLongPress={() => deleteChord(1)}>
                    { displayedFields[1] && 
                        <Entypo name="plus" size={40} color="black"/>  
                    }
                    { !displayedFields[1] && 
                        <Text style={styles.chordNames}>{allChordNames[1]}</Text>
                    }
                </Pressable>
                <Pressable style={[styles.chord, { backgroundColor: activeBackground[2] }]} onPress={() => plusButton(2)} onLongPress={() => deleteChord(2)}>
                    { displayedFields[2] && 
                        <Entypo name="plus" size={40} color="black"/>  
                    }
                    { !displayedFields[2] && 
                        <Text style={styles.chordNames}>{allChordNames[2]}</Text>
                    }
                </Pressable>
                <Pressable style={[styles.chord, { borderTopRightRadius: 8, backgroundColor: activeBackground[3] }]} onPress={() => plusButton(3)} onLongPress={() => deleteChord(3)}>
                    { displayedFields[3] && 
                        <Entypo name="plus" size={40} color="black"/>  
                    }
                    { !displayedFields[3] && 
                        <Text style={styles.chordNames}>{allChordNames[3]}</Text>
                    }
                </Pressable>
                </View>

                <View style={{ width: '100%', height: '49.5%', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Pressable style={[styles.chord, { borderBottomLeftRadius: 8, backgroundColor: activeBackground[4] }]} onPress={() => plusButton(4)} onLongPress={() => deleteChord(4)}>
                    { displayedFields[4] && 
                        <Entypo name="plus" size={40} color="black"/>  
                    }
                    { !displayedFields[4] && 
                        <Text style={styles.chordNames}>{allChordNames[4]}</Text>
                    }
                </Pressable>
                <Pressable style={[styles.chord, { backgroundColor: activeBackground[5] }]} onPress={() => plusButton(5)} onLongPress={() => deleteChord(5)}>
                    { displayedFields[5] && 
                        <Entypo name="plus" size={40} color="black"/>  
                    }
                    { !displayedFields[5] && 
                        <Text style={styles.chordNames}>{allChordNames[5]}</Text>
                    }
                </Pressable>
                <Pressable style={[styles.chord, { backgroundColor: activeBackground[6] }]} onPress={() => plusButton(6)} onLongPress={() => deleteChord(6)}>
                    { displayedFields[6] && 
                        <Entypo name="plus" size={40} color="black"/>  
                    }
                    { !displayedFields[6] && 
                        <Text style={styles.chordNames}>{allChordNames[6]}</Text>
                    }
                </Pressable>
                <Pressable style={[styles.chord, { borderBottomRightRadius: 8, backgroundColor: activeBackground[7] }]} onPress={() => plusButton(7)} onLongPress={() => deleteChord(7)}>
                    { displayedFields[7] && 
                        <Entypo name="plus" size={40} color="black"/>  
                    }
                    { !displayedFields[7] && 
                        <Text style={styles.chordNames}>{allChordNames[7]}</Text>
                    }
                </Pressable>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    progressionBox: {
        width: '90%',
        height: 200,
        backgroundColor: 'white',
        borderRadius: 15,
        alignItems: 'center', 
        justifyContent: 'center',
        padding: 10,
        marginTop: 10,
    },
    progressionBoxLine: {
        backgroundColor: "#9DD6FF",
        width: '100%',
        height: '100%',
        borderRadius: 10,
        padding: 2,
        justifyContent: 'space-between',
    },
    chord: {
        backgroundColor: 'white',
        width: '24.5%',
        height: '100%',
        alignItems: 'center', 
        justifyContent: 'center',
        padding: 5,
    },
    chordNames: {
        textAlign: 'center',
        fontWeight: '200',
        fontSize: 18,
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
});