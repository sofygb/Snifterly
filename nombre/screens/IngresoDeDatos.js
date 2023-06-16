import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View, Alert, SafeAreaView, TouchableOpacity, InputAccessoryView, ScrollView, TextInput} from 'react-native';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import {HomeFilled} from '@ant-design/icons';
import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';

export default function IngresoDeDatos({ navigation }) {
  const inputAccessoryViewID = 'uniqueID';
  const initialText = '';
  const [text, setText] = useState(initialText);
  return(
    <View style={styles.container}>
      
      <Text>Ingrese/Editar el valor que aparece en el dispositivo</Text>
      
      <TextInput style={{ padding: 16, marginTop: 50,}}
          inputAccessoryViewID={inputAccessoryViewID}
          onChangeText={setText}
          value={text}
          placeholder={'agregar medición...'}
        />

          
      <View style={[styles.espaciosBotones, {flexDirection: 'row', display: 'flex', alignItems: 'center'}]}>
        <TouchableOpacity style={styles.botonAceptar} onPress={() => setText(initialText)}>
          <Text style={[{color: 'white', fontSize: '1rem', fontFamily: 'inter'}]}>Aceptar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botonCancelar} onPress={() => setText(initialText)}>
          <Text style={[{color: 'white', fontSize: '1rem', fontFamily: 'inter'}]}>Cancelar</Text>
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
      maxHeight: '3rem',
      minWidth: '8rem',
      backgroundColor:"#5654E1",
      borderRadius: 15,
      padding: 10,
    },
    botonCancelar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      maxHeight: '3rem',
      minWidth: '8rem',
      backgroundColor:"#D9D9D9", 
      borderRadius: 15,
      padding: 10,
    },
    espaciosBotones:{
      display: 'flex',
      width: '100%',
      paddingLeft: '2rem',
      paddingRight: '2rem', 
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
  });