import { StatusBar } from 'expo-status-bar';
import { StyleSheet,Button, Text, View, Alert, SafeAreaView} from 'react-native';

export default function App() {
  let fecha = String(new Date().getMonth())
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
          </View>
        </View>

        <View style={[styles.container,{flexDirection: 'row',},]}>
          <View style={styles.cuadro}>
            <Text style={styles.subtitulo}>CUADRO 3</Text> 
          </View>
          <View style={styles.cuadro}>
            <Text style={styles.subtitulo}>CUADRO 4</Text> 
          </View>
        </View>

      </View>
      <View style={{flex: 2}}/>
      <View style={styles.cuadro}>
          <Text style={styles.subtitulo}>CUADRO 5</Text> 
        </View>
      <View style={{flex: 1}}><View style={{flexDirection:'row', backgroundColor:'black'}}></View></View>
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
    justifyContent: 'center',
    justifyContent: 'space-between',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#5654E1'
  },
  texto:{
    marginLeft: '1rem',
    marginRight: '1rem',
    fontSize: '0.8rem',
    color: '#4B4B4B',
    fontFamily: 'inter',
  },
  cuadro: {
    flex: 0.3,
    borderWidth: 2,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
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
});
