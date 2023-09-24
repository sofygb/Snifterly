import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View, Alert, SafeAreaView, TouchableOpacity, InputAccessoryView, ScrollView } from 'react-native';
import { TextInput } from "@react-native-material/core";
import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react';
import { getJornadaActiva, getSiguientePantalla, setSiguientePantalla, newJornada, setJornadaDesactiva,setFechaFinJornada } from '../../api';
import { ActionTypes, setContextState, useContextState } from '../navigation/contextState';
import * as Font from 'expo-font';

export default function CerrarSesion({ navigation }) {
  const { contextState, setContextState } = useContextState()

  const [fontsLoaded, setFontsLoaded] = useState(false);
  useEffect(() => {
    if (!fontsLoaded) {
      loadFonts();
    }
  })

  const loadFonts = async () => {
    await Font.loadAsync({
      'alata': require('../assets/fonts/Alata/Alata.ttf'),
      'inter': require('../assets/fonts/Inter/Inter.ttf'),
    });
    setFontsLoaded(true);
  }

  const cerrarSesion = () => {
    //suponngo que lo unico que tenemos que hacer es reiniciar los datos del contextState
    setContextState({
        type: ActionTypes.SetIdUsuario,
        value: -1
    });
    setContextState({
        type: ActionTypes.SetNombre,
        value: ''
    });
    setContextState({
        type: ActionTypes.SetFechaNacimiento,
        value: 1 / 1 / 1970
    });setContextState({
        type: ActionTypes.SetPeso,
        value: 0
    });setContextState({
        type: ActionTypes.SetAltura,
        value: 0
    });setContextState({
        type: ActionTypes.SetEmail,
        value: ''
    });setContextState({
        type: ActionTypes.SetContrasenia,
        value: ''
    });setContextState({
        type: ActionTypes.SetFechaCreacion,
        value: 1 / 1 / 1970
    });setContextState({
        type: ActionTypes.SetModResistencia,
        value: null
    });setContextState({
        type: ActionTypes.SetIdJornada,
        value: -1
    });setContextState({
        type: ActionTypes.SetFechaInicio,
        value: 1 / 1 / 1970
    });setContextState({
        type: ActionTypes.SetFechaFin,
        value: 1 / 1 / 1970
    });setContextState({
        type: ActionTypes.SetIdUsuarioJornada,
        value: 0
    });setContextState({
        type: ActionTypes.SetActivo,
        value: false
    });setContextState({
        type: ActionTypes.SetIdMedicion,
        value: -1
    });setContextState({
        type: ActionTypes.SetGrado,
        value: 0
    });setContextState({
        type: ActionTypes.SetFecha,
        value: 1 / 1 / 1970
    });setContextState({
        type: ActionTypes.SetIdJornadaMedicion,
        value: null
    });setContextState({
        type: ActionTypes.SetEstado,
        value: ''
    });
  }
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        <Text style={styles.textoPrincipal}>¿Desea cerra sesión?</Text>
      </View>

      <View style={[styles.espaciosBotones, {flexDirection: 'row', display: 'flex', alignItems: 'flex-start' }]}>
        <TouchableOpacity style={styles.botonAceptar} onPress={() => { navigation.navigate('InicioSesion') }}>
          <Text style={[{ color: 'white', fontSize: '1rem', fontFamily: 'inter' }]}>Cerrar sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botonCancelar} onPress={() => {cerrarSesion(), navigation.navigate('Configuracion') }}>
          <Text style={[{ color: 'red', fontSize: '1rem', fontFamily: 'inter' }]}>Cancelar</Text>
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
    backgroundColor: 'white',
  },
  botonAceptar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '9rem',
    backgroundColor: "#5654E1",
    borderRadius: 15,
    padding: 10,
  },
  botonCancelar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '9rem',
    backgroundColor: "#D9D9D9",
    borderRadius: 15,
    padding: 10,
  },
  espaciosBotones: {
    flex: 1,
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '2rem',
    paddingLeft: '2rem',
    paddingRight: '2rem',
  },
  textoPrincipal: {
    display: 'flex',
    fontSize: '1.5rem',
    marginTop: '3rem',
    fontFamily: 'alata',
    marginLeft: '2rem',
    marginRight: '2rem',
    justifyContent: 'center',
    textAlign: 'center',
  },
});