//Archivo necesario para consultar al backend. Funciones de consulta que interactuan con el back

const API = 'http://localhost:3000/jornadas/count/3'

const API2 = 'http://localhost:3000/mediciones/count/3'

const API3 = 'http://localhost:3000/mediciones/avg/3'

const API4 = 'http://localhost:3000/mediciones/first/3'

export var idUsuarioActivo

export const getUsuario = async (mail, contraseña) => {
    const consulta = `http://localhost:3000`
    const res = await fetch(consulta + `/usuario/${mail}/${contraseña}`, {
        METHOD: "GET",
    })
    console.log(res) 
    idUsuarioActivo = res.idUsuario
    return await res.json()
}

export const getJornada = async () => {
    const res = await fetch(API, {
        METHOD: "GET",
    })
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

//el new date() admite la nomenclatura de la base de datos
