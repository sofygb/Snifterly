//Archivo necesario para consultar al backend. Funciones de consulta que interactuan con el back

const API = 'http://10.0.2.2:3000/jornadas/count/3'

export const getJornada = async () => {
    const res = await fetch(API)
    return await res.json()
}