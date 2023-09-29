import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View, Alert, SafeAreaView, TouchableOpacity, InputAccessoryView, ScrollView } from 'react-native';
import { TextInput } from "@react-native-material/core";
import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { getJornadaActiva, getSiguientePantalla, setSiguientePantalla, newJornada, getJornada, saveJornada } from '../../api';
import { ActionTypes, setContextState, useContextState } from '../navigation/contextState';
import { Bluetooth } from '../utils/Bluetooth';
import DeviceModal from "../components/DeviceConnectionModal.jsx";

//import jornadaActiva from '../../api.js'
//import siguientePantalla from '../../api.js'



export default function PrimeraHome({ navigation }) {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const { contextState, setContextState } = useContextState()
    const [sensorValue, setsensorValue] = useState(null)
    const [medicionGuardada, setmedicionGuardada] = useState(false)
    const [proximaPantalla, setProximaPantalla] = useState(false)

    const scanForDevices = async () => {
        const isPermissionsEnabled = await Bluetooth.requestPermissions()
        if (isPermissionsEnabled) {
            Bluetooth.scanForPeripherals()
        }
    }

    const [devices, setDevices] = useState(null)

    const getDevices = async () => {
        setDevices(await Bluetooth.getAllDevices())
    }

    const hideModal = () => {
        setIsModalVisible(false)
    }

    const openModal = async () => {
        scanForDevices()
        setIsModalVisible(true)
    }


    const crearJornada = async () => {
        const idUsuario = contextState.usuario.idUsuario
        console.log(idUsuario)
        saveJornada(idUsuario)
    }

    const [fontsLoaded, setFontsLoaded] = useState(false);
    useEffect(() => {
        if (!fontsLoaded) {
            loadFonts();
        }
        getDevices()
        console.log(devices)
    }, [])
    /*
    var jornadaActiva = getJornadaActiva(contextState.usuario.idUsuario)
    var siguientePantalla = getSiguientePantalla()

    if (!jornadaActiva) {
        setSiguientePantalla('PrimeraHome')
        //siguientePantalla = 'PrimeraHome'
    }
    else if(jornadaActiva) {
        setSiguientePantalla('Home')
        //siguientePantalla = 'Home'
    }
    siguientePantalla = getSiguientePantalla()
    */

    const loadFonts = async () => {
        await Font.loadAsync({
            'alata': require('../assets/fonts/Alata/Alata.ttf'),
            'inter': require('../assets/fonts/Inter/Inter.ttf'),
        });
        setFontsLoaded(true);
    }
    return (
        <>
            {devices != null ? (
                sensorValue != null ? (
                    <View style={styles.containerDos}>
                        <View style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <Text style={styles.texto}>¡Listo! ¡Ya puedes soplar!</Text>
                        </View>
                        <View style={styles.finalizarJornada}>
                            <TouchableOpacity style={styles.finalizarJornada} onPress={() => { navigation.navigate('SalirJornada') }}>
                                <Text style={[{ color: 'red', fontSize: '1rem', fontFamily: 'inter', display: 'flex', alignItems: 'center', justifyContent: 'center', }]}>Finalizar jornada</Text>
                            </TouchableOpacity>
                        </View>
                    </View>) :
                    medicionGuardada == false ? (
                        <View style={styles.containerDos}>
                            <View style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <Text style={styles.texto}>Leyendo Medición...</Text>
                            </View>
                            <View style={{ flexDirection: "row", marginTop: '2rem', display: 'flex', justifyContent: 'space-around' }}>
                                <iframe src="https://gifer.com/embed/2uGh" frameBorder="0" allowFullScreen></iframe>
                            </View>
                            <View style={styles.finalizarJornada}>
                                <TouchableOpacity style={styles.finalizarJornada} onPress={() => { navigation.navigate('SalirJornada') }}>
                                    <Text style={[{ color: 'red', fontSize: '1rem', fontFamily: 'inter', display: 'flex', alignItems: 'center', justifyContent: 'center', }]}>Finalizar jornada</Text>
                                </TouchableOpacity>
                            </View>
                        </View>) :
                        proximaPantalla == false ? (
                            <View style={styles.containerDos}>
                                <TouchableOpacity onPress={() => setProximaPantalla(true)}>
                                    <Icon icon="ic:outline-check-circle" color="#f86800" width={210} />
                                </TouchableOpacity>
                            </View>) :
                            <View style={styles.containerDos}>
                                <View style={styles.centrar}>
                                    <View style={{marginTop: '7rem'}}>
                                        <Text style={styles.textoDos}>Medición gurdada:</Text>
                                    </View>
                                    <View>
                                        <View style={styles.circle}>
                                            <Text style={styles.text}>XX gl/l</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity style={styles.botonAceptar}>
                                        <Text style={[{ color: 'white', fontSize: '1rem', fontFamily: 'inter' }]}>Seguir</Text>
                                    </TouchableOpacity>
                                </View>
                                
                                    <TouchableOpacity style={[{marginBottom: '1rem'}]} onPress={() => { navigation.navigate('SalirJornada') }}>
                                        <Text style={[{ color: 'red', fontSize: '1rem', fontFamily: 'inter', display: 'flex', alignItems: 'center', justifyContent: 'center', }]}>Finalizar jornada</Text>
                                    </TouchableOpacity>
                                
                            </View>
            ) :
                <View style={styles.container}>
                    <Text style={styles.titulo}>Snifterly</Text>

                    <View style={styles.botonAgregar}>
                        <TouchableOpacity onPress={() => { openModal, crearJornada(), navigation.navigate('IngresoDeDatos') }}>
                            <Icon icon="icon-park-solid:add-one" color="white" width={'9rem'} />
                        </TouchableOpacity>
                        <DeviceModal
                            closeModal={hideModal}
                            visible={isModalVisible}
                            connectToPeripheral={Bluetooth.getConnectedDevice()}
                            devices={Bluetooth.getAllDevices()}
                        />
                        <Text style={{ textAlign: 'center', color: 'white', fontSize: '1.5rem', fontFamily: 'Alata', marginTop: '1rem' }}>nueva jornada</Text>
                    </View>

                    <View style={styles.footer}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TouchableOpacity onPress={() => { navigation.navigate('PrimeraHome') }}>
                                <Icon icon="material-symbols:home" width={'2.5rem'} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { navigation.navigate('Historial') }}>
                                <Icon icon="zondicons:calendar" width={'2.3rem'} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { navigation.navigate('Usuario') }}>
                                <Icon icon="mdi:account" width={'2.5rem'} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>}</>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'orange',
        fontFamily: 'alata',
        backgroundImage: "linear-gradient(180deg, #FC9B29 0%, #FC8E29 0%, #FF5925 100%, #E93921)"
    },
    centrar: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'alata',
        backgroundColor: 'white'
    },
    containerDos: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'alata',
        backgroundColor: 'white'
    },
    titulo: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: '2rem',
        marginTop: '3rem',
        marginBottom: '8rem',
        fontFamily: 'alata',
        color: 'white',
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
    botonAgregar: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    finalizarJornada: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '1rem',
    },
    texto: {
        display: 'flex',
        fontSize: '1.5rem',
        marginTop: '3rem',
        fontFamily: 'alata',
        marginLeft: '2rem',
        marginRight: '2rem',
        justifyContent: 'center',
        textAlign: 'center',
    },
    textoDos: {
        display: 'flex',
        fontSize: '1.5rem',
        fontFamily: 'alata',
        justifyContent: 'center',
        textAlign: 'center',
        marginBottom: '2rem'
    },
    botonAceptar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '8rem',
        minHeight: '3rem',
        backgroundColor: "#5654E1",
        borderRadius: 15,
    },
    circle: {
        width: 175,
        height: 175,
        borderRadius: 100,
        borderColor: '#F86800',
        borderWidth: 17,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '2rem',
    },
    text: {
        color: '#F86800',
        fontSize: 30,
        fontWeight: "bold",
    },
});