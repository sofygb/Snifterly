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

const API11 = 'http://localhost:3000/newMedicion'

const API12 = 'http://localhost:3000/ultimaMedicion'

const API13 = 'http://localhost:3000/getUsuario'

const API14 = 'http://localhost:3000/usuarios'

const API15 = 'http://localhost:3000/jornadaReciente'

const API16 = 'http://localhost:3000/mediciones/last'


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

  
export const getUsuarios = async () => {
    const res = await fetch(API14, {
        METHOD: "GET",
    })
    console.log(res) 
    return await res.json()
}

export const getUsuarioByEmailAndContrasenia = async (mail, contraseña) => {
  const res = await fetch(API13 + `/${mail}/${contraseña}`, {
      method: "GET",
  })
  console.log(res) 
  return await res
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

export const getJornadaReciente = async (idUsuario) => {
  const res = await fetch(API15 + `/${idUsuario}`, {
        method: "GET",
    })
    console.log(res) 
    return await res.json()
}

export const getMedicionReciente = async (idJornada) => {
  const res = await fetch(API16 + `/${idJornada}`, {
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
    return await res
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

export const setMediciones = async (grado, idJornada) => {
  const res = await fetch(API11 + `/${grado}/${idJornada}`, { method: "POST",})
  console.log(res)
  return await res.json()
}

export const getUltimaMedicion = async (idJornada) => {
  const res = await fetch(API12 + `/${idJornada}`, { method: "GET",})
  console.log(res)
  return await res.json()
}

export const saveJornada = async (idUsuario) => {
  const res = await fetch(API6 + `/${idUsuario}`, { method: "POST",})
  console.log(res)  
  return await res.json()
}

//el new date() admite la nomenclatura de la base de datos
