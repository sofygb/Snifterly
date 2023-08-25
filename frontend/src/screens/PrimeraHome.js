import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View, Alert, SafeAreaView, TouchableOpacity, InputAccessoryView, ScrollView } from 'react-native';
import { TextInput } from "@react-native-material/core";
import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { getJornadaActiva, getSiguientePantalla, setSiguientePantalla } from '../../api';
//import jornadaActiva from '../../api.js'
//import siguientePantalla from '../../api.js'

export default function PrimeraHome({ navigation }) {

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

    /*
    var jornadaActiva = getJornadaActiva()
    var siguientePantalla = getSiguientePantalla()

    if (!jornadaActiva) {
        setSiguientePantalla('PrimeraHome')
        //siguientePantalla = 'PrimeraHome'
    }
    else if(jornadaActiva) {
        setSiguientePantalla('Home')
        //siguientePantalla = 'Home'
    }
    siguientePantalla = getSiguientePantalla()
    */

    const loadFonts = async () => {
        await Font.loadAsync({
            'alata': require('../assets/fonts/Alata/Alata.ttf'),
            'inter': require('../assets/fonts/Inter/Inter.ttf'),
        });
        setFontsLoaded(true);
    }
    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Snifterly</Text>

            <View style={styles.botonAgregar}>
                <TouchableOpacity onPress={() => { crearJornada(), navigation.navigate('IngresoDeDatos') }}>
                    <Icon icon="icon-park-solid:add-one" color="white" width={'9rem'} />
                </TouchableOpacity>
                <Text style={{ textAlign: 'center', color: 'white', fontSize: '1.5rem', fontFamily: 'Alata', marginTop: '1rem' }}>nueva jornada</Text>
            </View>

            <View style={styles.footer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => { navigation.navigate('PrimeraHome') }}>
                        <Icon icon="material-symbols:home" width={'2.5rem'} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate('Historial') }}>
                        <Icon icon="zondicons:calendar" width={'2.3rem'} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate('Usuario') }}>
                        <Icon icon="mdi:account" width={'2.5rem'} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'orange',
        fontFamily: 'alata',
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
    footer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '1rem',
        width: '100%',
        paddingLeft: '2rem',
        paddingRight: '2rem',
    },
    botonAgregar: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
});