import { StyleSheet, Button, View, Text, Pressable, TextInput, Animated } from 'react-native';
import { Component, useState, useRef, useEffect } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function AddExtension({addOrRemoveExtension, option, changeExtension} : {addOrRemoveExtension:any, option:any, changeExtension:any}) {
    const [number, onChangeText] = useState("7");
    const [accidental, accidentalChange] = useState("");

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
            toValue: 76,
            duration: 200,
            useNativeDriver: true,
          }).start();
    };
    const flat = () => {
        accidentalChange("b");
        Animated.timing(accidentalAnimation, {
            toValue: 152,
            duration: 200,
            useNativeDriver: true,
          }).start();
    };

    const changeText = (text: string) => {
        onChangeText(text);
    };

    useEffect(() => {
        changeExtension(accidental+number,number,accidental,option);
    }, [accidental]);

    useEffect(() => {
        changeExtension(accidental+number,number,accidental,option);
    }, [number]);

    return (
        <View style={[styles.extensionBox, styles.smallShadow]}>
            <TextInput 
                style={[styles.input, styles.smallShadow]}
                value={number}
                onChangeText={changeText}
                multiline={true}
                maxLength={2}
                keyboardType='numeric'
            />

            <View style={[styles.accidentalBox, styles.smallShadow]}>
                <Animated.View style={[styles.selectedAccidental, styles.smallShadow, {transform: [{translateX: accidentalAnimation}]}]}/>

                <Pressable onPress={natural}>
                    <MaterialCommunityIcons name="music-accidental-natural" size={21} color="black" />
                </Pressable>
                <Pressable onPress={sharp}>
                    <MaterialCommunityIcons name="music-accidental-sharp" size={21} color="black" />
                </Pressable>
                <Pressable onPress={flat}>
                    <MaterialCommunityIcons name="music-accidental-flat" size={21} color="black" />
                </Pressable>
            </View>

            <Pressable onPress={() => addOrRemoveExtension(accidental + number,option)}>
                <MaterialCommunityIcons name="minus-circle-outline" size={24} color="black" />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    extensionBox: {
        marginTop: 5,
        marginBottom: 5,
        height: 40, 
        width: '94%',
        borderRadius: 8,
        backgroundColor: 'white',
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: 'space-between',
        padding: '2%'
    },
    input: {
        height: 30, 
        width: '15%',
        borderRadius: 8,
        fontSize: 22,
        textAlign: 'center',
        backgroundColor: 'white',
    },
    accidentalBox: {
        height: 30, 
        width: '70%',
        borderRadius: 8,
        backgroundColor: 'white',
        padding: 5,
        paddingHorizontal: 10,
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    selectedAccidental: {
        marginLeft: 5,
        height: 25, 
        width: 30,
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