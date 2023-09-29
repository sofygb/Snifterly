import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View, Alert, SafeAreaView, TouchableOpacity, InputAccessoryView, ScrollView, Image } from 'react-native';
import { TextInput } from "@react-native-material/core";
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { HomeFilled } from '@ant-design/icons';
import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { ActionTypes, setContextState, useContextState } from '../navigation/contextState';
import { getJornadaActiva, getJornadasCountByIdUsuario, getUltimasDosJornadas } from '../../api';


export default function Usuario({ navigation }) {
    const { contextState, setContextState } = useContextState()
    const [edad, setEdad] = useState(0)
    const [cantJornadas, setCantJornadas] = useState()
    const [idJornadaActiva, setIdJornadaActiva] = useState(null)
    const [medicionJornada, setMedicionJornada] = useState(null)

    const [fontsLoaded, setFontsLoaded] = useState(false);

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

    useEffect(() => {
        if (!fontsLoaded) {
            loadFonts();
        }
        cantjornadas()
        calcularEdad()
        siHayJornadaActiva()
        cargarDosJornadas()
    }, [])

    const proximaPantalla = () => {
        if (idJornadaActiva !== null) {
            navigation.navigate('Home')
        }
        else {
            navigation.navigate('PrimeraHome')
        }
    }
    const cantjornadas = async () => {
        const data = await getJornadasCountByIdUsuario(contextState.usuario.idUsuario);
        setCantJornadas(data)
    }
    const calcularEdad = () => {
        let fechaNacimiento = new Date(); // Declarar con let en lugar de const
        fechaNacimiento = contextState.usuario.fechaNacimiento; // Asignar el valor
        const fechaActual = new Date();
        const diferenciaEnMilisegundos = fechaActual - fechaNacimiento;
        const edadCalculada = Math.floor(diferenciaEnMilisegundos / (365.25 * 24 * 60 * 60 * 1000));
        setEdad(edadCalculada);
        console.log("La edad es:", edadCalculada);
    }

    const loadFonts = async () => {
        await Font.loadAsync({
            'alata': require('../assets/fonts/Alata/Alata.ttf'),
            'inter': require('../assets/fonts/Inter/Inter.ttf'),
        });
        setFontsLoaded(true);
    }

    return (
        <View style={styles.container}>

            <Text style={styles.titulo}>Snifterly</Text>

            <View style={[styles.info, { marginBottom: '3rem', paddingLeft: '4rem', paddingRight: '4rem', }]}>
                <Image
                    source={{
                        uri: 'https://media.revistavanityfair.es/photos/60e82a56bf8d45dd8c6f5b7e/master/w_1600%2Cc_limit/250726.jpg',
                        method: 'POST',
                        headers: {
                            Pragma: 'no-cache',
                        },
                    }}
                    style={{ width: 55, height: 55, borderRadius: 100 }}
                />
                <Text style={{ fontSize: '1rem', fontFamily: 'Alata' }}>{contextState.usuario.nombre}
                    <Text style={{ fontSize: '1rem', color: 'orange', marginTop: '1rem', fontFamily: 'Alata' }}>{"\n"}edad {edad} años</Text></Text>
                <TouchableOpacity onPress={() => { navigation.navigate('Configuracion') }}>
                    <Icon icon="mdi:pencil" width={30} />
                </TouchableOpacity>
            </View>

            <View style={[styles.espacioCuadros, { marginBottom: "1rem" }]}>
                <View style={styles.cuadro}>
                    <Text style={{ color: 'white', fontSize: 24, fontFamily: 'alata', marginRight: '1rem' }}>Sesiones</Text>
                    <Text style={{ color: 'white', fontSize: 40, fontFamily: 'alata', display: 'flex', justifyContent: 'flex-end' }}>{cantJornadas}</Text>
                </View>
                <View style={styles.cuadro}>
                    <Text style={{ color: 'white', fontSize: 24, fontFamily: 'alata', marginRight: '1rem' }}>Limite alcohol</Text>
                    <Text style={{ color: 'white', fontSize: 40, fontFamily: 'alata', display: 'flex', justifyContent: 'flex-end' }}>X%</Text>
                </View>
            </View>

            {/*
            <Text style={styles.texto}>Conectáte con otras apps:</Text>

                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.cuadroRectangulo}>
                    <View style={[styles.info, { paddingLeft: '2rem', paddingRight: '2rem', flex: 1, display: 'flex', alignItems: 'center' }]}>
                        <Image
                            source={{
                                uri: 'https://logodownload.org/wp-content/uploads/2015/05/uber-logo-1-1.png',
                                method: 'POST',
                                headers: {
                                    Pragma: 'no-cache',
                                },
                            }}
                            style={{ width: 55, height: 55, borderRadius: 10 }}
                            />
                        <Image
                            source={{
                                uri: 'https://play-lh.googleusercontent.com/r7XL36PVNtnidqy6ikRiW1AHEIsjhePrZ8W5M4cNTQy5ViF3-lIDY47hpvxc84kJ7lw',
                                method: 'POST',
                                headers: {
                                    Pragma: 'no-cache',
                                },
                            }}
                            style={{ width: 55, height: 55, borderRadius: 10 }}
                            />
                        <Image
                            source={{
                                uri: 'https://i.pinimg.com/originals/f4/c9/a8/f4c9a88e93317977c3d0921b12309578.png',
                                method: 'POST',
                                headers: {
                                    Pragma: 'no-cache',
                                },
                            }}
                            style={{ width: 65, height: 65, borderRadius: 10 }}
                            />
                    </View>
                </View>
            </View>
                        */}

            <Text style={styles.texto}>Tus últimas jornadas:</Text>

            <View style={{ display: 'flex', alignItems: 'center' }}>
                {
                    medicionJornada != null &&
                    medicionJornada.map((mediJornada, key) => (
                        <View style={styles.cuadroJornadas}>
                            <Text style={styles.textoJornadas}>Jornada {key+1}</Text>
                            <Text style={styles.textofecha}>Promedio de alcohol: {Math.round(mediJornada.promedioGrados*1000)/1000} dg/ml</Text>
                            <Text style={styles.textofecha}>Mayor grado: {Math.round(mediJornada.mayorGrado*1000)/1000} dg/ml</Text>
                            <Text style={styles.textofecha}>Fecha Inicial: {mediJornada.fechaInicio}</Text>
                            <Text style={styles.textofecha}>Fecha Final: {mediJornada.fechaFin}</Text>
                        </View>
                    ))
                }
            </View>

            <View style={styles.footer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => { proximaPantalla() }}>
                        <Icon icon="material-symbols:home" width={'2.5rem'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate('Historial') }}>
                        <Icon icon="zondicons:calendar" width={'2.3rem'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate('Perfil') }}>
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
    titulo: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        fontSize: "1.5rem",
        marginTop: "3rem",
        marginBottom: "3rem",
        fontFamily: "alata",
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
        width: 40, height: 40,
        resizeMode: "contain",
        padding: '10rem',
    },
    info: {
        flexDirection: "row",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',

    },
    cuadro: {
        borderWidth: 2,
        borderRadius: 20,
        padding: "0.5rem",
        minheight: "11rem",
        maxWidth: "7rem",
        padding: "0.3rem",
        backgroundColor: "#FF7F00",
        borderColor: "#FF7F00",
        fontFamily: "alata",
        shadowColor: "#C1C0C0",
        shadowOffset: {
            width: 2,
            height: 4,
        },
        shadowOpacity: 2,
        shadowRadius: 5,
    },
    espacioCuadros: {
        display: "flex",
        width: "100%",
        paddingLeft: "4rem",
        paddingRight: "4rem",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    cuadroRectangulo: {
        display: "flex",
        padding: "0.5rem",
        marginRight: "0.3rem",
        marginLeft: "0.3rem",
        marginTop: "1rem ",
        minWidth: "22rem",
        minHeight: "6rem",
        borderRadius: 20,
        backgroundColor: "#CECECE",
        borderColor: "#CECECE",
        fontFamily: "alata",
        shadowColor: "#C4C4C4",
        shadowOffset: {
            width: 2,
            height: 4,
        },
        shadowOpacity: .8,
        shadowRadius: 5,
    },
    texto: {
        fontFamily: 'alata',
        marginLeft: '2rem',
        fontSize: 20,
        marginTop: '1rem',
    },
    textoJornadas: {
        fontFamily: 'alata',
        marginLeft: '1.5rem',
        fontSize: 24,
        flex: 1,
        display: 'flex',
        alignItems: 'center',
    },
    cuadroJornadas: {
        display: "flex",
        padding: "0.5rem",
        marginRight: "0.3rem",
        marginLeft: "0.3rem",
        marginTop: "1rem ",
        minWidth: "20rem",
        minHeight: "4rem",
        borderRadius: 20,
        backgroundColor: "#F9F4F0",
        borderColor: "#F9F4F0",
        fontFamily: "alata",
        shadowColor: "#C4C4C4",
        shadowOffset: {
            width: 2,
            height: 4,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
    },
    textofecha: {
        fontSize: 12, fontFamily: 'alata', color: '#949494', display: 'flex', justifyContent: 'flex-end', marginRight: '1rem',
    },
});