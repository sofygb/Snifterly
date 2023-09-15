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
    },[])
    /*
    var jornadaActiva = getJornadaActiva()
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

        
        <View style={styles.container}>
            {devices != null ? (<> {/* Página post-conexión*/}</>) : (<>{/**no funciona bien o no se */}
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
            </>)}
        </View>
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
    }
});