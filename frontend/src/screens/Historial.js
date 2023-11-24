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
    const [fechaIndex, setFechaIndex] = useState('');
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
        console.log('id usuario: ', contextState.usuario.idUsuario)
        console.log(data)
        data.map((jornada) => (
            jornada.fechaInicio = new Date(jornada.fechaInicio).toDateString() + " " + new Date(jornada.fechaInicio).toLocaleTimeString('es-AR'),
            jornada.fechaFin = new Date(jornada.fechaFin).toDateString() + " " + new Date(jornada.fechaFin).toLocaleTimeString('es-AR'),
            jornada.primeraFecha = new Date(jornada.primeraFecha).toDateString() + " " + new Date(jornada.primeraFecha).toLocaleTimeString('es-AR'),
            jornada.ultimaFecha = new Date(jornada.ultimaFecha).toDateString() + " " + new Date(jornada.ultimaFecha).toLocaleTimeString('es-AR'),
            jornada.mayorFecha = new Date(jornada.mayorFecha).toDateString() + " " + new Date(jornada.mayorFecha).toLocaleTimeString('es-AR')
        ))
        setJornadas(data)
    }

    useEffect(() => {
        if (arrayFechas[index] != null) {
            setFechaIndex(arrayFechas[index].fecha)
        }
    }, [arrayFechas, index])

    useEffect(() => {
        var arrayProvisorio = []
        if (jornadas !== null) {
            if(jornadas.length !== 0){

                console.log(jornadas, arrayFechas, jornadas[0].fechaInicio.substring(0, jornadas[0].fechaInicio.length - 9)),
                jornadas.map((jornada, i) => {
                    if (arrayProvisorio.findIndex((item) => item.fecha === jornada.fechaInicio.substring(0, jornada.fechaInicio.length - 9)) === -1) {
                        arrayProvisorio = [ //Fri Oct 06 2023 09:07:50 - CREAR NUEVO OBJETO FECHA SI NO EXISTE LA FECHA
                        ...arrayProvisorio, {
                            fecha: jornada.fechaInicio.substring(0, jornada.fechaInicio.length - 9),
                            jornadas: jornadas.filter((item) => item.fechaInicio.substring(0, item.fechaInicio.length - 9) === jornada.fechaInicio.substring(0, jornada.fechaInicio.length - 9))
                        }
                    ]
                    }
                    /*  
                    else {
                        arrayProvisorio = [ //Fri Oct 06 2023 09:07:50 - AGREGAR NUEVA JORNADA AL OBJETO
                        ...arrayProvisorio, {
                            ...arrayProvisorio[i-1].fecha,
                            jornadas: [{ ...arrayProvisorio[i-1].jornadas }, jornada]
                        }
                    ]
                }
                */
            })
            /*
            jornadas.map((jornada) => {
                if (arrayProvisorio.findIndex((item) => console.log(item))){}
            })
            */
            }
        }
        setArrayFechas(arrayProvisorio)
    }, [jornadas])

    useEffect(() => {
        console.log(arrayFechas)
        console.log(jornadas)
    }, [arrayFechas])

    const [fontsLoaded, setFontsLoaded] = useState(false);
    useEffect(() => {
        if (!fontsLoaded) {
            loadFonts();
        }
        // siHayJornadaActiva()
        // contextState.jornada.idJornada === 0 ? null : cargarJornadas() --> porqué?
        cargarJornadas()
        console.clear()
        console.log('id de la jornada: ', contextState.jornada.idJornada)
    }, [isFocused])

    const loadFonts = async () => {
        await Font.loadAsync({
            'alata': require('../assets/fonts/Alata/Alata.ttf'),
            'inter': require('../assets/fonts/Inter/Inter.ttf'),
        });
        setFontsLoaded(true);
    }

    useEffect(() => { console.log(index) }, [index])

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
            <View style={{ flexDirection: "row", marginTop: 64, display: 'flex', justifyContent: 'space-around' }}>
                <TouchableOpacity onPress={() => { index > 0 ? setIndex(index - 1) : null }}>
                    <Icon icon="zondicons:arrow-left" />
                </TouchableOpacity>
                <Text style={styles.titulo}>{arrayFechas.length != 0 ? fechaIndex : "No hay jornadas aún..."}</Text>
                <TouchableOpacity onPress={() => { index < (arrayFechas.length - 1) ? setIndex(index + 1) : null }}>
                    <Icon icon="zondicons:arrow-right" />
                </TouchableOpacity>
            </View>
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 32 }}>
                {
                    arrayFechas[index] != null && (
                        <>
                            {arrayFechas[index] != null && <Text style={styles.titulo}>{arrayFechas[index].jornadas.fechaInicio}</Text>}
                            <FlatList
                                data={arrayFechas[index].jornadas}
                                renderItem={({ item, index }) => (
                                    <View style={styles.cuadro}>
                                        <View style={{ margin: 8 }}>
                                            <Text style={styles.textoJornda}>Jornada {index + 1}</Text>
                                            <View style={{ flexDirection: "column", marginTop: 16, display: 'flex', justifyContent: 'space-between' }}>
                                                <Text style={styles.texto}>ID: {item.idJornada}</Text>
                                                <Text style={{ ...styles.texto, fontSize: 12.8 }}>Fecha Inicial: {item.fechaInicio}</Text>
                                                <Text style={{ ...styles.texto, fontSize: 12.8 }}>Fecha Final: {item.fechaFin === "Wed Dec 31 1969 21:00:00" ? "No finalizado" : item.fechaFin}</Text>
                                            </View>
                                        </View>
                                    </View>
                                )}
                            //keyExtractor={(item) => item.idJornada.toString()}
                            />
                        </>
                    )
                }
                {/*<FlatList
                    data={jornadas}
                    renderItem={({ item, index }) => (
                        <View style={styles.cuadro}>
                            <View style={{ margin: 8 }}>
                                <Text style={styles.textoJornda}>Jornada {index + 1}</Text>
                                <View style={{ flexDirection: "column", marginTop: 16, display: 'flex', justifyContent: 'space-between' }}>
                                    <Text style={styles.texto}>ID: {item.idJornada}</Text>
                                    <Text style={{ ...styles.texto, fontSize: 12.8 }}>Fecha Inicial: {item.fechaInicio}</Text>
                                    <Text style={{ ...styles.texto, fontSize: 12.8 }}>Fecha Final: {item.fechaFin === "Wed Dec 31 1969 21:00:00" ? "No finalizado" : item.fechaFin}</Text>
                                </View>
                            </View>
                        </View>
                    )}
                    keyExtractor={(item) => item.idJornada.toString()}
                    />*/}
            </View>

            <View style={styles.footer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => { validacion() }}>
                        <Icon icon="material-symbols:home" width={40} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate('Historial') }}>
                        <Icon icon="zondicons:calendar" width={36.8} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate('Usuario') }}>
                        <Icon icon="mdi:account" width={40} />
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
        fontSize: 24,
        fontFamily: "alata",
    },
    textoJornda: {
        marginLeft: 8,
        marginRight: 8,
        fontSize: 24,
        color: "#4B4B4B",
        fontFamily: "alata",
    },
    texto: {
        marginLeft: 8,
        marginRight: 8,
        fontSize: 16,
        color: "#4B4B4B",
        fontFamily: "alata",
    },
    footer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: 16,
        width: '100%',
        paddingLeft: 32,
        paddingRight: 32,
        //Height: 18,
    },
    cuadro: {
        borderRadius: 20,
        padding: 8,
        margin: 16,
        minheight: 176,
        minWidth: 288,
        maxWidth: 320,
        padding: 4.8,
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
        marginTop: 18,
        borderRadius: 30,
    },
    botonAgregar: {
        width: "100%",
        paddingRight: 25,
        alignItems: "flex-end",
        justifyContent: "flex-end",
    },
});