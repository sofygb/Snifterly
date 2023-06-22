import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View, Alert, SafeAreaView, TouchableOpacity, InputAccessoryView, ScrollView } from 'react-native';
import { TextInput } from "@react-native-material/core";
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { HomeFilled } from '@ant-design/icons';
import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';

export default function InicioSesion({ navigation }) {
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
        <View>
            <Text style={styles.titulo}>Te damos la bienvenida a Snifterly!</Text>
            <Text>SIGN IN</Text>
            <TextInput variant="outlined" label="Label" style={{ margin: 16 }} />
            <TextInput variant="outlined" label="Label" style={{ margin: 16 }} />
            <TouchableOpacity style={styles.finalizarJornada}>
                <Text style={[{ color: 'blue', fontSize: '1rem', fontFamily: 'inter' }]}>Finalizar jornada</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botonAceptar} onPress={() => { navigation.navigate('PrimeraHome') }}>
                <Text style={[{ color: 'white', fontSize: '1rem', fontFamily: 'inter' }]}>Log in</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titulo: {

    },
    footer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '1rem',
        width: '100%',
        paddingLeft: '2rem',
        paddingRight: '2rem',
    },

});