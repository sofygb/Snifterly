import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  let fecha = String(new Date().getMonth())
  return (
    <View style={styles.container}>
      <View style={{flex: 1}}> <Text style={styles.title}>Snifterly!</Text> </View>
      <View style={[{flex: 2}]}>

        <View style={[styles.container,{flexDirection: 'row',},]}>
          <View style={styles.cuadro}>
            <Text style={styles.subtitulo}>0 veces</Text> 
          </View>
          <View style={styles.cuadro}>
            <Text style={styles.subtitulo}>0 mg/l</Text> 
          </View>
        </View>
        
        <View style={styles.cuadro}>
          <Text style={styles.subtitulo}>0 veces</Text> 
        </View>
        <View style={styles.cuadro}>
          <Text style={styles.subtitulo}>0 mg/l</Text> 
        </View>
        </View>
      <View style={{flex: 2}}/>
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
    marginTop: '1.5rem',
  },
  subtitulo: {
    fontSize: '1.2rem',
    margin: '1rem',
    marginLeft: '1rem',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cuadro: {
    flex: 0.3,
    backgroundColor: 'white',
    borderWidth: 2,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    justifyContent: 'space-between',
  },
});
