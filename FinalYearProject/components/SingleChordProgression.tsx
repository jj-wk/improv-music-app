import { StyleSheet, Button, View, Text, Pressable, TextInput, Animated } from 'react-native';
import { Component, useState, useRef, useEffect } from 'react'

export default function SingleChordProgression({ openProgression, title, chordNames, chordValues, num } : { openProgression:any, title:any, chordNames:any, chordValues:any, num:any }) {
    return (
        <Pressable onPress={() => openProgression(chordNames, chordValues, num)} style={[styles.container, styles.shadow]}>
            <Text style={styles.title}>{title}</Text>
            <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%'}}>
                <View style={styles.progressionBoxLine}>
                    <View style={[styles.chord, { borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }]}>
                        <Text style={styles.chordNames}>{chordNames[0]}</Text>
                    </View>
                    <View style={styles.chord}>
                        <Text style={styles.chordNames}>{chordNames[1]}</Text>
                    </View>
                    <View style={styles.chord}>
                        <Text style={styles.chordNames}>{chordNames[2]}</Text>
                    </View>
                    <View style={[styles.chord, { borderTopRightRadius: 8, borderBottomRightRadius: 8 }]}>
                        <Text style={styles.chordNames}>{chordNames[3]}</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: 110,
        backgroundColor: 'white',
        borderRadius: 15,
        justifyContent: 'center',
        padding: 10,
        paddingTop: 20,
        paddingBottom: 25,
        marginTop: 10,
    },
    title: {
        fontSize: 18,
        fontStyle: 'italic',
        marginBottom: 5,
    },
    progressionBoxLine: {
        backgroundColor: "#9DD6FF",
        width: '100%',
        height: '100%',
        borderRadius: 10,
        padding: 2,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    chord: {
        backgroundColor: 'white',
        width: '24.5%',
        height: '100%',
        alignItems: 'center', 
        justifyContent: 'center',
    },
    chordNames: {
        textAlign: 'center',
        fontWeight: '200',
        fontSize: 18,
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