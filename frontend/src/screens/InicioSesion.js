import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { TextInput } from "@react-native-material/core";
import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { useIsFocused } from "@react-navigation/native";
import { getUsuarios, getJornadaActiva2 } from '../../api';
import { ActionTypes, setContextState, useContextState } from '../navigation/contextState';

export default function InicioSesion({ navigation }) {
    const [mail, setMail] = React.useState("");
    const [contraseña, setContraseña] = React.useState("");
    const [usuarios, setUsuarios] = React.useState([]);
    const [jornadaActiva, setJornadaActiva] = React.useState([]);
    const isFocused = useIsFocused();
    const [mostrarContrasenia, setMostrarContrasenia] = useState(false);
    
    const loadUsuarios = async () => {
        const data = await getUsuarios()
        setUsuarios(data)
        console.log(data)
    }
    const loadJornadaActiva = async () => {
        const data = await getJornadaActiva2()
        setJornadaActiva(data)
        console.log(data)
    }

    useEffect(() =>{
        loadUsuarios()
        loadJornadaActiva()
    },[isFocused])

    const [fontsLoaded, setFontsLoaded] = useState(false);
    useEffect(() => {
        if (!fontsLoaded) {
            loadFonts();
        }
    },[])

    const loadFonts = async () => {
        await Font.loadAsync({
            'alata': require('../assets/fonts/Alata/Alata.ttf'),
            'inter': require('../assets/fonts/Inter/Inter.ttf'),
        });
        setFontsLoaded(true);
    }

    const { contextState, setContextState } = useContextState()
    // const logIn = async () => {
    //     try {
    //         await login(mail, contraseña)
    //         if(contextState.jornada.idJornada != -1){
    //             navigation.navigate('Home')
    //         }
    //         else{
    //             navigation.navigate('PrimeraHome')
    //         }
    //     } catch (error) {
    //         console.error('Error al iniciar sesión:', error);
    //     }
    // }
    const logIn = () => {
        const validacion = usuarios.findIndex(usuario => usuario.email === mail && usuario.contrasenia === contraseña)

        if(validacion != -1) {
            setContextState({
                type: ActionTypes.SetIdUsuario,
                value: usuarios[validacion].idUsuario
            });
            setContextState({
                type: ActionTypes.SetNombre,
                value: usuarios[validacion].nombre
            });
            setContextState({
                type: ActionTypes.SetContrasenia,
                value: usuarios[validacion].contrasenia
            });
            setContextState({
                type: ActionTypes.SetEmail,
                value: usuarios[validacion].email
            });
            setContextState({
                type: ActionTypes.SetFechaNacimiento,
                value: new Date(usuarios[validacion].fechaNacimiento)
            });
            setContextState({
                type: ActionTypes.SetFechaCreacion,
                value: new Date(usuarios[validacion].fechaCreacion)
            });
            setContextState({
                type: ActionTypes.SetModResistencia,
                value: usuarios[validacion].modResistencia
            });
            setContextState({
                type: ActionTypes.SetPeso,
                value: usuarios[validacion].peso
            });
            setContextState({
                type: ActionTypes.SetAltura,
                value: usuarios[validacion].altura
            });
            var hayJornada = false
            jornadaActiva.forEach((jornada) => {
                if(jornada.idUsuario === usuarios[validacion].idUsuario){
                    hayJornada = true
                }
            })
            if(hayJornada){
                navigation.navigate('Home')
            }
            else{
                navigation.navigate('PrimeraHome')
            }
        }
        else{
            console.error("Error: Usuario no encontrado")
        }
    }

    return (
        <View style={styles.container}>
            
            <Image source={require('../assets/icon.png')} style={styles.imagen}/>
            
            <Text style={styles.titulo}>Te damos la bienvenida a Snifterly!</Text>
            <Text style={styles.texto}>SIGN IN</Text>

            <TextInput variant="outlined" label="Mail" style={{ margin: 14, marginRight: 32, marginLeft: 32, borderRadius: 10 }} value={mail} onChangeText={mail => setMail(mail)}/>
            <TextInput variant="outlined" label="Contraseña" style={{ margin: 14, marginRight: 32, marginLeft: 32, borderRadius: 10  }} value={contraseña} secureTextEntry={!mostrarContrasenia} onChangeText={contraseña => setContraseña(contraseña)} trailing={<TouchableOpacity onPress={() => setMostrarContrasenia(!mostrarContrasenia)}><Icon icon={mostrarContrasenia ? 'mdi:eye-off' : 'mdi:eye'} width={30} /></TouchableOpacity>}/>
            
            <TouchableOpacity style={styles.botonContrasena}>
                <Text style={[{ color: '#0D4CEF', fontSize: 14.4, fontFamily: 'inter', textAlign: 'right', marginRight: 16, marginBottom: 24, marginRight: 32}]}>¿Te olvidaste la contraseña?</Text>
            </TouchableOpacity>

            <View style={styles.espacioBotonLogin}>
                <TouchableOpacity style={styles.botonLogin} onPress={() => { logIn() }}>
                    <Text style={[{ color: 'white', fontSize: 19.3, fontFamily: 'inter' }]}>Log in</Text>
                </TouchableOpacity>
            </View>

            <Text style={{textAlign: 'center', marginTop: 24, marginBottom: 16, marginLeft: 16, marginRight: 16, fontSize: 19.3}}> ──────── Seguir con ────────</Text>

            <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-around',paddingLeft: 24, paddingRight: 24,}}>
                <TouchableOpacity style={{backgroundColor: '#40A2DA', minHeight: 56, minWidth: 160, borderRadius: 15, display: 'flex', justifyContent: 'center', }}>
                    <View style={{flexDirection: 'row', marginLeft: 4.8}}>
                        <Icon icon="ri:google-fill" color="white" width={36.8}/>
                        <Text style={{color: 'white', display: 'flex', alignItems: 'center', fontSize: 14.4}}>Google</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={{backgroundColor: '#0F3A8D', minHeight: 56, minWidth: 160, borderRadius: 15, display: 'flex', justifyContent: 'center', }}>
                    <View style={{flexDirection: 'row', marginLeft: 4.8}}>
                        <Icon icon="ant-design:facebook-filled" color="white" width={36.8}/>
                        <Text style={{color: 'white', display: 'flex', alignItems: 'center', fontSize: 14.4}}>Facebook</Text>
                    </View>
                </TouchableOpacity>
            </View>
        
            <View style={{flexDirection: 'row', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', marginTop: 32}}>
                <Text style={{fontSize: 16, fontFamily: 'inter' }}>¿No tienes una cuenta? </Text>
                <TouchableOpacity onPress={() => { navigation.navigate('CrearCuenta') }}>
                    <Text style={{color: 'blue', fontSize: 16, fontFamily: 'inter' }}>Create una</Text>
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
        fontSize: 32,
        textAlign: 'center',
        margin: 16,
        marginLeft: 24,
        marginRight: 24,
    },
    imagen: {
        width: 400,
        height: 200,
        resizeMode: "contain",
        display: 'flex',
        alignSelf: 'center',
        marginTop: 48,
        borderRadius: 30,
    },
    texto: {
        textAlign: 'center',
        fontSize: 19.2,
    },
    botonContrasena: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: 16,
    },
    botonLogin: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 48,
        minWidth: 320,
        backgroundColor: "#5654E1",
        borderRadius: 18,
        padding: 10,
    },
    espacioBotonLogin: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});