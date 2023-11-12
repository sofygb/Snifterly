import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { TextInput } from "@react-native-material/core";
import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { setContextState, ActionTypes, contextState, useContextState } from '../navigation/contextState';

export default function CrearCuenta({ navigation }) {
    const [nombre, setNombre] = React.useState("");
    const [mail, setMail] = React.useState("");
    const [contrasenia, setContrasenia] = React.useState("");
    const { contextState, setContextState } = useContextState()
    const [usuarios, setUsuarios] = React.useState([])
    const [esMayor, setEsMayor] = React.useState(true)//✓✗
    const [mailValido, setMailValido] = React.useState(false)
    const [mostrarContrasenia, setMostrarContrasenia] = useState(false);

    useEffect(() => {
        if(contrasenia.length >= 10){
            setEsMayor(true)
        }
        else{
            setEsMayor(false)
        }
    },[contrasenia])
    useEffect(() => {
        if(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(mail)){
            setMailValido(true)
        }
        else{
            setMailValido(false)
        }
    },[mail])

    const guardarDatos = () => {
        const validacion = usuarios.findIndex(usuario => usuario.email === mail && usuario.contrasenia === contraseña)

        if (validacion == -1) {
                if(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(mail)){
                    if(contrasenia.length >= 10){
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
                            value: mail
                        });
                        navigation.navigate('CompletarDatos')
                    }
                    else{
                        console.error("Error: La contraseña debe ser mayor a 10 caracteres")
                    }
                    setMailValido(true)
                }
                else{
                    setMailValido(false)
                    console.error("Error: El mail ingresado es inválido")
                }
        }
    }

        const [fontsLoaded, setFontsLoaded] = useState(false);

        const loadFonts = async () => {
            await Font.loadAsync({
                'alata': require('../assets/fonts/Alata/Alata.ttf'),
                'inter': require('../assets/fonts/Inter/Inter.ttf'),
            });
            setFontsLoaded(true);
        }
    
        return (
            <View style={styles.container}>

                <Image source={require('../assets/icon.png')} style={styles.imagen} />

                <Text style={styles.titulo}>Te damos la bienvenida a Snifterly!</Text>
                <Text style={styles.texto}>SIGN UP</Text>
                <TextInput variant="outlined" label="nombre" style={{ margin: 14, marginRight: 32, marginLeft: 32 }} value={nombre} onChangeText={nombre => setNombre(nombre)} />
                <TextInput keyboardType='email' variant="outlined" label="Mail" style={{ margin: 14, marginRight: 32, marginLeft: 32 }} value={mail} onChangeText={e => setMail(e)} />
                <TextInput variant="outlined" label="Contraseña" style={{ margin: 14, marginRight: 32, marginLeft: 32 }} value={contrasenia} onChangeText={contrasenia => setContrasenia(contrasenia)} secureTextEntry={!mostrarContrasenia} trailing={<TouchableOpacity onPress={() => setMostrarContrasenia(!mostrarContrasenia)}><Icon icon={mostrarContrasenia ? 'mdi:eye-off' : 'mdi:eye'} width={30} /></TouchableOpacity>}/>

                {!esMayor ? <Text style={{textAlign: 'center', fontSize: 14, color: 'red', marginBottom: 8}}>La contraseña tiene que tener minimo 10 caracteres</Text> : null}
                {!mailValido ? <Text style={{textAlign: 'center', fontSize: 14, color: 'red', marginBottom: 8}}>Mail no valido</Text> : null}

                <View style={styles.espacioBotonLogin}>
                    <TouchableOpacity style={styles.botonLogin} onPress={() => { guardarDatos() }}>
                        <Text style={[{ color: 'white', fontSize: 19.2, fontFamily: 'inter' }]}>Sign up</Text>
                    </TouchableOpacity>
                </View>

                <Text style={{ textAlign: 'center', marginTop: 24, marginBottom: 16, marginLeft: 16, marginRight: 16, fontSize: 19.2 }}> ──────── Seguir con ────────</Text>

                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around', paddingLeft: 24, paddingRight: 24, }}>
                    <TouchableOpacity style={{ backgroundColor: '#40A2DA', minHeight: 56, minWidth: 160, borderRadius: 10, display: 'flex', justifyContent: 'center', }}>
                        <View style={{ flexDirection: 'row', marginLeft: 4.8 }}>
                            <Icon icon="ri:google-fill" color="white" width={36.8} />
                            <Text style={{ color: 'white', display: 'flex', alignItems: 'center', fontSize: 14.4 }}>Google</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ backgroundColor: '#0F3A8D', minHeight: 56, minWidth: 160, borderRadius: 10, display: 'flex', justifyContent: 'center', }}>
                        <View style={{ flexDirection: 'row', marginLeft: 4.8 }}>
                            <Icon icon="ant-design:facebook-filled" color="white" width={36.8} />
                            <Text style={{ color: 'white', display: 'flex', alignItems: 'center', fontSize: 14.4 }}>Facebook</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', marginTop: 16 }}>
                    <Text style={{ fontSize: 16, fontFamily: 'inter' }}>¿Ya tienes una cuenta? </Text>
                    <TouchableOpacity onPress={() => { navigation.navigate('InicioSesion') }}>
                        <Text style={{ color: 'blue', fontSize: 16, fontFamily: 'inter' }}>Loguearse</Text>
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
        marginTop: 32,
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