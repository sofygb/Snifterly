import { StyleSheet, Button, Text, View, Alert, SafeAreaView, TouchableOpacity, InputAccessoryView, ScrollView, Image } from 'react-native';
import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { ActionTypes, setContextState, useContextState } from '../navigation/contextState';
import { getJornadaActiva, getJornadasCountByIdUsuario, getUltimasDosJornadas, getUsuarios } from '../../api';

export default function Usuario({ navigation }) {
    const { contextState, setContextState } = useContextState()
    const [edad, setEdad] = useState(0)
    const [cantJornadas, setCantJornadas] = useState()
    const [idJornadaActiva, setIdJornadaActiva] = useState(null)
    const [medicionJornada, setMedicionJornada] = useState(null)
    const [usuario, setUsuario] = useState(null)

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
            jornada.ultimaFecha === 'Wed Dec 31 1969 21:00:00' ? "No finalizado" : `${new Date(jornada.ultimaFecha).toDateString()} ${new Date(jornada.ultimaFecha).toLocaleTimeString('es-AR')}`,
            jornada.mayorFecha = `${new Date(jornada.mayorFecha).toDateString()} ${new Date(jornada.mayorFecha).toLocaleTimeString('es-AR')}`
        ))
        setMedicionJornada(data)
    }

    const loadUsuario = async () => {
        const data = await getUsuarios()
        const index = data.findIndex((usuario) => usuario.idUsuario === contextState.usuario.idUsuario)
        setUsuario(data[index])
    }

    useEffect(() => {
        if (!fontsLoaded) {
            loadFonts();
        }
        loadUsuario()
        cantjornadas()
        siHayJornadaActiva()
        cargarDosJornadas()
    }, [])
    
    useEffect(() => {
        if(usuario != null) calcularEdad()
    }, [usuario])

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
        fechaNacimiento = new Date(usuario.fechaNacimiento); // Asignar el valor
        const fechaActual = new Date();
        const diferenciaEnMilisegundos = fechaActual - fechaNacimiento;
        //const edadCalculada = Math.floor(diferenciaEnMilisegundos / (365.25 * 24 * 60 * 60 * 1000));
        const edadCalculada = parseInt(fechaActual.getFullYear()) - parseInt(fechaNacimiento.getFullYear())
        setEdad(edadCalculada);
        setContextState({
            type: ActionTypes.setFechaNacimiento,
            value: fechaNacimiento
          });
        console.log("La edad es:", edadCalculada);
    }
    useEffect(() => {
        //cantjornadas()
        loadUsuario()
        //if(usuario != null) calcularEdad()
    },[contextState.usuario.fechaNacimiento])

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

            <View style={[styles.info, { marginBottom: 48, paddingLeft: 64, paddingRight: 64, }]}>
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
                <Text style={{ fontSize: 16, fontFamily: 'Alata' }}>{contextState.usuario.nombre}
                    <Text style={{ fontSize: 16, color: 'orange', marginTop: 16, fontFamily: 'Alata' }}>{"\n"}edad {edad} años</Text></Text>
                <TouchableOpacity onPress={() => { navigation.navigate('Configuracion') }}>
                    <Icon icon="mdi:pencil" width={30} />
                </TouchableOpacity>
            </View>

            <View style={[styles.espacioCuadros, { marginBottom: 16 }]}>
                <View style={styles.cuadro}>
                    <Text style={{ color: 'white', fontSize: 24, fontFamily: 'alata', marginRight: 16 }}>Sesiones</Text>
                    <Text style={{ color: 'white', fontSize: 40, fontFamily: 'alata', display: 'flex', justifyContent: 'flex-end' }}>{cantJornadas}</Text>
                </View>
                <View style={[styles.cuadro, {justifyContent: 'space-around'}]}>
                    <Text style={{ color: 'white', fontSize: 24, fontFamily: 'alata', marginRight: 16 }}>Limite alcohol</Text>
                    <Text style={{ color: 'white', fontSize: '170%', fontFamily: 'alata', display: 'flex', justifyContent: 'flex-end' }}>{contextState.usuario.modResistencia != null ? Math.trunc((contextState.usuario.modResistencia*100)*10/0.4)/10 : 100}%</Text>
                </View>
            </View>

            {/*
            <Text style={styles.texto}>Conectáte con otras apps:</Text>

                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.cuadroRectangulo}>
                    <View style={[styles.info, { paddingLeft: 32, paddingRight: 32, flex: 1, display: 'flex', alignItems: 'center' }]}>
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
                            <Text style={styles.textofecha}>Fecha Final: {mediJornada.fechaFin === "Wed Dec 31 1969 21:00:00" ? "No finalizado" : mediJornada.fechaFin}</Text>
                        </View>
                    ))
                }
            </View>

            <View style={styles.footer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => { proximaPantalla() }}>
                        <Icon icon="material-symbols:home" width={40} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate('Historial') }}>
                        <Icon icon="zondicons:calendar" width={36.8} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate('Perfil') }}>
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
    titulo: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: 24,
        marginTop: 48,
        marginBottom: 48,
        fontFamily: 'alata',
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
        width: 40, height: 40,
        resizeMode: 'contain',
        padding: 160,
    },
    info: {
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',

    },
    cuadro: {
        borderWidth: 2,
        borderRadius: 20,
        padding: 8,
        minheight: 176,
        maxWidth: 112,
        padding: 4.8,
        backgroundColor: '#FF7F00',
        borderColor: '#FF7F00',
        fontFamily: 'alata',
        shadowColor: '#C1C0C0',
        shadowOffset: {
            width: 2,
            height: 4,
        },
        shadowOpacity: 2,
        shadowRadius: 5,
    },
    espacioCuadros: {
        display: 'flex',
        width: '100%',
        paddingLeft: 64,
        paddingRight: 64,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cuadroRectangulo: {
        display: 'flex',
        padding: 8,
        marginRight: 4.8,
        marginLeft: 4.8,
        marginTop: 16,
        minWidth: 350,
        minHeight: 96,
        borderRadius: 20,
        backgroundColor: '#CECECE',
        borderColor: '#CECECE',
        fontFamily: 'alata',
        shadowColor: '#C4C4C4',
        shadowOffset: {
            width: 2,
            height: 4,
        },
        shadowOpacity: .8,
        shadowRadius: 5,
    },
    texto: {
        fontFamily: 'alata',
        marginLeft: 32,
        fontSize: 20,
        marginTop: 16,
    },
    textoJornadas: {
        fontFamily: 'alata',
        marginLeft: 12.8,
        fontSize: 24,
        flex: 1,
        display: 'flex',
        alignItems: 'center',
    },
    cuadroJornadas: {
        display: 'flex',
        padding: 8,
        marginRight: 4.8,
        marginLeft: 4.8,
        marginTop: 16,
        minWidth: 320,
        minHeight: 64,
        borderRadius: 20,
        backgroundColor: '#F9F4F0',
        borderColor: '#F9F4F0',
        fontFamily: 'alata',
        shadowColor: '#C4C4C4',
        shadowOffset: {
            width: 2,
            height: 4,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
    },
    textofecha: {
        fontSize: 16,
        fontFamily: 'alata',
        color: '#949494',
        display: 'flex',
        justifyContent: 'flex-start',
        marginLeft: 12.8,
        marginTop: 4.8
    },
});