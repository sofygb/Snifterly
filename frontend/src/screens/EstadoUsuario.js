import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { TextInput } from "@react-native-material/core";
import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { setContextState, ActionTypes, contextState, useContextState } from '../navigation/contextState';
import { getJornada, setEstadoUsuario, getUltimaMedicion, getJornadaActiva, getMedicionReciente, setModResistenciaByIdUsuario } from "../../api";


export default function EstadoUsuario({ navigation }) {
  const initialText = '';
  const [text, setText] = useState(initialText);
  const { contextState, setContextState } = useContextState()

  const loadJornada = async () => {
    const medicionReciente = await getMedicionReciente(contextState.jornada.idJornada)
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

    if(estado == 'muy mal'){
      setModResistenciaByIdUsuario(contextState.medicion.grado, contextState.usuario.idUsuario)
      setContextState({
        type: ActionTypes.SetModResistencia,
        value: contextState.medicion.grado
      });
    }

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
            <Text style={[{ fontSize: 16, fontFamily: 'inter' }]}>Saltear</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.finalizarJornada}>
        <TouchableOpacity style={styles.finalizarJornada} onPress={() => { navigation.navigate('SalirJornada') }}>
          <Text style={[{ color: 'red', fontSize: 16, fontFamily: 'inter', display: 'flex', alignItems: 'center', justifyContent: 'center', }]}>Finalizar jornada</Text>
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
    maxHeight: 48,
    minWidth: 128,
    backgroundColor: "#D9D9D9",
    borderRadius: 15,
    padding: 10,
  },
  textoPrincipal: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: 24,
    marginTop: 48,
    marginBottom: 32,
    fontFamily: 'alata',
    marginLeft: 32,
    marginRight: 32,
  },
  finalizarJornada: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: 16,
  },
  imagen: {
    width: '40%',
    height: '40%',
    resizeMode: "contain",
    padding: 64,
  },
  espacioCuadros: {
    display: "flex",
    width: "100%",
    paddingLeft: 20.8,
    paddingRight: 20.8,
    flexDirection: "row",
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  cuadro: {
    borderWidth: 2,
    borderRadius: 20,
    maxheight: 288,
    maxWidth: 288,
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