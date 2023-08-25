import { useContext } from "react";
import React from "react";

export const initialState = {
    loading: true,
    usuario: {
        idUsuario: 0,
        nombre: '',
        fechaNacimiento: 1 / 1 / 1970,
        peso: 0,
        altura: 0,
        email: '',
        contrasenia: '',
        fechaCreacion: 1 / 1 / 1970,
        modResistencia: null
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
    //JORNADA
    SetIdJornada: 'SET_IDJORNADA',
    SetFechaInicio: 'SET_FECHAINICIO',
    SetFechaFin: 'SET_FECHAFIN',
    SetIdUsuarioJornada: 'SET_IDUSUARIOJORNADA',
    SetActivo: 'SET_ACTIVO',
    //MEDICION
    SetIdMedicion: 'SET_IDMEDICION',
    SetGrado : 'SET_GRADO',
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
                usuario: action.value,
            };
        case ActionTypes.SetIdUsuario:
            return {
                ...state,
                idUsuario: action.value,
            };
        case ActionTypes.SetNombre:
            return {
                ...state,
                nombre: action.value,
            };
        case ActionTypes.SetFechaNacimiento:
            return {
                ...state,
                fechaNacimiento: action.value,
            };
        case ActionTypes.SetPeso:
            return {
                ...state,
                peso: action.value,
            };
        case ActionTypes.SetAltura:
            return {
                ...state,
                altura: action.value,
            };
        case ActionTypes.SetEmail:
            return {
                ...state,
                email: action.value,
            };
        case ActionTypes.SetContrasenia:
            return {
                ...state,
                contrasenia: action.value,
            };
        case ActionTypes.SetFechaCreacion:
            return {
                ...state,
                fechaCreacion: action.value,
            };
        case ActionTypes.SetModResistencia:
            return {
                ...state,
                modResistencia: action.value,
            };
        //JORNADA
        case ActionTypes.SetIdJornada:
            return {
                ...state,
                idJornada: action.value,
            };
        case ActionTypes.SetFechaInicio:
            return {
                ...state,
                fechaInicio: action.value,
            };
        case ActionTypes.SetFechaFin:
            return {
                ...state,
                fechaFin: action.value,
            };
        case ActionTypes.SetIdUsuarioJornada:
            return {
                ...state,
                idUsuario: action.value,
            };
        case ActionTypes.SetActivo:
            return {
                ...state,
                activo: action.value,
            };
        //MEDICION
        case ActionTypes.SetIdMedicion:
            return {
                ...state,
                idMedicion: action.value,
            };
        case ActionTypes.SetGrado:
            return {
                ...state,
                grado: action.value,
            };
        case ActionTypes.SetFecha:
            return {
                ...state,
                fecha: action.value,
            };
        case ActionTypes.SetIdJornadaMedicion:
            return {
                ...state,
                idJornada: action.value,
            };
        case ActionTypes.SetEstado:
            return {
                ...state,
                estado: action.value,
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