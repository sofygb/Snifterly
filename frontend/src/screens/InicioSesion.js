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

            <TextInput variant="outlined" label="Mail" style={{ margin: 14, marginRight: '2rem', marginLeft: '2rem', borderRadius: 10 }} value={mail} onChangeText={mail => setMail(mail)}/>
            <TextInput variant="outlined" label="Contraseña" style={{ margin: 14, marginRight: '2rem', marginLeft: '2rem', borderRadius: 10  }} value={contraseña} secureTextEntry={!mostrarContrasenia} onChangeText={contraseña => setContraseña(contraseña)} trailing={<TouchableOpacity onPress={() => setMostrarContrasenia(!mostrarContrasenia)}><Icon icon={mostrarContrasenia ? 'mdi:eye-off' : 'mdi:eye'} width={30} /></TouchableOpacity>}/>
            
            <TouchableOpacity style={styles.botonContrasena}>
                <Text style={[{ color: '#0D4CEF', fontSize: '0.9rem', fontFamily: 'inter', textAlign: 'right', marginRight: '1rem', marginBottom: '1.5rem', marginRight: '2rem'}]}>¿Te olvidaste la contraseña?</Text>
            </TouchableOpacity>

            <View style={styles.espacioBotonLogin}>
                <TouchableOpacity style={styles.botonLogin} onPress={() => { logIn() }}>
                    <Text style={[{ color: 'white', fontSize: '1.2rem', fontFamily: 'inter' }]}>Log in</Text>
                </TouchableOpacity>
            </View>

            <Text style={{textAlign: 'center', marginTop: '1.5rem', marginBottom: '1rem', marginLeft: '1rem', marginRight: '1rem', fontSize: '1.2rem'}}> ──────── Seguir con ────────</Text>

            <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-around',paddingLeft: '1.5rem', paddingRight: '1.5rem',}}>
                <TouchableOpacity style={{backgroundColor: '#40A2DA', minHeight: '3.5rem', minWidth: '10rem', borderRadius: 15, display: 'flex', justifyContent: 'center', }}>
                    <View style={{flexDirection: 'row', marginLeft: '0.3rem'}}>
                        <Icon icon="ri:google-fill" color="white" width={'2.3rem'}/>
                        <Text style={{color: 'white', display: 'flex', alignItems: 'center', fontSize: '0.9rem'}}>Google</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={{backgroundColor: '#0F3A8D', minHeight: '3.5rem', minWidth: '10rem', borderRadius: 15, display: 'flex', justifyContent: 'center', }}>
                    <View style={{flexDirection: 'row', marginLeft: '0.3rem'}}>
                        <Icon icon="ant-design:facebook-filled" color="white" width={'2.3rem'}/>
                        <Text style={{color: 'white', display: 'flex', alignItems: 'center', fontSize: '0.9rem'}}>Facebook</Text>
                    </View>
                </TouchableOpacity>
            </View>
        
            <View style={{flexDirection: 'row', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', marginTop: '2rem'}}>
                <Text style={{fontSize: '1rem', fontFamily: 'inter' }}>¿No tienes una cuenta? </Text>
                <TouchableOpacity onPress={() => { navigation.navigate('CrearCuenta') }}>
                    <Text style={{color: 'blue', fontSize: '1rem', fontFamily: 'inter' }}>Create una</Text>
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
        margin: '1rem',
        marginLeft: '1.5rem',
        marginRight: '1.5rem',
    },
    imagen: {
        width: '45%',
        height: '20%',
        resizeMode: "contain",
        display: 'flex',
        alignSelf: 'center',
        marginTop: '3rem',
        borderRadius: 30,
    },
    texto: {
        textAlign: 'center',
        fontSize: '1.2rem',
    },
    botonContrasena: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '1rem',
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
    espacioBotonLogin: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});