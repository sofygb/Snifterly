import { useContext } from "react";
import React from "react";

export const initialState = {
    loading: true,
    usuario: {
        idUsuario: -1,
        nombre: '',
        fechaNacimiento: 1 / 1 / 1970,
        peso: 0,
        altura: 0,
        email: '',
        contrasenia: '',
        fechaCreacion: 1 / 1 / 1970,
        modResistencia: null,
        token: -1,
    },
    jornada: {
        idJornada: 0,
        fechaInicio: 1 / 1 / 1970,
        fechaFin: 1 / 1 / 1970,
        idUsuario: 0,
        activo: false,
    },
    medicion: {
        idMedicion: 0,
        grado: 0,
        fecha: 1 / 1 / 1970,
        idJornada: null,
        estado: '',
    }
}

export const ActionTypes = {
    SetLoading: 'SET_LOADING',
    //USUARIO
    SetUsuario: 'SET_USUARIO',
    SetIdUsuario: 'SET_IDUSUARIO',
    SetNombre: 'SET_NOMBRE',
    SetFechaNacimiento: 'SET_FECHANACIMIENTO',
    SetPeso: 'SET_PESO',
    SetAltura: 'SET_ALTURA',
    SetEmail: 'SET_EMAIL',
    SetContrasenia: 'SET_CONTRASENIA',
    SetFechaCreacion: 'SET_FECHACREACION',
    SetModResistencia: 'SET_MODRESISTENCIA',
    SetToken: 'SET_TOKEN',
    //JORNADA
    SetIdJornada: 'SET_IDJORNADA',
    SetFechaInicio: 'SET_FECHAINICIO',
    SetFechaFin: 'SET_FECHAFIN',
    SetIdUsuarioJornada: 'SET_IDUSUARIOJORNADA',
    SetActivo: 'SET_ACTIVO',
    //MEDICION
    SetIdMedicion: 'SET_IDMEDICION',
    SetGrado: 'SET_GRADO',
    SetFecha: 'SET_FECHA',
    SetIdJornadaMedicion: 'SET_IDJORNADAMEDICION',
    SetEstado: 'SET_ESTADO'
}

export const reducer = (state = {}, action) => {
    switch (action.type) {
        case ActionTypes.SetLoading:
            return {
                ...state,
                loading: action.value,
            };
        //USUARIO
        case ActionTypes.SetUsuario:
            return {
                ...state,
                usuario: {
                    ...state.usuario,
                    usuario: action.value
                }
            };
        case ActionTypes.SetIdUsuario:
            return {
                ...state,
                usuario: {
                    ...state.usuario,
                    idUsuario: action.value
                }
            };
        case ActionTypes.SetNombre:
            return {
                ...state,
                usuario: {
                    ...state.usuario,
                    nombre: action.value
                }
            };
        case ActionTypes.SetFechaNacimiento:
            return {
                ...state,
                usuario: {
                    ...state.usuario,
                    fechaNacimiento: action.value
                }
            };
        case ActionTypes.SetPeso:
            return {
                ...state,
                usuario: {
                    ...state.usuario,
                    peso: action.value
                }
            };
        case ActionTypes.SetAltura:
            return {
                ...state,
                usuario: {
                    ...state.usuario,
                    altura: action.value
                }
            };
        case ActionTypes.SetEmail:
            return {
                ...state,
                usuario: {
                    ...state.usuario,
                    email: action.value
                }
            };
        case ActionTypes.SetContrasenia:
            return {
                ...state,
                usuario: {
                    ...state.usuario,
                    contrasenia: action.value
                }
            };
        case ActionTypes.SetFechaCreacion:
            return {
                ...state,
                usuario: {
                    ...state.usuario,
                    fechaCreacion: action.value
                }
            };
        case ActionTypes.SetModResistencia:
            return {
                ...state,
                usuario: {
                    ...state.usuario,
                    modResistencia: action.value
                }
            };
        case ActionTypes.SetToken:
            return {
                ...state,
                usuario: {
                    ...state.usuario,
                    modResistencia: action.value
                }
            };
        //JORNADA
        case ActionTypes.SetIdJornada:
            return {
                ...state,
                jornada: {
                    ...state.jornada,
                    idJornada: action.value,
                }
            };
        case ActionTypes.SetFechaInicio:
            return {
                ...state, jornada: {
                    ...state.jornada,
                    fechaInicio: action.value,
                }
            };
        case ActionTypes.SetFechaFin:
            return {
                ...state,
                jornada: {
                    ...state.jornada,
                    fechaFin: action.value,
                }
            };
        case ActionTypes.SetIdUsuarioJornada:
            return {
                ...state,
                jornada: {
                    ...state.jornada,
                    idUsuario: action.value,
                }
            };
        case ActionTypes.SetActivo:
            return {
                ...state,
                jornada: {
                    ...state.jornada,
                    activo: action.value,
                }
            };
        //MEDICION
        case ActionTypes.SetIdMedicion:
            return {
                ...state,
                medicion: {
                    ...state.medicion,
                    idMedicion: action.value
                }
            };
        case ActionTypes.SetGrado:
            return {
                ...state,
                medicion: {
                    ...state.medicion,
                    grado: action.value
                }
            };
        case ActionTypes.SetFecha:
            return {
                ...state,
                medicion: {
                    ...state.medicion,
                    fecha: action.value
                }
            };
        case ActionTypes.SetIdJornadaMedicion:
            return {
                ...state,
                medicion: {
                    ...state.medicion,
                    idJornada: action.value
                }
            };
        case ActionTypes.SetEstado:
            return {
                ...state,
                medicion: {
                    ...state.medicion,
                    estado: action.value
                }
            };
        default:
            return state;
    }
}

export const initialContext = {
    contextState: initialState,
    setContextState: () => { },
}

//crear el contextState

const Cont = React.createContext(initialContext)

export function ContextProvider({ children, initial = initialState }) {
    const [state, dispatch] = React.useReducer(reducer, initial)

    const contextState = state
    const setContextState = dispatch

    return <Cont.Provider value={{ contextState, setContextState }}>{children}</Cont.Provider>
}

export const useContextState = () => useContext(Cont)
