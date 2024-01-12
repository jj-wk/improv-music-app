import { StyleSheet, Button, View, Text, Pressable, TextInput, Animated } from 'react-native';
import { Component, useState, useRef, useEffect } from 'react'
import GroupedScales from '../components/GroupedScales';
import SingleScale from '../components/SingleScale';
import { Entypo } from '@expo/vector-icons';

export default function ScalesForProgression({chordValues, allChordValues} : {chordValues:any, allChordValues:any}) {
    const noteNames = ['C','C#/Db','D','D#/Eb','E','F','F#/Gb','G','G#/Ab','A','A#/Bb','B'];
    const [allScales, editAllScales] = useState(fillScaleArray);
    const [scalesToReturn, changeReturningScales] = useState([{key: 'C', scale: 'Major', notes: [0,2,4,5,7,9,11], group: 'Major'}]);
    const [showProgressionScales, changeShowProgressionScales] = useState(false);

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
            // scales.push({key: noteNames[i], scale: 'Chromatic', notes: [0,1,2,3,4,5,6,7,8,9,10,11].map(n => n + i), group: 'Jazz'})
            scales.push({key: noteNames[i], scale: 'Dominant Bebop', notes: [0,2,4,5,7,9,10,11].map(n => n + i), group: 'Jazz'})
            scales.push({key: noteNames[i], scale: 'Major Bebop', notes: [0,2,4,5,7,8,9,11].map(n => n + i), group: 'Jazz'})
            scales.push({key: noteNames[i], scale: 'Minor Bebop', notes: [0,2,3,5,7,9,10,11].map(n => n + i), group: 'Jazz'})
        }

        return [...scales];
    }

    const printSelected = () => {
        // console.log(allChordValues);

        let testArray = allChordValues.join();
        let found = testArray.split(',');
        found = found.filter((n: any) => n).map(Number).filter(Number.isInteger);

        const unique = (value:any, index:any, self:any) => {
            return self.indexOf(value) === index;
        }

        const uniqueFound = found.filter(unique);

        //function that determines whether value is present in array (binary search algorithm)
        const recursiveFunction = (arr: any, x: any, start: any, end: any):boolean => {
            if (start > end) return false;
              
            let mid=Math.floor((start + end)/2);
            
            if (arr[mid]===x) return true;
                    
            if(arr[mid] > x)
                return recursiveFunction(arr, x, start, mid-1);
            else
                return recursiveFunction(arr, x, mid+1, end);
        }

        //counter to see the number of scales checked
        let timesRun = 0;

        //array that will hold all scales that work for given chord
        const workingScales: any[] = [];

        //function that triggers the recursive function for all scales
        //takes qualityIndex as parameter so database indexing can take place
        const check = () => {

            //cycles through all scales
            for (let i=0; i<allScales.length; i++) {

                //makes an array with the chordValues but in the range of the given scale
                let chordValuesShift = uniqueFound.map(function(value:any){
                    if(value - allScales[i].notes[0] < 0){
                        return value + 12;
                    } 
                    else if (value - allScales[i].notes[allScales[i].notes.length - 1] > 12){
                        return value - 24;
                    }
                    else if (value - allScales[i].notes[allScales[i].notes.length - 1] > 0){
                        return value - 12;
                    }
                    else {
                        return value;
                    }
                });

                timesRun++;

                //puts chordValueShift array in order after normalizing it to range of given scale
                chordValuesShift = chordValuesShift.sort(function(a: any, b: any){return a - b}).filter(unique);

                let scaleFit = 0;

                //duplicates current scale so that notes can be removed without loss of data
                let currentScale = allScales[i].notes;

                for (let j=0; j<chordValuesShift.length; j++) {
                    if (recursiveFunction(currentScale, chordValuesShift[j], 0, currentScale.length-1)) {
                        scaleFit++;
                    }

                    //removes any values from current scale that are smaller than the
                    //value that is currently being checked, so that the recursive
                    //algorithm is more efficient
                    currentScale = currentScale.filter(a => a > chordValuesShift[j]);
                }
    
                //checks if all values are present in scale, and adds the scale object to an array
                if (scaleFit >= chordValuesShift.length - 1) {
                    workingScales.push(allScales[i]);
                }
            }
        }

        check();

        workingScales.push({key: '', scale: 'Chromatic', notes: [0,1,2,3,4,5,6,7,8,9,10,11], group: 'Jazz'});

        // console.log(' ');
        // console.log('working scales: ' + workingScales.length);
        
        changeReturningScales(workingScales);
    }

    const showHideScales = () => {
        printSelected();
        if (showProgressionScales) {
            changeShowProgressionScales(false);
        }
        else {
            changeShowProgressionScales(true);
        }
    }

    useEffect(() => {
        changeShowProgressionScales(false);
        printSelected();
    }, [allChordValues]);

    return (
        <View style={{ width: '90%', marginTop: 15 }}>
            <Pressable onPress={showHideScales} style={{ flexDirection: 'row', alignItems: 'center'}}>
                { !showProgressionScales && 
                    <Entypo name="chevron-right" size={24} color="black" />
                }
                { showProgressionScales && 
                    <Entypo name="chevron-down" size={24} color="black" />
                }
                <Text style={styles.header}>Progression Scales</Text>
            </Pressable>
            { showProgressionScales && 
                <View style={styles.scaleContainer}>
                    <GroupedScales scalesToReturn={scalesToReturn}/>

                    {/* below is the way scales were previously returned */}
                    {/* {scalesToReturn.map(i => {
                        return <SingleScale key={i.notes.join()} scale={i}/>
                    })} */}
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    scaleContainer: {
        width: '100%',
        alignItems: 'center', 
        justifyContent: 'center',
    },
    header: {
        fontWeight: 'bold',
        fontSize: 30,
        fontStyle: 'italic',
    },
});