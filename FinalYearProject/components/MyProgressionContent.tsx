import { StyleSheet, ScrollView, Pressable, Animated } from 'react-native';
import { Component, useState, useRef, useEffect } from 'react'
import ProgressionBox from '../components/ProgressionBox';
import AddChordBox from '../components/AddChordBox';
import ScalesBox from '../components/ScalesBox';
import ScalesForProgression from '../components/ScalesForProgression';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { Text, View } from '../components/Themed';
import Navigation from '../navigation';

export default function MyProgressionContent({ navigationData } : {navigationData:any}) {
    const [showAddChord, changeShowAddChord] = useState(false);
    const [showScales, changeShowScales] = useState(false);
    const [showProgressionScales, changeShowProgressionScales] = useState(false);

    const [activeBox, changeActiveBox] = useState(0);
    const [chordName, setChordName] = useState('');
    const [chord, updateChord] = useState([0]);
    const [allChordValues, changeChordsValues] = useState(['','','','','','','','']);
    const [selectedChordValues, changeSelectedValues] = useState([0]);

    const getProgressionBoxData = (option: any) => {
        changeShowScales(false);
        changeShowProgressionScales(false);
        changeShowAddChord(true);
        changeActiveBox(option);
    }

    const getNewChord = (newChordName: any, newChord: any) => {
        setChordName(newChordName);
        updateChord(newChord);
        changeShowAddChord(false);
        changeShowProgressionScales(true);
    }

    const getSelectedChord = (selectedChord: any, selectedNotes: any, chordValues: any) => {
        changeSelectedValues(selectedNotes);
        changeChordsValues(chordValues);
        changeShowScales(true);
    }

    const onDelete = (chordValues: any) => {
        changeChordsValues(chordValues);
        changeShowScales(false);
    }

    useEffect(() => {
        if (allChordValues[0] == '') {
            changeShowProgressionScales(false);
        }
    }, [allChordValues]);

    const onAdd = (chordValues: any) => {
        changeChordsValues(chordValues);
        changeShowProgressionScales(true);
    }

    const onClickAway = () => {
        changeShowScales(false);
    }

    useEffect(() => {
        setChordName(navigationData);
        changeShowScales(false);
    }, [navigationData]);

    return (
        <View style={styles.container}>
            <ProgressionBox getProgressionBoxData={getProgressionBoxData} activeOption={activeBox} chordName={chordName} chord={chord} navigationData={navigationData} getSelectedChord={getSelectedChord} onDelete={onDelete} onAdd={onAdd} onClickAway={onClickAway}/>
            { showAddChord && 
                <AddChordBox getNewChord={getNewChord}/>
            }

            { showScales && 
                <ScalesBox chordValues={selectedChordValues} allChordValues={allChordValues}/>
            }

            { showProgressionScales && 
                <ScalesForProgression chordValues={selectedChordValues} allChordValues={allChordValues}/>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#9DD6FF',
        flex: 1,
        alignItems: 'center',
        marginBottom: '25%',
    },
  });