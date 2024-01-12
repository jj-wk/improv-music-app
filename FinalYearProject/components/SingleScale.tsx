import { StyleSheet, Button, View, Text, Pressable, TextInput, Animated, Image } from 'react-native';
import { Component, useState, useRef, useEffect } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ScalesBox({scale, accidental} : {scale:any, accidental:any}) {
    const noteNames = ['C','C#/Db','D','D#/Eb','E','F','F#/Gb','G','G#/Ab','A','A#/Bb','B',
                       'C','C#/Db','D','D#/Eb','E','F','F#/Gb','G','G#/Ab','A','A#/Bb','B'];

    const yCoordinate = (value : any) => {
        let blackKeys = [1,3,6,8,10,13,15,18,20,22];

        let coordinate = (value*-2.35) + 39.5;

        if (value <= 4) {
        }
        else if (value <= 11) {
            coordinate -= 2.35;
        }
        else if (value <= 16) {
            coordinate -= 4.7;
        }
        else if (value <= 23) {
            coordinate -= 7.05;
        }

        if (blackKeys.includes(value)) {
            if (accidental == '#') {
                coordinate += 2.35;
            }
            else if (accidental == 'b') {
                coordinate -= 2.35;
            }
            
            return coordinate
        }
        else {
            return coordinate
        }
    }

    const yAdditional = () => {
        if (scale.notes.length == 12) {
            return -5.25
        }
        else {
            return 1
        }
    }

    const xAdditional = () => {
        if (scale.notes.length == 12) {
            return 2.75
        }
        else {
            return 0
        }
    }

    const checkAccidental = () => {
        if (accidental == '#') {
            return true
        }
        else if (accidental == 'b') {
            return false
        }
    }

    const checkLine = (value:any) => {
        let outsideSharp = [0,1,21,22,23]
        let outsideFlat = [0,20,21,22,23]

        if (accidental == '#') {
            if (outsideSharp.includes(value)){
                return true
            }
            else {
                return false
            }
        }
        else {
            if (outsideFlat.includes(value)){
                return true
            }
            else {
                return false
            }
        }
    }


    return (
        <View style={[styles.scaleBox2, styles.shadow]}>
            <Text style={styles.title}>
                {scale.key + ' ' + scale.scale}
            </Text>
            <Image style={styles.image} source={require('../assets/images/Sheet.png')}/>

            {scale.notes.map((i:any) => {
                return <Image style={[styles.note, { transform: [{ 
                    translateX: ((275/scale.notes.length)*scale.notes.indexOf(i))+51}, { 
                    translateY: yCoordinate(i) }] }]} source={require('../assets/images/Note.png')} key={i}/>
            })}

            {scale.notes.map((i:any) => {
                if (checkLine(i)) {
                    return <Image style={[styles.line, { transform: [{ 
                        translateX: ((275/scale.notes.length)*scale.notes.indexOf(i))+48}, { 
                        translateY: yCoordinate(i) }] }]} source={require('../assets/images/Line.png')} key={i}/>
                }
            })}

            {checkAccidental() && scale.notes.map((i:any) => {
                let blackKeys = [1,3,6,8,10,13,15,18,20,22];
                if (blackKeys.includes(i)) {
                    return <MaterialCommunityIcons name={"music-accidental-sharp"} size={22} color="black" style={[styles.accidental, { transform: [{ 
                        translateX: ((275/scale.notes.length)*scale.notes.indexOf(i))+34.75 + xAdditional() }, { 
                        translateY: yCoordinate(i) + yAdditional() }] }]} source={require('../assets/images/Note.png')} key={i}/>
                }
            })}

            {!checkAccidental() && scale.notes.map((i:any) => {
                let blackKeys = [1,3,6,8,10,13,15,18,20,22];
                if (blackKeys.includes(i)) {
                    return <MaterialCommunityIcons name={"music-accidental-flat"} size={22} color="black" style={[styles.accidental, { transform: [{ 
                        translateX: ((275/scale.notes.length)*scale.notes.indexOf(i))+34.75 + xAdditional() }, { 
                        translateY: yCoordinate(i) + yAdditional() }] }]} source={require('../assets/images/Note.png')} key={i}/>
                }
            })}
        </View>

        // <View style={[styles.scaleBox, styles.shadow]}>
        //     <Text>
        //         {scale.key + ' ' + scale.scale}
        //     </Text>
        //     <Text>
        //         {scale.notes.map((s:any) => noteNames[s] + ' ')}
        //     </Text>
        // </View>
    );
}

const styles = StyleSheet.create({
    scaleBox: {
        width: '100%',
        height: 80,
        backgroundColor: 'white',
        borderRadius: 15,
        alignItems: 'center', 
        justifyContent: 'center',
        padding: 10,
        marginTop: 10,
    },
    scaleBox2: {
        width: '100%',
        height: 100,
        backgroundColor: 'white',
        borderRadius: 15,
        justifyContent: 'center',
        padding: 10,
        paddingTop: 15,
        marginTop: 10,
    },
    title: {
        fontWeight: '200',
        fontSize: 18,
        fontStyle: 'italic',
    },
    image: {
        width: '100%',
        height: '85%',
        marginTop: 5,
        marginBottom: 5,
    },
    note: {
        width: 17,
        height: 10.71,
        position: 'absolute',
    },
    line: {
        width: 23,
        height: 1,
        position: 'absolute',
    },
    accidental: {
        position: 'absolute',
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 16,
    },
});