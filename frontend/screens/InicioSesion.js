import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { TextInput } from "@react-native-material/core";
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
            
            <Image source={require('../assets/icon.png')} style={styles.imagen}/>
            
            <Text style={styles.titulo}>Te damos la bienvenida a Snifterly!</Text>
            <Text style={styles.texto}>SIGN IN</Text>
            <TextInput variant="outlined" label="Usuario" style={{ margin: 16 }} />
            <TextInput variant="outlined" label="Contraseña" style={{ margin: 16 }} />
            <TouchableOpacity style={styles.finalizarJornada}>
                <Text style={[{ color: 'blue', fontSize: '1rem', fontFamily: 'inter', textAlign: 'right', marginRight: '1rem'}]}>¿Te olvidaste la contraseña?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botonAceptar} onPress={() => { navigation.navigate('PrimeraHome') }}>
                <Text style={[{ color: 'white', fontSize: '1rem', fontFamily: 'inter' }]}>Log in</Text>
            </TouchableOpacity>
            <Icon icon="ri:google-fill" color="white" />
            <Icon icon="ant-design:facebook-filled" color="white" />
            <View style={{flexDirection: 'row', display: 'flex', justifyContent: 'center', alignItems: 'flex-end'}}>
                <Text>¿No tienes una cuenta? </Text>
                <TouchableOpacity onPress={() => { navigation.navigate('CrearCuenta') }}>
                    <Text style={{color: 'blue'}}>Create una</Text>
                </TouchableOpacity>
            </View>
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
        width: '80%',
        height: '25%',
        resizeMode: "contain",
        display: 'flex',
        alignSelf: 'center',
        marginTop: '4rem'
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
        minWidth: '8rem',
        backgroundColor: "#5654E1",
        borderRadius: 15,
        padding: 10,
    },
});