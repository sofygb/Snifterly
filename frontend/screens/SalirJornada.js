import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View, Alert, SafeAreaView, TouchableOpacity, InputAccessoryView, ScrollView } from 'react-native';
import { TextInput } from "@react-native-material/core";
import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';

export default function SalirJornada({ navigation }) {
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
      <View style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        <Text style={styles.textoPrincipal}>¿Desea seguir con la jornada?</Text>
      </View>

      <View style={[styles.espaciosBotones, {flexDirection: 'row', display: 'flex', alignItems: 'flex-start' }]}>
        <TouchableOpacity style={styles.botonAceptar} onPress={() => { navigation.navigate('Home') }}>
          <Text style={[{ color: 'white', fontSize: '1rem', fontFamily: 'inter' }]}>Seguir</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botonCancelar} onPress={() => { navigation.navigate('PrimeraHome') }}>
          <Text style={[{ color: 'red', fontSize: '1rem', fontFamily: 'inter' }]}>Finalizar</Text>
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
  },
  botonAceptar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '8rem',
    backgroundColor: "#5654E1",
    borderRadius: 15,
    padding: 10,
  },
  botonCancelar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '8rem',
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