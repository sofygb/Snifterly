import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { TextInput } from "@react-native-material/core";
import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { ActionTypes, setContextState, useContextState } from '../navigation/contextState';

export default function Configuracion({ navigation }) {
    const { contextState, setContextState } = useContextState()
    const [mostrarContrasenia, setMostrarContrasenia] = useState(false);

    const toggleMostrarContrasenia = () => {
        setMostrarContrasenia(!mostrarContrasenia);
    };
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
                <View style={{flexDirection: "row", marginTop: '2rem'}}>
                    <TouchableOpacity onPress={() => { navigation.navigate('Usuario') }}>
                        <Icon icon="basil:cross-outline" width={45} />
                    </TouchableOpacity>
                    <Text style={styles.titulo}>Snifterly</Text>
                </View>
                
                <View style={[styles.cuadro, { flexDirection: "row" }]}>
                    <Image
                        source={{
                            uri: 'https://media.revistavanityfair.es/photos/60e82a56bf8d45dd8c6f5b7e/master/w_1600%2Cc_limit/250726.jpg',
                            method: 'POST',
                            headers: {
                                Pragma: 'no-cache',
                            },
                        }}
                        style={{ width: 100, height: 100, borderRadius: 10 }}
                    />
                    <Text style={styles.nombreStyle}>{contextState.usuario.nombre}</Text>
                </View>

                <View style={styles.cuadroDos}>
                    <View style={{flexDirection: "row",}}>
                        <Text style={{fontSize: '1rem',fontFamily: 'Alata',fontWeight: "bold",}}>mail</Text>
                        <Text style={{fontSize: '1rem',fontFamily: 'Alata', marginLeft: '1.5rem'}}>{contextState.usuario.email}</Text>
                    </View>
                </View>
                <View style={styles.cuadroDos}>
                    <View style={{flexDirection: "row",}}>
                        <Text style={{fontSize: '1rem',fontFamily: 'Alata',fontWeight: "bold",}}>Contraseña</Text>
                        <Text style={{fontSize: '1rem',fontFamily: 'Alata', marginLeft: '1.5rem'}}>{mostrarContrasenia ? contextState.usuario.contrasenia : '********'}</Text>
                        <TouchableOpacity style={{flex: 1, display: 'flex', alignItems: 'flex-end'}} onPress={toggleMostrarContrasenia}>
                            <Icon icon={mostrarContrasenia ? 'mdi:eye-off' : 'mdi:eye'} width={30} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{display: 'flex', alignItems: 'center', marginTop: '2rem'}}>
                    <TouchableOpacity style={styles.botonGuardar}>
                        <Text style={{color: 'white', fontFamily: 'inter', textAlign: 'center',fontSize: '1rem',}}>Guardar</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={styles.cerrarSesion}>
                    <TouchableOpacity onPress={() => { navigation.navigate('CerrarSesion') }}>
                    <Text style={[{ color: 'red', fontSize: '1rem', fontFamily: 'inter', marginTop: '11rem', }]}>Cerrar sesión</Text>
                    </TouchableOpacity>
                </View>

            </View>
            <View style={styles.footer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={() => { navigation.navigate('PrimeraHome') }}>
                            <Icon icon="material-symbols:home" width={'2.5rem'} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { navigation.navigate('Historial') }}>
                            <Icon icon="zondicons:calendar" width={'2.3rem'} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { navigation.navigate('Usuario') }}>
                            <Icon icon="mdi:account" width={'2.5rem'} />
                        </TouchableOpacity>
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
    cuadroDos: {
        display: "flex",
        padding: "0.5rem",
        marginRight: "0.3rem",
        marginLeft: "0.3rem",
        marginTop: "1.5rem ",
        minWidth: "18rem",
        padding: '1rem',
        borderRadius: 20,
        backgroundColor: "#F2F2F2",
        fontFamily: "alata",
    },
    titulo: {
        display: 'flex',
        alignContent: 'flex-start',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: '2rem',
        marginBottom: '2rem',
        fontFamily: 'alata',
        paddingLeft: '4.5rem',
    },
    cuadro: {
        display: "flex",
        padding: "0.5rem",
        marginRight: "0.3rem",
        marginLeft: "0.3rem",
        marginTop: "1.5rem ",
        minWidth: "18rem",
        padding: '1rem',
        borderRadius: 20,
        backgroundColor: "#FFECE0",
        fontFamily: "alata",
    },
    nombreStyle: {
        fontSize: '1rem',
        fontFamily: 'Alata',
        fontWeight: "bold",
        margin: '1rem'
    },
    botonGuardar: {
        maxHeight: '3rem',
        minWidth: '9rem',
        backgroundColor: "#5654E1",
        borderRadius: 15,
        padding: 10,
    },
    cerrarSesion: {
        
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '1rem',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '1rem',
        width: '100%',
        paddingLeft: "2rem",
        paddingRight: "2rem",
        Height: '3rem',
    },
});