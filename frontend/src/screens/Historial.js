import { StyleSheet, Button, Text, View, Alert, SafeAreaView, TouchableOpacity, InputAccessoryView, ScrollView, Dimensions, FlatList, Image } from 'react-native';
import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { ActionTypes, setContextState, useContextState } from '../navigation/contextState';
import { getJornadaActiva, getUltimasDosJornadas, getJornadasYMedicionesByIdUsuario } from '../../api';
import { useIsFocused } from "@react-navigation/native";

export default function Historial({ navigation }) {
    const { contextState, setContextState } = useContextState()
    const [fecha, setFecha] = useState(0)
    const [idJornadaActiva, setIdJornadaActiva] = useState(null)
    const [jornadas, setJornadas] = useState(null)
    const [arrayFechas, setArrayFechas] = useState([])
    const [index, setIndex] = useState(0);
    /* 
    formato de arrayFechas:
    [
        {
            fecha: Date,
            jornadas: [
                ...jornadas
            ]
        }
    ]
    */
    const isFocused = useIsFocused();
    const width = Dimensions.get('window').width;

    var arrayProvisorio = []

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    const siHayJornadaActiva = async () => {
        const jornadaActivaes = await getJornadaActiva(contextState.usuario.idUsuario) //Si no hay una jornada activa no entra a este funcion y no setea ningún valor, raro pero nos sirve
        console.log(jornadaActivaes)
        setIdJornadaActiva(jornadaActivaes.idJornada)
    }

    const cargarJornadas = async () => {
        const data = await getJornadasYMedicionesByIdUsuario(contextState.usuario.idUsuario)
        console.log(data)
        data.map((jornada) => (
            jornada.fechaInicio = `${new Date(jornada.fechaInicio).toDateString()} ${new Date(jornada.fechaInicio).toLocaleTimeString('es-AR')}`,
            jornada.fechaFin = `${new Date(jornada.fechaFin).toDateString()} ${new Date(jornada.fechaFin).toLocaleTimeString('es-AR')}`,
            jornada.primeraFecha = `${new Date(jornada.primeraFecha).toDateString()} ${new Date(jornada.primeraFecha).toLocaleTimeString('es-AR')}`,
            jornada.ultimaFecha = `${new Date(jornada.ultimaFecha).toDateString()} ${new Date(jornada.ultimaFecha).toLocaleTimeString('es-AR')}`,
            jornada.mayorFecha = `${new Date(jornada.mayorFecha).toDateString()} ${new Date(jornada.mayorFecha).toLocaleTimeString('es-AR')}`
        ))
        setJornadas(data)
    }

    useEffect(() => {
        if (jornadas !== null) {
            console.log(jornadas, arrayFechas, jornadas[0].fechaInicio.substring(0, -8)),
                jornadas.map((jornada) => {
                    if (arrayProvisorio.includes((item) => item.fecha.substring(0, -8) !== jornada.fechaInicio.substring(0, -8))) {
                        arrayProvisorio = [ //Fri Oct 06 2023 09:07:50
                            ...arrayProvisorio, {
                                fecha: jornada.fechaInicio,
                                jornadas: jornadas.filter((item) => item.fechaInicio.substring(0, -8) === jornada.fechaInicio.substring(0, -8))
                            }
                        ]
                    }
                    else {
                        arrayProvisorio = [ //Fri Oct 06 2023 09:07:50
                            ...arrayProvisorio, {
                                ...arrayProvisorio.fecha,
                                jornadas: [{ ...arrayProvisorio.jornadas }, jornada]
                            }
                        ]
                    }
                })
        }
        setArrayFechas(arrayProvisorio)
    }, [jornadas])

    useEffect(() => {
        console.log(arrayFechas)
    }, [arrayFechas])

    const [fontsLoaded, setFontsLoaded] = useState(false);
    useEffect(() => {
        if (!fontsLoaded) {
            loadFonts();
        }
        //siHayJornadaActiva()
        contextState.jornada.idJornada === 0 ? null : cargarJornadas()
    }, [isFocused])

    const loadFonts = async () => {
        await Font.loadAsync({
            'alata': require('../assets/fonts/Alata/Alata.ttf'),
            'inter': require('../assets/fonts/Inter/Inter.ttf'),
        });
        setFontsLoaded(true);
    }

    const validacion = () => {
        if (contextState.jornada.idJornada !== 0) {
            navigation.navigate('Home')
        }
        else {
            navigation.navigate('PrimeraHome')
        }
    }
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row", marginTop: '4rem', display: 'flex', justifyContent: 'space-around' }}>
                <Icon icon="zondicons:arrow-left" />
                {/* <Text style={styles.titulo}>{arrayFechas[arrayFechas.length -1]}</Text> */}
                <Icon icon="zondicons:arrow-right" />
            </View>
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2rem' }}>
                {/* <FlatList
                    data={jornadas}
                    renderItem={({ item, index }) => (
                        <View style={styles.cuadro}>
                            <View style={{ margin: '0.5rem' }}>
                                <Text style={styles.textoJornda}>Jornada {index + 1}</Text>
                                <View style={{ flexDirection: "column", marginTop: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                                    <Text style={styles.texto}>ID: {item.idJornada}</Text>
                                    <Text style={{ ...styles.texto, fontSize: '0.8rem' }}>Fecha Inicial: {item.fechaInicio}</Text>
                                    <Text style={{ ...styles.texto, fontSize: '0.8rem' }}>Fecha Final: {item.fechaFin === "Wed Dec 31 1969 21:00:00" ? "No finalizado" : item.fechaFin}</Text>
                                </View>
                            </View>
                        </View>
                    )}
                    keyExtractor={(item) => item.idJornada.toString()}
                /> */}
            </View>
            
            {/* <Carousel
                loop
                width={width}
                height={width / 2}
                autoPlay={true}
                data={[...new Array(6).keys()]} //[...new Array(6).keys()]
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ index }) => (
                    <View
                        style={{
                            flex: 1,
                            borderWidth: 1,
                            justifyContent: 'center',
                        }}
                    >
                        <Text style={{ textAlign: 'center', fontSize: 30 }}>
                            {index}
                        </Text>
                    </View>
                )}
            /> */}

            <View style={styles.footer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => { validacion() }}>
                        <Icon icon="material-symbols:home" width={'2.5rem'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate('Historial') }}>
                        <Icon icon="zondicons:calendar" width={'2.3rem'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate('Usuario') }}>
                        <Icon icon="mdi:account" width={'2.5rem'} />
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
    imagen: {
        width: '45%',
        height: '20%',
        resizeMode: "contain",
        display: 'flex',
        alignSelf: 'center',
        marginTop: '3rem',
        borderRadius: 30,
    },
});