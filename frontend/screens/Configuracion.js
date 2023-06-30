import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { TextInput } from "@react-native-material/core";
import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';

export default function Configuracion({ navigation }) {
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
                <View style={{flexDirection: "row", flex: 1}}>
                    <TouchableOpacity onPress={() => { navigation.navigate('Usuario') }}>
                        <Icon icon="formkit:arrowleft" width={25} />
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
                    <Text style={styles.nombreStyle}>SelenaGomez</Text>
                </View>

                <View></View>
                <View></View>

                <TouchableOpacity>
                    <Text>Guardar</Text>
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
        flex: 1,
        display: 'flex',
        alignContent: 'flex-start',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: '2rem',
        marginBottom: '8rem',
        fontFamily: 'alata',
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
    }
});