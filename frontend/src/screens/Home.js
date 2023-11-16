//La carpeta screens sirve para especificar las pantallas de la aplicación
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Button,
  Text,
  View,
  Alert,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Modal,
  Pressable
} from "react-native";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { HomeFilled } from "@ant-design/icons";
import { Icon } from "@iconify/react";
import React, { useState, useEffect, Fragment } from "react";
import * as Font from "expo-font";
import { getJornada, getMedicionesCountByIdJornada, getAvgMediciones, getFirstMedicion, getUsuarios, getMedicionReciente, getLastMedicionByIdJornada, getJornadaActiva, getJornadaReciente, setModResistenciaByIdUsuario } from "../../api";
import { useIsFocused } from "@react-navigation/native";
import Progress from "react-circle-progress-bar";
import { setContextState, ActionTypes, contextState, useContextState } from '../navigation/contextState';
import { render } from "react-dom";

export default function Home({ navigation }) {
  const [tiempo, setTiempo] = useState(100);

  //conexión al backend

  const [mediciones, setMediciones] = useState(0); //Array de mediciones de la jornada actual

  const [avgMediciones, setAvgMediciones] = useState(0);

  const [gradoActual, setGradoActual] = useState(0);

  const [lastMedicion, setLastMedicion] = useState(0);

  const [primeraMedicion, setPrimeraMedicion] = useState(new Date());

  const { contextState, setContextState } = useContextState()

  const [tiempoRestante, setTiempoRestante] = useState(new Date());

  const [idJornadaActiva, setIdJornadaActiva] = useState(0);

  const [llegaronLosValores, setLlegaronLosValores] = useState(false);

  const [calcularTiempo, setcalcularTiempo] = useState(0)

  const [limiteAlcohol, setLimiteAlcohol] = useState(0)

  const [modalVisible, setModalVisible] = useState(false);

  const [mensaje, setMensaje] = useState("");

  const isFocused = useIsFocused();

  const loadJornada = async () => {
    setLlegaronLosValores(false)
    const datax = await getJornadaActiva(contextState.usuario.idUsuario)
    console.log(datax, llegaronLosValores)

    setContextState({
      type: ActionTypes.SetIdJornada,
      value: datax.idJornada
    });
    setIdJornadaActiva(datax.idJornada) //idJornadaActiva --> valor 

    if (datax.idJornada != 0 || contextState.jornada.idJornada == datax.idJornada) {
      setLlegaronLosValores(true)
    }
    else {
      setLlegaronLosValores(false)
    }
  }

  const loadJornadaExtra = async () => {
    const data3 = await getAvgMediciones();
    setAvgMediciones(data3);

    if (idJornadaActiva != 0) {
      const lastMedicionn = await getLastMedicionByIdJornada(idJornadaActiva)
      console.log(lastMedicionn)
      setLastMedicion(lastMedicionn)
      setGradoActual(lastMedicionn.grado)
      const data2 = await getMedicionesCountByIdJornada(idJornadaActiva);
      setMediciones(data2);
      console.log(data2);
      calcularDiferencia();
    }

    async function calcularDiferencia() {
      try {
        const data4 = await getFirstMedicion(idJornadaActiva); // Obtener la fecha de la primera medición
        const fecha = new Date(data4.fecha);
        const horaActual = new Date();
        const diferenciaEnMilisegundos = horaActual - fecha;

        const horas = Math.floor(diferenciaEnMilisegundos / 3600000); // 1 hora = 3600000 milisegundos
        const minutos = Math.floor((diferenciaEnMilisegundos % 3600000) / 60000); // 1 minuto = 60000 milisegundos
        const segundos = Math.floor((diferenciaEnMilisegundos % 60000) / 1000); // 1 segundo = 1000 milisegundos

        console.log(`Diferencia: ${horas} horas, ${minutos} minutos, ${segundos} segundos`);

        var tiempoFinal = new Date(1970, 1, 1, horas, minutos, segundos)
        //tiempoFinal.setHours(tiempoRestante.getHours() + horas, tiempoRestante.getMinutes() + minutos, tiempoRestante.getSeconds() + segundos)

        setTiempoRestante(tiempoFinal)

      } catch (error) {
        console.error("Error al obtener la fecha de la primera medición", error);
      }
    }

    console.log(tiempoRestante)
  };

  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    if (!fontsLoaded) {
      loadFonts();
    }
    if (contextState.jornada.idJornada == 0 || contextState.jornada.idJornada != idJornadaActiva) { //Si ya se seteo la jornada en el context no hace falta cargarlo nuevamente, y trae directamente las mediciones
      loadJornada()
    }
    else {
      loadJornadaExtra();
    }
    setLimiteAlcohol(contextState.usuario.modResistencia)
    setMensaje("Advertencia! Alcanzate tu límite de alcohol 😱")
  }, [isFocused]);
  
  useEffect(() => {
    loadJornadaExtra();
  }, [llegaronLosValores]);
  
  useEffect(() => {
    tiempoSobrio();
    if (gradoActual >= limiteAlcohol && limiteAlcohol != null && limiteAlcohol != 0) {
      setModalVisible(true)
      setModResistenciaByIdUsuario(gradoActual, contextState.usuario.idUsuario)
    }
  }, [gradoActual])

  useEffect(() => {
    setTiempo(calcularTiempo * 60 * 60)
  }, [calcularTiempo])

  const loadFonts = async () => {
    await Font.loadAsync({
      alata: require("../assets/fonts/Alata/Alata.ttf"),
      inter: require("../assets/fonts/Inter/Inter.ttf"),
    });
    setFontsLoaded(true);
  };

  const handleSubmit = (e) => {
    //setvarible ((e) => getCountMediciones())
    setTiempo((e) => 0);
  }

  const tiempoSobrio = () => {
    setcalcularTiempo(gradoActual / 0.15)
  }

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>Snifterly</Text>

      <View style={[styles.espacioCuadros, { marginBottom: "1rem" }]}>
        <View style={styles.cuadro}>
          <View style={{ flexDirection: "row", marginLeft: "0.5rem" }}>
            <Text name='count' style={[styles.medicion, { fontSize: "2.5rem" }]}>
              {mediciones}
            </Text>
            <Text style={styles.medicion}> veces</Text>
          </View>
          <Text style={styles.texto}>te has hecho una medición</Text>
        </View>
        <View style={styles.cuadro}>
          <View style={{ flexDirection: "row", marginLeft: "0.5rem" }}>
            <Text style={[styles.medicion, { fontSize: "2.5rem" }]}>
              {gradoActual}
            </Text>
            <Text style={styles.medicion}> dg/l</Text>
          </View>
          <Text style={styles.texto}>es tu de alcohol en sangre actual</Text>
        </View>
      </View>

      <View style={[styles.espacioCuadros]}>
        <View style={styles.cuadro}>
          <View style={{ flexDirection: "row", marginLeft: "0.5rem" }}>
            <Text style={[styles.medicion, { fontSize: "2.1rem" }]}>
              {tiempoRestante.getHours()}
            </Text>
            <Text style={[styles.medicion, { fontSize: "1rem" }]}> hs, </Text>
            <Text style={[styles.medicion, { fontSize: "2.1rem" }]}>
              {tiempoRestante.getMinutes()}
            </Text>
            <Text style={[styles.medicion, { fontSize: "1rem" }]}> min </Text>
            {/* <Text style={[styles.medicion, { fontSize: "2.1rem" }]}>
              {tiempoRestante.getSeconds()}
              </Text>
            <Text style={[styles.medicion, { fontSize: "1rem" }]}> sec</Text> */}
          </View>
          <Text style={styles.texto}>es la longitud actual de tu jornada</Text>
        </View>
        <View style={styles.cuadro}>
          <View style={{ flexDirection: "row", marginLeft: "0.5rem" }}>
            {
              (gradoActual >= limiteAlcohol && limiteAlcohol != null && limiteAlcohol != 0) ?
                <>
                  <Text style={[styles.medicion, { fontSize: "2.5rem", color: 'red' }]}>
                    {(limiteAlcohol != null && limiteAlcohol != 0) ? limiteAlcohol : '-'}
                  </Text>
                  <Text style={[styles.medicion, { color: 'red' }]}> mg/l</Text>
                </>
                :
                <>
                  <Text style={[styles.medicion, { fontSize: "2.5rem" }]}>
                    {(limiteAlcohol != null && limiteAlcohol != 0) ? limiteAlcohol : '-'}
                  </Text>
                  <Text style={styles.medicion}> mg/l</Text>
                </>
            }
          </View>
          <Text style={styles.texto}>es tu límite de alcohol en sangre</Text>
        </View>
      </View>

      <View style={{ display: "flex", alignItems: "center" }}>
        <View style={[styles.cuadroDelCronometro, { marginBottom: "1rem" }]}>
          <View style={{ display: "flex", alignItems: "center" }}>
            <CountdownCircleTimer
              isPlaying
              duration={(tiempo)}
              colors={["#5654E1", "#5A58E2", "#5160E3", "#5767E4"]}
              colorsTime={[7, 5, 2, 0]}
              size={130}
            >
              {({ remainingTime }) => <><p>{Math.trunc(remainingTime / 60 ** 2) != 0 && <span>{Math.trunc(remainingTime / 60 ** 2)}hs</span>} {Math.trunc((remainingTime / 60) % 60)}min {Math.trunc(remainingTime / 60 ** 2) == 0 && <span> {remainingTime % 60}seg</span>}</p></>}
            </CountdownCircleTimer>
          </View>
          <Text
            style={[
              styles.texto,
              { fontWeight: "bold", fontSize: "0.8rem", textAlign: "center" },
            ]}
          >
            te falta para alcanzar{" "}
          </Text>
          <Text
            style={[
              styles.texto,
              { fontWeight: "bold", fontSize: "0.8rem", textAlign: "center" },
            ]}
          >
            alcohol 0 en sangre
          </Text>
        </View>
      </View>

      <View style={{ display: "flex", alignItems: "center" }}>
        <TouchableOpacity
          style={styles.botonFinalizar}
          onPress={() => {
            navigation.navigate("SalirJornada");
          }}
        >
          <Text style={[{ color: "white", fontSize: "1rem" }]}>Finalizar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{mensaje}</Text>
              <Pressable
                style={styles.botonFinalizar}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={[{ color: "white", fontSize: "1rem" }]}>Entendido</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
      
      <View style={[styles.botonAgregar, { flex: 2, display: "flex", justifyContent: "flex-end", marginBottom: "1rem", },]}>
        <TouchableOpacity onPress={() => { navigation.navigate("IngresoDeDatos"); }}>
          <Icon icon="zondicons:add-solid" width={"3rem"} />
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>

          <Icon icon="material-symbols:home" width={"2.5rem"} />

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Historial");
            }}
          >
            <Icon icon="zondicons:calendar" width={"2.3rem"} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Usuario");
            }}
          >
            <Icon icon="mdi:account" width={"2.5rem"} />
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    fontFamily: "Alata",
    backgroundColor: 'white',
  },
  titulo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "1.5rem",
    marginTop: "3rem",
    marginBottom: "3rem",
    fontFamily: "alata",
  },
  cuadroDelCronometro: {
    display: "flex",
    padding: "0.5rem",
    marginRight: "0.3rem",
    marginLeft: "0.3rem",
    marginTop: "1.5rem ",
    minWidth: "22rem",
    borderRadius: 20,
    backgroundColor: "#ECECEC",
    borderColor: "#ECECEC",
    fontFamily: "alata",
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
    padding: "0.5rem",
    minheight: "11rem",
    maxWidth: "10rem",
    padding: "0.3rem",
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
  espacioCuadros: {
    display: "flex",
    width: "100%",
    paddingLeft: "1.7rem",
    paddingRight: "1.7rem",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  medicion: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    fontFamily: "alata",
    color: "#5654E1",
    display: 'flex',
    alignSelf: 'flex-end'
  },
  texto: {
    marginLeft: "0.5rem",
    marginRight: "0.5rem",
    fontSize: "0.8rem",
    color: "#4B4B4B",
    fontFamily: "alata",
  },
  botonFinalizar: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    maxHeight: "3rem",
    minWidth: "8rem",
    backgroundColor: "#5654E1",
    borderRadius: 15,
    padding: 10,
  },
  botonAgregar: {
    width: "100%",
    paddingRight: "25px",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  footer: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "1rem",
    width: "100%",
    paddingLeft: "2rem",
    paddingRight: "2rem",
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
