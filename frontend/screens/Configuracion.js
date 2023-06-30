import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { TextInput } from "@react-native-material/core";
import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';

export default function Configuracion({ navigation }) {
    const loadJornada = async () => {
        const data = await getJornada()
        console.log(data)
        setJornada([data])
    }
    const [fontsLoaded, setFontsLoaded] = useState(false);
    useEffect(() => {
        if (!fontsLoaded) {
            loadFonts();
        }
        loadJornada()
    })

    const loadFonts = async () => {
        await Font.loadAsync({
            'alata': require('../assets/fonts/Alata/Alata.ttf'),
            'inter': require('../assets/fonts/Inter/Inter.ttf'),
        });
        setFontsLoaded(true);
    }
    return (
        <View style={styles.container}>
            <View style={{ margin: '2rem' }}>
                <TouchableOpacity onPress={() => { navigation.navigate('Usuario') }}>
                    <Icon icon="formkit:arrowleft" width={25} />
                </TouchableOpacity>
                <Text style>Snifterly</Text>
                <View >

                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    titulo: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: '2rem',
        marginTop: '3rem',
        marginBottom: '8rem',
        fontFamily: 'alata',
        color: 'white',
    },
});