import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native';
import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { ActionTypes, setContextState, useContextState } from '../navigation/contextState';
import { updateUsuario } from "../../api";
import { Input } from '@rneui/base';

export default function Configuracion({ navigation }) {
    const { contextState, setContextState } = useContextState()
    const [fontsLoaded, setFontsLoaded] = useState(false)
    const [mostrarContrasenia, setMostrarContrasenia] = useState(false)
    const [nombre, setNombre] = useState(contextState.usuario.nombre)
    const [fechaNacimiento, setFechaNacimiento] = useState(new Date(contextState.usuario.fechaNacimiento).toDateString())
    const [peso, setPeso] = useState(contextState.usuario.peso)
    const [altura, SetAltura] = useState(contextState.usuario.altura)
    const [email, setEmail] = useState(contextState.usuario.email)
    const [contrasenia, setContrasenia] = useState(contextState.usuario.contrasenia)

    const toggleMostrarContrasenia = () => {
        setMostrarContrasenia(!mostrarContrasenia);
    };

    const guardarNuevosDatos = () => {
        if (/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(email)) {
            if(!/[^\d.\d]|[.]\Z|\A[.]|[\.]{2}/.test(peso + altura) && (new String(peso+altura)).split(".").length <= 3){
                console.log("nombre del usuario que se esta creando: ", contextState.usuario.nombre) 
                if (contrasenia.length >= 10) {
                    const fechaNueva = new Date(fechaNacimiento)
                    updateUsuario(nombre, `${fechaNueva.getFullYear()}-${fechaNueva.getMonth()}-${fechaNueva.getDate()}`, peso, altura, email, contrasenia, contextState.usuario.idUsuario)
                    setContextState({
                        type: ActionTypes.SetNombre,
                        value: nombre
                    });
                    setContextState({
                        type: ActionTypes.SetContrasenia,
                        value: contrasenia
                    });
                    setContextState({
                        type: ActionTypes.SetEmail,
                        value: email
                    });
                    setContextState({
                        type: ActionTypes.SetFechaNacimiento,
                        value: fechaNacimiento
                    });
                    setContextState({
                        type: ActionTypes.SetPeso,
                        value: peso
                    });
                    setContextState({
                        type: ActionTypes.SetAltura,
                        value: altura
                    });
                }
                else {
                    console.error("Error: La contraseña debe ser mayor a 10 caracteres")
                }
            }
            else{
                console.error('Error: Los valores de peso o altura introducidos no son números')
            }
        }
        else {
            console.error("Error: El mail ingresado es inválido")
        }
    }

    useEffect(() => {
        if (!fontsLoaded) {
            loadFonts();
        }
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
            <View style={{ margin: 32 }}>
                <View style={{ flexDirection: "row", marginTop: 24 }}>
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
                    <TextInput style={{ fontSize: 16, fontFamily: 'Alata', marginLeft: 24 }} value={nombre} placeholder={nombre} onChangeText={nombre => setNombre(nombre)} />
                </View>
                <View style={styles.cuadroDos}>
                    <View style={{ flexDirection: "row", }}>
                        <Text style={{ fontSize: 16, fontFamily: 'Alata', fontWeight: "bold", }}>Mail</Text>
                        <TextInput style={{ fontSize: 16, fontFamily: 'Alata', marginLeft: 24 }} value={email} placeholder={email} onChangeText={email => setEmail(email)} />
                    </View>
                </View>

                <View style={styles.cuadroDos}>
                    <View style={{ flexDirection: "row", }}>
                        <Text style={{ fontSize: 16, fontFamily: 'Alata', fontWeight: "bold", }}>Contraseña</Text>
                        <TextInput style={{ fontSize: 16, fontFamily: 'Alata', marginLeft: 24 }} value={contrasenia} placeholder={mostrarContrasenia ? contrasenia : '********'} onChangeText={contrasenia => setContrasenia(contrasenia)} />
                        {/* <TouchableOpacity style={{ flex: 1, display: 'flex', alignItems: 'flex-end' }} onPress={toggleMostrarContrasenia}>
                            <Icon icon={mostrarContrasenia ? 'mdi:eye-off' : 'mdi:eye'} width={30} />
                        </TouchableOpacity> */}
                    </View>
                </View>

                <View style={styles.cuadroDos}>
                    <View style={{ flexDirection: "row", }}>
                        <Text style={{ fontSize: 16, fontFamily: 'Alata', fontWeight: "bold", }}>Peso</Text>
                        <TextInput style={{ fontSize: 16, fontFamily: 'Alata', marginLeft: 24 }} value={peso} placeholder={peso} onChangeText={peso => setPeso(peso)} />
                    </View>
                </View>

                <View style={styles.cuadroDos}>
                    <View style={{ flexDirection: "row", }}>
                        <Text style={{ fontSize: 16, fontFamily: 'Alata', fontWeight: "bold", }}>Altura</Text>
                        <TextInput style={{ fontSize: 16, fontFamily: 'Alata', marginLeft: 24 }} value={altura} placeholder={altura} onChangeText={altura => SetAltura(altura)} />
                    </View>
                </View>

                <View style={styles.cuadroDos}>
                    <View style={{ flexDirection: "row", }}>
                        <Text style={{ fontSize: 16, fontFamily: 'Alata', fontWeight: "bold", }}>Fecha de nacimiento</Text> {/* no se xq, pero aunque no cambies la fecha en la BD se pone 0000-00-00 */}
                        <TextInput style={{ fontSize: 16, fontFamily: 'Alata', marginLeft: 24 }} value={fechaNacimiento} placeholder={fechaNacimiento} onChangeText={fechaNacimiento => setFechaNacimiento(fechaNacimiento)} />{/**.toDateString() */}
                    </View>
                </View>

                <View style={{ display: 'flex', alignItems: 'center', marginTop: 16 }}>
                    <TouchableOpacity onPress={() => guardarNuevosDatos()} style={styles.botonGuardar}>
                        <Text style={{ color: 'white', fontFamily: 'inter', textAlign: 'center', fontSize: 16, }}>Guardar</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.cerrarSesion}>
                    <TouchableOpacity onPress={() => { navigation.navigate('CerrarSesion') }} style={[{ marginTop: 8 }]} >
                        <Text style={[{ color: 'red', fontSize: 16, fontFamily: 'inter', }]}>Cerrar sesión</Text>
                    </TouchableOpacity>
                </View>

            </View>
            <View style={styles.footer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => { navigation.navigate('PrimeraHome') }}>
                        <Icon icon="material-symbols:home" width={40} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate('Historial') }}>
                        <Icon icon="zondicons:calendar" width={40} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate('Usuario') }}>
                        <Icon icon="mdi:account" width={40} />
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
        padding: 8,
        marginRight: 4.8,
        marginLeft: 4.8,
        marginTop: 24,
        minWidth: 288,
        padding: 16,
        borderRadius: 20,
        backgroundColor: "#F2F2F2",
        fontFamily: "alata",
    },
    titulo: {
        display: 'flex',
        alignContent: 'flex-start',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: 32,
        marginBottom: 8,
        fontFamily: 'alata',
        paddingLeft: 72,
    },
    cuadro: {
        display: "flex",
        padding: 8,
        marginRight: 4.8,
        marginLeft: 4.8,
        marginTop: 24,
        minWidth: 288,
        padding: 16,
        borderRadius: 20,
        backgroundColor: "#FFECE0",
        fontFamily: "alata",
    },
    nombreStyle: {
        fontSize: 16,
        fontFamily: 'Alata',
        fontWeight: "bold",
        margin: 16
    },
    botonGuardar: {
        maxHeight: 48,
        minWidth: 144,
        backgroundColor: "#5654E1",
        borderRadius: 15,
        padding: 10,
    },
    cerrarSesion: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: 16,
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: 16,
        width: '100%',
        paddingLeft: 32,
        paddingRight: 32,
        Height: 48,
    },
});