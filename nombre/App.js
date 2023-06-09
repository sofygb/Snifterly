import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View, Alert, SafeAreaView} from 'react-native';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

export default function App() {
  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <div className="timer">Too lale...</div>;
    }
  const UrgeWithPleasureComponent = () => (
    <CountdownCircleTimer
      isPlaying
      duration={7}
      colors={['#004777', '#F7B801', '#A30000', '#A30000']}
      colorsTime={[0, 2, 5, 7]}
    >
      {({ remainingTime }) => remainingTime}
    </CountdownCircleTimer>
  )
  return (
    <View style={styles.container}>
      <View style={{flex: 1.2}}> <Text style={styles.title}>Snifterly!</Text> </View>

      <View style={[{flex: 1.5}]}> 

        <View style={[styles.container,{flexDirection: 'row',},]}>
          <View style={styles.cuadro}>
            <Text style={styles.subtitulo}>CUADRO 1</Text> 
            <Text style={styles.texto}>has ingresado mediciones</Text>
          </View>
          <View style={styles.cuadro}>
            <Text style={styles.subtitulo}>CUADRO 2</Text> 
            <Text style={styles.texto}>has ingresado mediciones</Text>
          </View>
        </View>

        <View style={[styles.container,{flexDirection: 'row',},]}>
          <View style={styles.cuadro}>
            <Text style={styles.subtitulo}>CUADRO 3</Text> 
            <Text style={styles.texto}>has ingresado mediciones</Text>
          </View>
          <View style={styles.cuadro}>
            <Text style={styles.subtitulo}>CUADRO 4</Text> 
            <Text style={styles.texto}>has ingresado mediciones</Text>
          </View>
        </View>

      </View>
      <View style={{flex: 2}}>
      <View style={styles.cuarounico}>  
          <Text style={styles.textodos}>te falta para alcanzar alcohol 0 en sangre</Text>
          <View className="timer">
          <View className="text">Remaining</View>
          <View className="value">{remainingTime}</View>
          <View className="text">seconds</View>
          </View>
        </View>
      </View>
      
      <View style={{flex: 1}}><View style={{flexDirection:'row', backgroundColor:'black'}}></View>
      <Button style={styles.boton} color="#5654E1" borderRadius="20" title="Finalizar"/>
      </View>
    </View>
  );

  //<Text style={styles.title}>Snifterly! {fecha}</Text>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  title: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    marginTop: '3rem',
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
  },
  cuadro: {
    flex: 0.3,
    borderWidth: 2,
    borderRadius: 20,
    padding: '0.5rem',
    marginRight: '0.3rem',
    marginLeft: '0.3rem',
    minheight: '8rem',
    minWidth: '10rem',
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
    marginTop: '3rem ',
    minheight: '8rem',
    minWidth: '10rem',
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
