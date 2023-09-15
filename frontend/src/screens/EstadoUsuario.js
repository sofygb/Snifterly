import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { TextInput } from "@react-native-material/core";
import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { setContextState, ActionTypes, contextState, useContextState } from '../navigation/contextState';
import { getJornada, setEstadoUsuario, getUltimaMedicion, getJornadaActiva, getMedicionReciente } from "../../api";


export default function EstadoUsuario({ navigation }) {
  const initialText = '';
  const [text, setText] = useState(initialText);
  const { contextState, setContextState } = useContextState()

  const loadJornada = async () => {
    const [medicionReciente] = await getMedicionReciente(contextState.jornada.idJornada)
    console.log(medicionReciente)

    setContextState({
      type: ActionTypes.SetIdMedicion,
      value: medicionReciente.idMedicion
    });
    setContextState({
      type: ActionTypes.SetGrado,
      value: medicionReciente.grado
    });
    setContextState({
      type: ActionTypes.SetFecha,
      value: new Date (medicionReciente.fecha)
    });
    setContextState({
      type: ActionTypes.SetIdJornadaMedicion,
      value: medicionReciente.idJornada
    });
  }
  const [fontsLoaded, setFontsLoaded] = useState(false);
  useEffect(() => {
    if (!fontsLoaded) {
      loadFonts();
    }
    loadJornada()
  },[])

  const loadFonts = async () => {
    await Font.loadAsync({
      'alata': require('../assets/fonts/Alata/Alata.ttf'),
      'inter': require('../assets/fonts/Inter/Inter.ttf'),
    });
    setFontsLoaded(true);
  }


  const upDateEstadoUsuario = (estado) => {

    setContextState({
      type: ActionTypes.SetEstado,
      value: estado
    });

    setEstadoUsuario(contextState.medicion.idMedicion, estado)

    console.log(contextState)
  }
  return (
    <View style={styles.container}>
      <View style={{ flex: 6, display: 'flex', justifyContent: 'center' }}>
        <Text style={styles.textoPrincipal}>¿Cómo te sentís?</Text>

        <View style={[styles.espacioCuadros]}>
          <TouchableOpacity style={styles.cuadro} onPress={() => { upDateEstadoUsuario('bien'), navigation.navigate('Home') }}>
            <Image source={require('../assets/emojis/SmilingFacewithSunglasses.png')} style={styles.imagen} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cuadro} onPress={() => { upDateEstadoUsuario('normal'), navigation.navigate('Home') }}>
            <Image source={require('../assets/emojis/NeutralFace.png')} style={styles.imagen} />
          </TouchableOpacity>
        </View>
        <View style={[styles.espacioCuadros]}>
          <TouchableOpacity style={styles.cuadro} onPress={() => { upDateEstadoUsuario('mal'), navigation.navigate('Home') }}>
            <Image source={require('../assets/emojis/FacewithSpiralEyes.png')} style={styles.imagen} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cuadro} onPress={() => { upDateEstadoUsuario('muy mal'), navigation.navigate('Home') }}>
            <Image source={require('../assets/emojis/FacewithCrossed-OutEyes.png')} style={styles.imagen} />
          </TouchableOpacity>
        </View>


        <View style={[{ display: 'flex', alignItems: 'center' }]}>
          <TouchableOpacity style={styles.botonCancelar} onPress={() => { navigation.navigate('Home') }}>
            <Text style={[{ fontSize: '1rem', fontFamily: 'inter' }]}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.finalizarJornada}>
        <TouchableOpacity style={styles.finalizarJornada} onPress={() => { navigation.navigate('SalirJornada') }}>
          <Text style={[{ color: 'red', fontSize: '1rem', fontFamily: 'inter', display: 'flex', alignItems: 'center', justifyContent: 'center', }]}>Finalizar jornada</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  botonCancelar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: '3rem',
    minWidth: '8rem',
    backgroundColor: "#D9D9D9",
    borderRadius: 15,
    padding: 10,
  },
  textoPrincipal: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: '1.5rem',
    marginTop: '3rem',
    marginBottom: '2rem',
    fontFamily: 'alata',
    marginLeft: '2rem',
    marginRight: '2rem',
  },
  finalizarJornada: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '1rem',
  },
  imagen: {
    width: '40%',
    height: '40%',
    resizeMode: "contain",
    padding: '4rem',
  },
  espacioCuadros: {
    display: "flex",
    width: "100%",
    paddingLeft: "1.3rem",
    paddingRight: "1.3rem",
    flexDirection: "row",
    justifyContent: 'space-around',
    marginBottom: "1rem",
  },
  cuadro: {
    borderWidth: 2,
    borderRadius: 20,
    maxheight: "18rem",
    maxWidth: "18rem",
    backgroundColor: "#ECECEC",
    borderColor: "#ECECEC",
    fontFamily: "alata",
    shadowColor: "#C1C0C0",
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 2,
    shadowRadius: 5,
  },
})