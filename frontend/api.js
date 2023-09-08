//Archivo necesario para consultar al backend. Funciones de consulta que interactuan con el back
import AsyncStorage from '@react-native-async-storage/async-storage';

const API = 'http://localhost:3000/jornadas/count/3'

const API2 = 'http://localhost:3000/mediciones/count/3'

const API3 = 'http://localhost:3000/mediciones/avg/3'

const API4 = 'http://localhost:3000/mediciones/first/3'

const API5 = 'http://localhost:3000/jornadaActiva'

const API6 = 'http://localhost:3000/jornada'

const API7 = 'http://localhost:3000/medicion'

const API9 = 'http://localhost:3000/jornadaDesactiva'

const API10 = 'http://localhost:3000/medicionEstado'


/*
export const setJornadaActiva = async (value) => {
    try {
      await AsyncStorage.setItem('jornadaActiva', value);
    } catch (e) {
      // saving error
    }
  };
  
  export const getJornadaActiva = async () => {
    try {
      const value = await AsyncStorage.getItem('jornadaActiva');
      if (value !== null) {
        // value previously stored
      }
    } catch (e) {
      // error reading value
    }
  };
  
  export const setSiguientePantalla = async (value) => {
    try {
      await AsyncStorage.setItem('siguientePantalla', value);
    } catch (e) {
      // saving error
    }
  };
  
  export const getSiguientePantalla = async () => {
    try {
      const value = await AsyncStorage.getItem('siguientePantalla');
      if (value !== null) {
        // value previously stored
      }
    } catch (e) {
      // error reading value
    }
  };

  setJornadaActiva(false)
  
  setSiguientePantalla("Home")

*/
  
export const getUsuario = async (mail, contraseña) => {
    const consulta = `http://localhost:3000`
    const res = await fetch(consulta + `/usuario/${mail}`, {
        METHOD: "GET",
    })
    console.log(res) 
    storeData(res.idUsuario)
    return await res.json()
}

export const getJornada = async () => {
    const res = await fetch(API, {
        METHOD: "GET",
    })
    console.log(res) 
    return await res.json()
}

export const getJornadaActiva = async () => {
  const res = await fetch(API5, {
        method: "GET",
    })
    console.log(res) 
    return await res.json()
}

export const setJornadaDesactiva = async () => {
  const res = await fetch(API9, { method: "PUT",})
    console.log(res) 
    return await res.json()
}

export const setEstadoUsuario = async (idMedicion, estadoUsuario) => {
  const res = await fetch(API10 + `/${idMedicion}/${estadoUsuario}`, { method: "PUT",})
    console.log(res) 
    return await res.json()
}

export const getMedicionesCountByIdJornada = async () => {
    const res = await fetch(API2, {
        METHOD: "GET",
    })
    console.log(res) 
    return await res.json()
}

export const getAvgMediciones = async () => {
    const res = await fetch(API3, {
        METHOD: "GET",
    })
    console.log(res) 
    return await res.json()
}

export const getFistMedicion = async () => {
    const res = await fetch(API4, {
        METHOD: "GET",
    })
    console.log(res) 
    return await res.json()
}

export const setEstadoMedicion = async () => {
  const res = await fetch(API5, {
    METHOD: "SET",
  })
  console.log(res) 
  return await res.json()
}

export const saveJornada = async (idUsuario) => {
  const res = await fetch(API6 + `/${idUsuario}`, { method: "POST",})
  console.log(res)  
  return await res.json()
}

//el new date() admite la nomenclatura de la base de datos
