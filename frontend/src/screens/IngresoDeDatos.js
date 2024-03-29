import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { TextInput } from "@react-native-material/core";
import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { getJornadaReciente, setMediciones, setJornadaDesactiva, getJornadaActiva } from '../../api';
import { ActionTypes, setContextState, useContextState } from '../navigation/contextState';

export default function IngresoDeDatos({ navigation }) {
  const initialText = '';
  const [text, setText] = useState(initialText);
  const { contextState, setContextState } = useContextState()

  const loadJornada = async () => {
    const data = await getJornadaActiva(contextState.usuario.idUsuario)
    console.log(data)

    setContextState({
      type: ActionTypes.SetIdJornada,
      value: data.idJornada
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
  

  const agregarMedicion = (grado) => {
    if(grado != null && parseInt(grado * 1000)/1000) {
      setMediciones(grado, contextState.jornada.idJornada)
      setContextState({
        type: ActionTypes.SetActivo,
        value: 1
      });
      setContextState({
        type: ActionTypes.SetGrado,
        value: grado
    });
      navigation.navigate('EstadoUsuario')
    }
    else{
      console.error("Error: No se ingresó el grado")
    }
  }

    const inicializarContext = () => {
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
        type: ActionTypes.SetFechaFin,
        value: 1 / 1 / 1970
      })
      setContextState({
        type: ActionTypes.SetIdUsuario,
        value: 0
      })
      setContextState({
        type: ActionTypes.SetActivo,
        value: 0
      })
      setJornadaDesactiva()
      navigation.navigate('SalirJornada')
    }

  return (
    <View style={styles.container}>
      <View style={{ flex: 6, display: 'flex', justifyContent: 'center' }}>
        <Text style={styles.textoPrincipal}>Ingrese/Editar el valor que aparece en el dispositivo</Text>

        <TextInput style={{ margin: 14, marginRight: 32, marginLeft: 32 }} onChangeText={setText} value={text} placeholder={'agregar medición...'} id='grado'/>

        <View style={[styles.espaciosBotones, { flexDirection: 'row', display: 'flex', alignItems: 'center' }]}>
          <TouchableOpacity style={styles.botonAceptar} onPress={() => { agregarMedicion(text) }}> {//EL GETJORNDADAACTIVA TRAE UN CHOCLO
}
            <Text style={[{ color: 'white', fontSize: 16, fontFamily: 'inter' }]}>Aceptar</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.botonCancelar} onPress={() => { navigation.navigate("Home") }}>
            <Text style={[{ fontSize: 16, fontFamily: 'inter' }]}>Cancelar</Text>
          </TouchableOpacity> */}
        </View>
      </View>

      <View style={styles.finalizarJornada}>
        <TouchableOpacity style={styles.finalizarJornada} onPress={() => { inicializarContext() }}>
          <Text style={[{ color: 'red', fontSize: 16, fontFamily: 'inter' }]}>Finalizar jornada</Text>
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
    maxHeight: 48,
    minWidth: 128,
    backgroundColor: "#5654E1",
    borderRadius: 15,
    padding: 10,
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
  espaciosBotones: {
    display: 'flex',
    width: '100%',
    paddingLeft: 32,
    paddingRight: 32,
    flexDirection: 'row',
    justifyContent: 'space-around',
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
});