import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { TextInput } from "@react-native-material/core";
import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { ActionTypes, setContextState, useContextState } from '../navigation/contextState';


export default function CompletarDatos({ navigation }) {
    const { contextState, setContextState } = useContextState()

    const [peso, setPeso] = useState("");
    const [altura, setAltura] = useState("");

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

    const validacion = () => {
        if(!/[^\d,.\d]|[,.]\Z|\A[,.]|[\,\.]{2}/.test(peso + altura) && (peso+altura).split(".").length <= 3 && (peso+altura).split(",").length <= 3){
            navigation.navigate('PrimeraHome')
        }
        else{
            console.error('Error: Los valores introducidos no son números')
        }
    }
    return (
        <View style={styles.container}>
            
            <Image source={require('../assets/icon.png')} style={styles.imagen}/>
            
            <Text style={styles.titulo}>Te damos la bienvenida a Snifterly!</Text>
            <Text style={styles.texto}>SIGN UP</Text>

            <TextInput keyboardType='decimal' variant="outlined" label="peso" style={{ margin: 14, marginRight: '2rem', marginLeft: '2rem' }} value={peso} onChangeText={peso => setPeso(peso)}/>
            <TextInput keyboardType='decimal' variant="outlined" label="altura" style={{ margin: 14, marginRight: '2rem', marginLeft: '2rem' }} value={altura} onChangeText={altura => setAltura(altura)}/>

            <View style={styles.espacioBotonLogin}>
                <TouchableOpacity style={styles.botonLogin} onPress={() => { validacion() }}>
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
        margin: '1rem',
        marginLeft: '1.5rem',
        marginRight: '1.5rem',
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
        width: '45%',
        height: '20%',
        resizeMode: "contain",
        display: 'flex',
        alignSelf: 'center',
        marginTop: '4rem',
        borderRadius: 30,
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