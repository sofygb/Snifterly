import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View, Alert, SafeAreaView} from 'react-native';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import {HomeFilled} from '@ant-design/icons';
import { Icon } from '@iconify/react';
import React, { useState } from 'react';

export default function App() {
  const [variable, setvarible] = useState(3)
  const handleSubmit = (e) => {
    setvarible((e) => 0)
  }
  return (
    <View style={styles.container}>
      <StatusBar style='auto'/>
      <View style={{flex: 1.3}}> <Text style={styles.title}>Snifterly</Text> </View>

      <View style={[{flex: 2.3}]}> 

        <View style={[styles.container,{flexDirection: 'row',},]}>
          <View style={styles.cuadro}>
            <Text style={styles.subtitulo}><Text style={{fontSize: '2.5rem',}}>{variable}</Text> veces</Text> 
            <Text style={styles.texto}>has ingresado mediciones</Text>
          </View>
          <View style={styles.cuadro}>
            <Text style={styles.subtitulo}><Text style={{fontSize: '2.5rem',}}>{variable}</Text> mg/l</Text> 
            <Text style={styles.texto}>has ingresado mediciones</Text>
          </View>
        </View>

        <View style={[styles.container,{flexDirection: 'row',},]}>
          <View style={styles.cuadro}>
            <Text style={styles.subtitulo}><Text style={{fontSize: '2.5rem',}}>{variable}</Text> veces</Text> 
            <Text style={styles.texto}>has ingresado mediciones</Text>
          </View>
          <View style={styles.cuadro}>
            <Text style={styles.subtitulo}><Text style={{fontSize: '2.5rem',}}>{variable}</Text> mg/l</Text> 
            <Text style={styles.texto}>has ingresado mediciones</Text>
          </View>
        </View>

      </View>
      <View style={{flex: 3}}>
        <View style={styles.cuarounico}>
          {/*Poner lindo el coso de abajo :(
            <CountdownCircleTimer isPlaying duration={60} colors={['#004777', '#F7B801', '#A30000', '#A30000']} colorsTime={[7, 5, 2, 0]}>
                {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>*/}
            <Text style={styles.textodos}>te falta para alcanzar </Text> <Text style={styles.textodos}>alcohol 0 en sangre</Text>
        </View>
      </View>
      
      <View><View style={{flexDirection:'row', backgroundColor:'black'}}></View>
      <Button style={styles.boton} color="#5654E1" borderRadius={'20rem'} title="Finalizar" onPress={handleSubmit}/>
      </View>
      
      <View style={styles.botonAgregar}><Icon icon="zondicons:add-solid" width={'2.5rem'}/></View>

      <View style={styles.footer}>
        <View style={{flexDirection:'row', justifyContent: 'space-between'}}> 
        <Icon icon="material-symbols:home"  width={'2.5rem'}/>
        <Icon icon="zondicons:calendar" width={'2.3rem'}/>
        <Icon icon="mdi:account" width={'2.5rem'}/>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  botonAgregar:{
    width: '100%',
    paddingRight: '25px',
    paddingBottom: '30px',
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  footer:{
    marginBottom: '1rem', 
    width: '100%',
    paddingLeft: '30px',
    paddingRight: '30px',
  },
  title: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    marginTop: '3rem',
    marginBottom: '5rem',
  },
  subtitulo: {
    fontSize: '1.2rem',
    marginLeft: '1rem',
    marginRight: '1rem',
    marginBottom: '0.2rem',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontWeight: 'bold',
    color: '#5654E1'
  },
  texto:{
    marginLeft: '1rem',
    marginRight: '1rem',
    fontSize: '0.8rem',
    color: '#4B4B4B',
  },
  textodos:{
    fontWeight: 'bold',
    fontSize: '0.8rem',
    textAlign: 'center',
  },
  cuadro: {
    flex: 0.3,
    borderWidth: 2,
    borderRadius: 20,
    padding: '0.5rem',
    marginRight: '0.3rem',
    marginLeft: '0.3rem',
    marginBottom: '0.3rem',
    minheight: '8rem',
    minWidth: '40%',
    padding: '0.5rem',
    backgroundColor: '#ECECEC',
    borderColor: '#ECECEC',
    shadowColor: "#C4C4C4",
        shadowOffset: {
          width: 2,
          height: 4,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
  },
  alata: {
    fontFamily:"Alata"
  },
  inter: {
    fontFamily:"Inter",
    fontSize: '0.8rem'
  },
  boton: {
    backgroundColor:"#5654E1", borderTopLeftRadius:20, borderBottomRightRadius:20, borderBottomLeftRadius:20, borderTopRightRadius:20
  }, 
  cuarounico: {
    flex: 0.3,
    padding: '0.5rem',
    marginRight: '0.3rem',
    marginLeft: '0.3rem',
    marginTop: '1.5rem ',
    height: '10rem',
    minWidth: '21rem',
    borderRadius: 20,
    backgroundColor: '#ECECEC',
    borderColor: '#ECECEC',
    shadowColor: "#C4C4C4",
        shadowOffset: {
          width: 2,
          height: 4,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
  },
  timerwrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  
  timer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
    
  value: {
    fontSize: '40px',
  },
  info: {
    maxWidth: '360px',
    margin: '40px auto 0',
    textAlign: 'center',
    fontSize: '16px',
  },
});
