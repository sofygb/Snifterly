import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { TextInput } from "@react-native-material/core";
import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { ActionTypes, setContextState, useContextState } from '../navigation/contextState';
import { saveUsuario } from '../../api';

export default function CompletarDatos({ navigation }) {
    const { contextState, setContextState } = useContextState()

    const [peso, setPeso] = useState("");
    const [altura, setAltura] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState("");
    const nombre = contextState.usuario.nombre
    const mail = contextState.usuario.email
    const contrasenia = contextState.usuario.contrasenia

    // const loadJornada = async () => {
    //     const data = await getJornada()
    //     console.log(data)
    //     setJornada([data])
    // }
    const [fontsLoaded, setFontsLoaded] = useState(false);
    useEffect(() => {
        if (!fontsLoaded) {
            loadFonts();
        }
        // loadJornada()
    },[])

    const loadFonts = async () => {
        await Font.loadAsync({
            'alata': require('../assets/fonts/Alata/Alata.ttf'),
            'inter': require('../assets/fonts/Inter/Inter.ttf'),
        });
        setFontsLoaded(true);
    }

    const validacion = () => {
        if(!/[^\d.\d]|[.]\Z|\A[.]|[\.]{2}/.test(peso + altura) && (peso+altura).split(".").length <= 3){
            console.log("nombre del usuario que se esta creando: ", contextState.usuario.nombre)

            const fecha = new Date(fechaNacimiento)
            saveUsuario(nombre, `${fecha.getFullYear()}-${fecha.getMonth()}-${fecha.getDate()}`, peso, altura, mail, contrasenia)
            setContextState({
                type: ActionTypes.SetNombre,
                value: nombre
              });
            setContextState({
                type: ActionTypes.setFechaNacimiento,
                value: fecha
              });
              setContextState({
                type: ActionTypes.SetAltura,
                value: altura
              });
              setContextState({
                type: ActionTypes.SetEmail,
                value: mail
              });
              setContextState({
                type: ActionTypes.SetContrasenia,
                value: contrasenia
              });
              setContextState({
                type: ActionTypes.SetPeso,
                value: peso
              });
            navigation.navigate('PrimeraHome')
        }
        else{
            console.error('Error: Los valores introducidos no son números')
        }
    }
    const [chosenDate, setChosenDate] = useState(new Date());
    return (
        <View style={styles.container}>
            
            <Image source={require('../assets/icon.png')} style={styles.imagen}/>
            
            <Text style={styles.titulo}>Te damos la bienvenida a Snifterly!</Text>
            <Text style={styles.texto}>SIGN UP</Text>

            <TextInput keyboardType='decimal' variant="outlined" label="peso" style={{ margin: 14, marginRight: 32, marginLeft: 32 }} value={peso} onChangeText={peso => setPeso(peso)}/>
            <TextInput keyboardType='decimal' variant="outlined" label="altura" style={{ margin: 14, marginRight: 32, marginLeft: 32 }} value={altura} onChangeText={altura => setAltura(altura)}/>
            <TextInput keyboardType='date' variant="outlined" label="fecha de nacimiento" style={{ margin: 14, marginRight: 32, marginLeft: 32 }} value={fechaNacimiento} placeholder="Ejemplo: mm-dd-yyyy..." onChangeText={fechaNacimiento => setFechaNacimiento(fechaNacimiento)}/>

            <View style={styles.espacioBotonLogin}>
                <TouchableOpacity style={styles.botonLogin} onPress={() => { validacion() }}>
                    <Text style={[{ color: 'white', fontSize: 19.2, fontFamily: 'inter' }]}>Ok</Text>
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
    footer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: 16,
        width: '100%',
        paddingLeft: 32,
        paddingRight: 32,
    },
    imagen: {
        width: 400,
        height: 200,
        resizeMode: "contain",
        display: 'flex',
        alignSelf: 'center',
        marginTop: 64,
        borderRadius: 30,
    },
    texto: {
        textAlign: 'center',
        fontSize: 19.2,
    },
    finalizarJornada: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: 16,
        marginTop: 12.8,
    },
    botonAceptar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        maxHeight: 48,
        maxWidth: 80,
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
        minHeight: 48,
        minWidth: 320,
        backgroundColor: "#5654E1",
        borderRadius: 18,
        padding: 10,
    },
});