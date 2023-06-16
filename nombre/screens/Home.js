import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View, Alert, SafeAreaView, TouchableOpacity} from 'react-native';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import {HomeFilled} from '@ant-design/icons';
import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import SemiCircleProgress from '../components/SemiCircleProgress.js';

export default function Home({ navigation }) {
    const[fontsLoaded, setFontsLoaded] = useState(false);
    useEffect(() => {
        if(!fontsLoaded){
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

  const [variable, setvarible] = useState(3)
  const handleSubmit = (e) => {
    setvarible((e) => 0)
  }

  return(

    <View style={styles.container}>
      <Text style={styles.titulo}>Snifterly</Text>

      <View style={[styles.espacioCuadros, {marginBottom: '1rem'}]}>
          <View style={styles.cuadro}>
            <View style={{flexDirection: 'row', marginLeft: '1rem',}}>
              <Text style={[styles.medicion, {fontSize: '2.5rem'}]}>{variable}</Text>
              <Text style={styles.medicion}> veces</Text> 
            </View>
            <Text style={styles.texto}>has ingresado mediciones</Text>
          </View>
          <View style={styles.cuadro}>
            <View style={{flexDirection: 'row', marginLeft: '1rem'}}>
              <Text style={[styles.medicion, {fontSize: '2.5rem'}]}>{variable}</Text>
              <Text style={styles.medicion}> mg/l</Text>
            </View>
            <Text style={styles.texto}>has ingresado mediciones</Text>
          </View>
      </View>

      <View style={[styles.espacioCuadros, {marginBottom: '1rem'}]}>
          <View style={styles.cuadro}>
            <View style={{flexDirection: 'row', marginLeft: '1rem',}}>
              <Text style={[styles.medicion, {fontSize: '2.5rem'}]}>{variable}</Text>
              <Text style={styles.medicion}> veces</Text> 
            </View>
            <Text style={styles.texto}>has ingresado mediciones</Text>
          </View>
          <View style={styles.cuadro}>
            <View style={{flexDirection: 'row', marginLeft: '1rem'}}>
              <Text style={[styles.medicion, {fontSize: '2.5rem'}]}>{variable}</Text>
              <Text style={styles.medicion}> mg/l</Text>
            </View>
            <Text style={styles.texto}>has ingresado mediciones</Text>
          </View>
      </View>

      <View style={{display: 'flex', alignItems: 'center'}}>
        <View style={[styles.cuadroDelCronometro, {marginBottom: '2rem'}]}>
        {/* <SemiCircleProgress
            percentage={35}
            progressColor={"green"}>
            <Text style={{ fontSize: 32, color: "green" }}>35%</Text>
        </SemiCircleProgress> */}
          <Text style={[styles.texto, {fontWeight: 'bold', fontSize: '0.8rem', textAlign: 'center',}]}>te falta para alcanzar </Text> 
          <Text style={[styles.texto, {fontWeight: 'bold', fontSize: '0.8rem', textAlign: 'center',}]}>alcohol 0 en sangre</Text>
        </View>
      </View>

      <View style={{marginBottom: '3rem', display: 'flex', alignItems: 'center', marginBottom: '3rem'}}>
        <TouchableOpacity style={styles.botonFinalizar} onPress={handleSubmit}>
          <Text style={[{color: 'white', fontSize: '1rem'}]}>Finalizar</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.botonAgregar, {flex: 2, display: 'flex', justifyContent: 'flex-end'}]}><Icon icon="zondicons:add-solid" width={'3rem'}/></View>

      <View style={styles.footer}>
        <View style={{flexDirection:'row', justifyContent: 'space-between'}}> 
          <Icon icon="material-symbols:home"  width={'2.5rem'}/>
          <Icon icon="zondicons:calendar" width={'2.3rem'}/>
          <Icon icon="mdi:account" width={'2.5rem'}/>
        </View>
      </View>

    </View>

    // <View>
    //   <TouchableOpacity style={styles.boton} onPress = { () => {navigation.navigate('IngresoDeDatos')}}>
    //       <Text style={[{color: 'white', fontSize: '1rem', fontFamily: 'inter'}]}>Finalizar</Text>
    //   </TouchableOpacity>
    //   <Text>{variable}</Text>
    // </View>
  )
}


const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flex: 1,
      fontFamily: 'Alata',
    },
    titulo: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      fontSize: '1.5rem',
      marginTop: '3rem',
      marginBottom: '3rem',
      fontFamily: 'alata',
    },
    cuadroDelCronometro: {
      display: 'flex',
      padding: '0.5rem',
      marginRight: '0.3rem',
      marginLeft: '0.3rem',
      marginTop: '1.5rem ',
      minWidth: '22rem',
      borderRadius: 20,
      backgroundColor: '#ECECEC',
      borderColor: '#ECECEC',
      fontFamily: 'alata',
      shadowColor: "#C4C4C4",
          shadowOffset: {
            width: 2,
            height: 4,
          },
          shadowOpacity: 1,
          shadowRadius: 5,
    },
    cuadro: {
      borderWidth: 2,
      borderRadius: 20,
      padding: '0.5rem',
      minheight: '11rem',
      maxWidth: '10rem',
      padding: '0.3rem',
      backgroundColor: '#ECECEC',
      borderColor: '#ECECEC',
      fontFamily: 'alata',
      shadowColor: "#C1C0C0",
          shadowOffset: {
            width: 2,
            height: 4,
          },
          shadowOpacity: 2,
          shadowRadius: 5,
    },
    espacioCuadros:{
      display: 'flex',
      width: '100%',
      paddingLeft: '1.7rem',
      paddingRight: '1.7rem',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    medicion: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      fontFamily: 'alata',
      color: '#5654E1',
    },
    texto:{
      marginLeft: '1rem',
      marginRight: '1rem',
      fontSize: '0.8rem',
      color: '#4B4B4B',
      fontFamily: 'alata',
    },
    botonFinalizar: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      maxHeight: '3rem',
      minWidth: '8rem',
      backgroundColor:"#5654E1",
      borderRadius: 15,
      padding: 10,
    },
    botonAgregar:{
      width: '100%',
      paddingRight: '25px',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },
    footer:{
      flex: 1,
      display: 'flex',
      justifyContent: 'flex-end',
      marginBottom: '1rem', 
      width: '100%',
      paddingLeft: '2rem',
      paddingRight: '2rem',
    },
  });