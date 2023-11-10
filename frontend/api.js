//Archivo necesario para consultar al backend. Funciones de consulta que interactuan con el back
import AsyncStorage from '@react-native-async-storage/async-storage';

const API = 'http://localhost:3000/jornadas/count/3'

const API2 = 'http://localhost:3000/mediciones/count'

const API3 = 'http://localhost:3000/mediciones/avg/3'

const API4 = 'http://localhost:3000/mediciones/first'

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

const API17 = 'http://localhost:3000/jornadaActual'

const API18 = 'http://localhost:3000/mediciones/last'

const API19 = 'http://localhost:3000/usuarioNuevo'

const API20 = 'http://localhost:3000/jornadaActivaHay'

const API21 = 'http://localhost:3000/jornadaActiva2'

const API22 = 'http://localhost:3000/modificarUsuario'

const API23 = 'http://localhost:3000/cantjornadas/count'

const API24 = 'http://localhost:3000/ultimasJornadas'

const API25 = 'http://localhost:3000/jornada/usuario'

const API26 = 'http://localhost:3000/jornadasYMediciones'

const API27 = 'http://localhost:3000/modResistencia'
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

export const getJornadaActiva2 = async () => {
  const res = await fetch(API21, {
      method: "GET",
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

export const getJornadaByIdUsuario = async (idUsuario) => {
  const res = await fetch(API25 + `/${idUsuario}`, {
      METHOD: "GET",
  })
  console.log(res) 
  return await res.json()
}

export const getJornadasYMedicionesByIdUsuario = async (idUsuario) => {
  const res = await fetch(API26 + `/${idUsuario}`, {
      METHOD: "GET",
  })
  console.log(res) 
  return await res.json()
}

export const getJornadaActiva = async (idUsuario) => { //Devuelve (si hay jornada activa): [{idJornada: int}], sino devuelve []
  const res = await fetch(API5 + `/${idUsuario}`, {
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

export const getHayJornada = async (idUsuario) => {
  const res = await fetch(API20 + `/${idUsuario}`, {
      method: "GET",
    })
    console.log(res)
    return await res.json()
}

export const setJornadaDesactiva = async () => {
  const res = await fetch(API9, { method: "PUT",})
    console.log(res) 
    return await res
}

export const setModResistenciaByIdUsuario = async (modResistencia, idUsuario) => {
  const res = await fetch(API27 + `/${modResistencia}/${idUsuario}`, { method: "PUT",})
    console.log(res) 
    return await res
}

export const setEstadoUsuario = async (idMedicion, estadoUsuario) => {
  const res = await fetch(API10 + `/${idMedicion}/${estadoUsuario}`, { method: "PUT",})
    console.log(res) 
    return await res
}

export const updateUsuario = async (nombre, fechaNacimiento, peso, altura, email, contrasenia, idUsuario) => {
  const res = await fetch(API22 + `/${nombre}/${fechaNacimiento}/${peso}/${altura}/${email}/${contrasenia}/${idUsuario}`, { method: "PUT",})
    console.log(res) 
    return await res
}

export const setFechaFinJornada = async (idJornada) => {
  const res = await fetch(API17 + `/${idJornada}`, { method: "PUT",})
    console.log(res) 
    return await res
}

export const getMedicionesCountByIdJornada = async (idJornada) => {
    const res = await fetch(API2 + `/${idJornada}`, {
        METHOD: "GET",
    })
    console.log(res) 
    return await res.json()
}

export const getUltimasDosJornadas = async (idUsuario) => {
  const res = await fetch(API24 + `/${idUsuario}`, {
        method: "GET",
    })
    console.log(res) 
    return await res.json()
}
/*ejemplo de lo que retorna getUltimasDosJornadas: 
[
  {
    "idJornada": 7,
    "fechaInicio": "2023-09-29T11:25:16.000Z",
    "fechaFin": "2023-09-29T11:32:57.000Z",
    "idUsuario": 11,
    "activo": 0,
    "primeraMedicion": 20,
    "primerGrado": 1,
    "primeraFecha": "2023-09-29T11:25:18.000Z",
    "primerEstado": null,
    "promedioGrados": 2.75,
    "ultimaMedicion": 23,
    "ultimoGrado": 3,
    "ultimaFecha": "2023-09-29T11:32:48.000Z",
    "ultimoEstado": null,
    "mayorGrado": 5,
    "mayorMedicion": 22,
    "mayorFecha": "2023-09-29T11:25:42.000Z",
    "mayorEstado": null
  },
  {
    "idJornada": 8,
    "fechaInicio": "2023-09-29T11:36:21.000Z",
    "fechaFin": "2023-09-29T12:03:00.000Z",
    "idUsuario": 11,
    "activo": 0,
    "primeraMedicion": 24,
    "primerGrado": 1,
    "primeraFecha": "2023-09-29T11:36:22.000Z",
    "primerEstado": null,
    "promedioGrados": 3.8750000037252894,
    "ultimaMedicion": 27,
    "ultimoGrado": 0.3,
    "ultimaFecha": "2023-09-29T12:02:50.000Z",
    "ultimoEstado": "mal",
    "mayorGrado": 14,
    "mayorMedicion": 25,
    "mayorFecha": "2023-09-29T11:36:35.000Z",
    "mayorEstado": null
  }
]
*/

export const getJornadasCountByIdUsuario = async (idUsuario) => {
  const res = await fetch(API23 + `/${idUsuario}`, {
      METHOD: "GET",
  })
  console.log(res) 
  return await res.json()
}

export const getLastMedicionByIdJornada = async (idJornada) => {
  const res = await fetch(API18 + `/${idJornada}`, {
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

export const getFirstMedicion = async (idJornada) => {
    const res = await fetch(API4 + `/${idJornada}`, {
        method: "GET",
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

export const saveUsuario = async (nombre, fechaNacimiento, peso, altura, email, contraseña) => {
  const res = await fetch(API19 + `/${nombre}/${fechaNacimiento}/${peso}/${altura}/${email}/${contraseña}`, { method: "POST",})
  console.log(res)  
  return await res.json()
}

//el new date() admite la nomenclatura de la base de datos
