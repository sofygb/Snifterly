import { StyleSheet, Button, Text, View, Alert, SafeAreaView, TouchableOpacity, InputAccessoryView, ScrollView, Dimensions } from 'react-native';
import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { ActionTypes, setContextState, useContextState } from '../navigation/contextState';
import { getJornadaActiva, getUltimasDosJornadas } from '../../api';
import Carousel from 'react-native-reanimated-carousel';

export default function Historial({ navigation }) {
    const { contextState, setContextState } = useContextState()
    const [fecha, setFecha] = useState(0)
    const [idJornadaActiva, setIdJornadaActiva] = useState(null)
    const width = Dimensions.get('window').width;

    const siHayJornadaActiva = async () => {
        const jornadaActivaes = await getJornadaActiva(contextState.usuario.idUsuario) //Si no hay una jornada activa no entra a este funcion y no setea ningún valor, raro pero nos sirve
        console.log(jornadaActivaes)
        setIdJornadaActiva(jornadaActivaes.idJornada)
    }

    const cargarDosJornadas = async () => {
        const data = await getUltimasDosJornadas(contextState.usuario.idUsuario)
        data.map((jornada) => (
            jornada.fechaInicio = `${new Date(jornada.fechaInicio).toDateString()} ${new Date(jornada.fechaInicio).toLocaleTimeString('es-AR')}`,
            jornada.fechaFin = `${new Date(jornada.fechaFin).toDateString()} ${new Date(jornada.fechaFin).toLocaleTimeString('es-AR')}`,
            jornada.primeraFecha = `${new Date(jornada.primeraFecha).toDateString()} ${new Date(jornada.primeraFecha).toLocaleTimeString('es-AR')}`,
            jornada.ultimaFecha = `${new Date(jornada.ultimaFecha).toDateString()} ${new Date(jornada.ultimaFecha).toLocaleTimeString('es-AR')}`,
            jornada.mayorFecha = `${new Date(jornada.mayorFecha).toDateString()} ${new Date(jornada.mayorFecha).toLocaleTimeString('es-AR')}`
        ))
        setMedicionJornada(data)
    }

    const [fontsLoaded, setFontsLoaded] = useState(false);
    useEffect(() => {
        if (!fontsLoaded) {
            loadFonts();
        }
        siHayJornadaActiva()
        cargarDosJornadas()
    },[])

    const loadFonts = async () => {
        await Font.loadAsync({
            'alata': require('../assets/fonts/Alata/Alata.ttf'),
            'inter': require('../assets/fonts/Inter/Inter.ttf'),
        });
        setFontsLoaded(true);
    }

    const validacion = () => {
        if (idJornadaActiva !== null) {
            navigation.navigate('Home')
        }
        else {
            navigation.navigate('PrimeraHome')
        }
    }
    return (
        <View style={styles.container}>
            <View style={{flexDirection: "row", marginTop: '4rem', display: 'flex', justifyContent: 'space-around'}}>
                <Icon icon="zondicons:arrow-left" /> 
                <Text style={styles.titulo}>04 de Abril</Text>
                <Icon icon="zondicons:arrow-right" />
            </View>
            <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2rem'}}>
                <View style={styles.cuadro}>
                    <View style={{margin: '0.5rem'}}>
                        <Text style={styles.textoJornda}>Jornada I</Text>
                        <View style={{flexDirection: "row", marginTop: '1rem', display: 'flex', justifyContent: 'space-between'}}>
                            <Text style={styles.texto}>01:00</Text>
                            <Text style={styles.texto}>*Info jornada*</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.cuadro}>
                    <View style={{margin: '0.5rem'}}>
                        <Text style={styles.textoJornda}>Jornada II</Text>
                        <View style={{flexDirection: "row", marginTop: '1rem', display: 'flex', justifyContent: 'space-between'}}>
                            <Text style={styles.texto}>01:00</Text>
                            <Text style={styles.texto}>*Info jornada*</Text>
                        </View>
                        <View style={{flexDirection: "row", display: 'flex', justifyContent: 'space-between'}}>
                            <Text style={styles.texto}>01:00</Text>
                            <Text style={styles.texto}>*Info jornada*</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.cuadro}>
                    <View style={{margin: '0.5rem'}}>
                        <Text style={styles.textoJornda}>Jornada III</Text>
                        <View style={{flexDirection: "row", marginTop: '1rem', display: 'flex', justifyContent: 'space-between'}}>
                            <Text style={styles.texto}>01:00</Text>
                            <Text style={styles.texto}>*Info jornada*</Text>
                        </View>
                        <View style={{flexDirection: "row", display: 'flex', justifyContent: 'space-between'}}>
                            <Text style={styles.texto}>02:00</Text>
                            <Text style={styles.texto}>*Info jornada*</Text>
                        </View>
                    </View>
                </View>
            </View>
            <Carousel
                loop
                width={width}
                height={width / 2}
                autoPlay={true}
                data={idJornadaActiva} //[...new Array(6).keys()]
                scrollAnimationDuration={1000}
                //onSnapToItem={(index) => console.log('current index:', index)}
                /*renderItem={({ idJornadaActiva }) => (
                    <View
                        style={{
                            flex: 1,
                            borderWidth: 1,
                            justifyContent: 'center',
                        }}
                    >
                        <Text style={{ textAlign: 'center', fontSize: 30 }}>
                            {idJornadaActiva.idJornada}
                        </Text>
                    </View>
                )}*/
            />

            <View style={styles.footer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => { validacion() }}>
                        <Icon icon="material-symbols:home" width={'2.5rem'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate('Historial') }}>
                        <Icon icon="zondicons:calendar" width={'2.3rem'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate('Usuario') }}>
                        <Icon icon="mdi:account" width={'2.5rem'}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        display: "flex",
        flex: 1,
        fontFamily: "Alata",
    },
    titulo: {
        fontWeight: "bold",
        fontSize: "1.5rem",
        fontFamily: "alata",
    },
    textoJornda: {
        marginLeft: "0.5rem",
        marginRight: "0.5rem",
        fontSize: "1.5rem",
        color: "#4B4B4B",
        fontFamily: "alata",
    },
    texto: {
        marginLeft: "0.5rem",
        marginRight: "0.5rem",
        fontSize: "1rem",
        color: "#4B4B4B",
        fontFamily: "alata",
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
    cuadro: {
        borderRadius: 20,
        padding: "0.5rem",
        margin: "1rem",
        minheight: "11rem",
        minWidth: "18rem",
        maxWidth: "20rem",
        padding: "0.3rem",
        backgroundColor: "#F9F4F0",
        fontFamily: "alata",
        shadowColor: "#560000",
        borderColor: "F9F4F0",
        shadowOffset: {
          width: 2,
          height: 4,
        },
        shadowOpacity: 2,
        shadowRadius: 5,
      },
});