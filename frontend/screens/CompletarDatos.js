import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { TextInput } from "@react-native-material/core";
import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';

export default function CompletarDatos({ navigation }) {
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
            
            <Image source={require('../assets/icon.png')} style={styles.imagen}/>
            
            <Text style={styles.titulo}>Te damos la bienvenida a Snifterly!</Text>
            <Text style={styles.texto}>SIGN UP</Text>

            <TextInput variant="outlined" label="nombre" style={{ margin: 16 }} />
            <TextInput variant="outlined" label="peso" style={{ margin: 16 }} />
            <TextInput variant="outlined" label="altura" style={{ margin: 16 }} />

            <View style={styles.espacioBotonLogin}>
                <TouchableOpacity style={styles.botonLogin} onPress={() => { navigation.navigate('PrimeraHome') }}>
                    <Text style={[{ color: 'white', fontSize: '1.2rem', fontFamily: 'inter' }]}>Ok</Text>
                </TouchableOpacity>
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
        fontSize: '2rem',
        textAlign: 'center',
        margin: '1rem'
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
    imagen: {
        width: '75%',
        height: '20%',
        resizeMode: "contain",
        display: 'flex',
        alignSelf: 'center',
        marginTop: '4rem',
        borderRadius: 20,
    },
    texto: {
        textAlign: 'center',
        fontSize: '1.2rem',
    },
    finalizarJornada: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '1rem',
        marginTop: '0.8rem',
    },
    botonAceptar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        maxHeight: '3rem',
        maxWidth: '5rem',
        backgroundColor: "#5654E1",
        borderRadius: 15,
        padding: 10,
    },
    espacioBotonLogin: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    botonLogin: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '3rem',
        minWidth: '20rem',
        backgroundColor: "#5654E1",
        borderRadius: 18,
        padding: 10,
    },
});