import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View, Alert, SafeAreaView, TouchableOpacity, InputAccessoryView, ScrollView} from 'react-native';
import { TextInput } from "@react-native-material/core";
import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';

export default function IngresoDeDatos({ navigation }) {
  const initialText = '';
  const [text, setText] = useState(initialText);

  return(
    <View style={styles.container}>
      <View style={{flex: 6, display: 'flex', justifyContent: 'center'}}>
        <Text style={styles.textoPrincipal}>Ingrese/Editar el valor que aparece en el dispositivo</Text>

        {/*Puede ser util para el inicio sesion
        <TextInput variant="outlined" label="Label" style={{ margin: 16 }} />*/}

        <TextInput style={{ padding: 16}}
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

      <View style={styles.finalizarJornada}>
        <TouchableOpacity style={styles.finalizarJornada} onPress = { () => {navigation.navigate('Home')}}>
            <Text style={[{color: 'red', fontSize: '1rem', fontFamily: 'inter'}]}>Finalizar jornada</Text>
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
    textoPrincipal:{
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
  });