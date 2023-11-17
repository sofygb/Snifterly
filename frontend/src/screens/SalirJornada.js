import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View, Alert, SafeAreaView, TouchableOpacity, InputAccessoryView, ScrollView } from 'react-native';
import { TextInput } from "@react-native-material/core";
import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react';
import { getJornadaActiva, getSiguientePantalla, setSiguientePantalla, newJornada, setJornadaDesactiva, setFechaFinJornada } from '../../api';
import { ActionTypes, setContextState, useContextState } from '../navigation/contextState';
import * as Font from 'expo-font';

export default function SalirJornada({ navigation }) {
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

  const salirJornada = () => {
    setJornadaDesactiva()
    setFechaFinJornada(contextState.jornada.idJornada)
    console.log('hola')
    setContextState({
      type: ActionTypes.SetIdJornada,
      value: 0
    })
    setContextState({
      type: ActionTypes.SetFechaInicio,
      value: 1 / 1 / 1970
    })
    setContextState({
      type: ActionTypes.SetFechaFin,
      value: 1 / 1 / 1970
    })
    setContextState({
      type: ActionTypes.SetIdUsuarioJornada,
      value: 0
    })
    setContextState({
      type: ActionTypes.SetActivo,
      value: false
    })
  }
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        <Text style={styles.textoPrincipal}>¿Desea seguir con la jornada?</Text>
      </View>

      <View style={[styles.espaciosBotones, {flexDirection: 'row', display: 'flex', alignItems: 'flex-start' }]}>
        <TouchableOpacity style={styles.botonAceptar} onPress={() => { navigation.navigate('Home') }}>
          <Text style={[{ color: 'white', fontSize: 16, fontFamily: 'inter' }]}>Seguir</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botonCancelar} onPress={() => {salirJornada(), navigation.navigate('PrimeraHome') }}>
          <Text style={[{ color: 'red', fontSize: 16, fontFamily: 'inter' }]}>Finalizar</Text>
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
    minWidth: 128,
    backgroundColor: "#5654E1",
    borderRadius: 15,
    padding: 10,
  },
  botonCancelar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 128,
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
    marginTop: 32,
    paddingLeft: 32,
    paddingRight: 32,
  },
  textoPrincipal: {
    display: 'flex',
    fontSize: 24,
    marginTop: 48,
    fontFamily: 'alata',
    marginLeft: 32,
    marginRight: 32,
    justifyContent: 'center',
    textAlign: 'center',
  },
});