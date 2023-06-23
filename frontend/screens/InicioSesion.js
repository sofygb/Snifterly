import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { TextInput } from "@react-native-material/core";
import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';

export default function InicioSesion({ navigation }) {
    const [text, setText] = React.useState("");
    const [textdos, setTextdos] = React.useState("");

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

            <TextInput variant="outlined" label="Usuario" style={{ margin: 16 }} value={text} onChangeText={text => setText(text)}/>
            <TextInput variant="outlined" label="Contraseña" style={{ margin: 16 }} value={textdos} onChangeText={textdos => setTextdos(textdos)}/>

            <TouchableOpacity style={styles.botonContrasena}>
                <Text style={[{ color: 'blue', fontSize: '1rem', fontFamily: 'inter', textAlign: 'right', marginRight: '1rem'}]}>¿Te olvidaste la contraseña?</Text>
            </TouchableOpacity>

            <View style={styles.espacioBotonLogin}>
                <TouchableOpacity style={styles.botonLogin} onPress={() => { navigation.navigate('PrimeraHome') }}>
                    <Text style={[{ color: 'white', fontSize: '1.5rem', fontFamily: 'inter' }]}>Log in</Text>
                </TouchableOpacity>
            </View>

            <Text style={{textAlign: 'center', marginTop: '2rem', marginBottom: '1rem', marginLeft: '1rem', marginRight: '1rem', fontSize: '1.2rem'}}> ───────── Seguir con ─────────</Text>

            <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-around',paddingLeft: '1.5rem', paddingRight: '1.5rem',}}>
                <TouchableOpacity style={{backgroundColor: '#40A2DA', minHeight: '3rem', minWidth: '10rem', borderRadius: 10, display: 'flex', justifyContent: 'center', }}>
                    <View style={{flexDirection: 'row', marginLeft: '0.3rem'}}>
                        <Icon icon="ri:google-fill" color="white" width={'2.3rem'}/>
                        <Text style={{color: 'white', display: 'flex', alignItems: 'center'}}>Google</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={{backgroundColor: '#0F3A8D', minHeight: '3rem', minWidth: '10rem', borderRadius: 10, display: 'flex', justifyContent: 'center', }}>
                    <View style={{flexDirection: 'row', marginLeft: '0.3rem'}}>
                        <Icon icon="ant-design:facebook-filled" color="white" width={'2.3rem'}/>
                        <Text style={{color: 'white', display: 'flex', alignItems: 'center'}}>Facebook</Text>
                    </View>
                </TouchableOpacity>
            </View>
        
            <View style={{flexDirection: 'row', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', marginTop: '3rem'}}>
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