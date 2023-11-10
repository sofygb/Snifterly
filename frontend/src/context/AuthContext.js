import React, { createContext, useContext, useState, useEffect } from 'react';
import { ActionTypes, setContextState, useContextState } from '../navigation/contextState';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null); // El estado del usuario
    const [loading, setLoading] = useState(false); // Estado de carga
    const { contextState, setContextState } = useContextState()
    const [usuarios, setUsuarios] = React.useState([]);
    const [jornadaActiva, setJornadaActiva] = React.useState([]);
    const isFocused = useIsFocused();

    const loadUsuarios = async () => {
        const data = await getUsuarios()
        setUsuarios(data)
        console.log(data)
    }
    const loadJornadaActiva = async () => {
        const data = await getJornadaActiva2()
        setJornadaActiva(data)
        console.log(data)
    }

    useEffect(() =>{
        loadUsuarios()
        loadJornadaActiva()
    },[isFocused])

    const login = async (email, password) => {
        setLoading(true);

        try {
            const response = await fakeLogin(email, password); // Simulación de inicio de sesión
            const token = response.token;

            // Si la autenticación es exitosa, actualiza el estado del usuario
            setUser({ email, token });
        } catch (error) {
            // Maneja los errores de inicio de sesión, por ejemplo, muestra un mensaje de error
            console.error('Error al iniciar sesión:', error);
        } finally {
            setLoading(false);
        }
    };

    function fakeLogin(email, password) {
        // Simulación de inicio de sesión
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const validacion = usuarios.findIndex(usuario => usuario.email === email && usuario.contrasenia === password)

                if (validacion != -1) {
                    setContextState({
                        type: ActionTypes.SetIdUsuario,
                        value: usuarios[validacion].idUsuario
                    });
                    setContextState({
                        type: ActionTypes.SetNombre,
                        value: usuarios[validacion].nombre
                    });
                    setContextState({
                        type: ActionTypes.SetContrasenia,
                        value: usuarios[validacion].contrasenia
                    });
                    setContextState({
                        type: ActionTypes.SetEmail,
                        value: usuarios[validacion].email
                    });
                    setContextState({
                        type: ActionTypes.SetFechaNacimiento,
                        value: new Date(usuarios[validacion].fechaNacimiento)
                    });
                    setContextState({
                        type: ActionTypes.SetFechaCreacion,
                        value: new Date(usuarios[validacion].fechaCreacion)
                    });
                    setContextState({
                        type: ActionTypes.SetModResistencia,
                        value: usuarios[validacion].modResistencia
                    });
                    setContextState({
                        type: ActionTypes.SetPeso,
                        value: usuarios[validacion].peso
                    });
                    setContextState({
                        type: ActionTypes.SetAltura,
                        value: usuarios[validacion].altura
                    });
                    var hayJornada = false
                    jornadaActiva.forEach((jornada) => {
                        if (jornada.idUsuario === usuarios[validacion].idUsuario) {
                            hayJornada = true
                            setContextState({
                                type: ActionTypes.SetIdJornada,
                                value: jornada.idUsuario
                            });
                        }
                    })
                    const token = Math.random().toString(36).substring(7);
                    resolve({ token });
                }

                reject(new Error('Usuario o contraseña incorrectos'));
            }, 1000);
        })
    };


    const logout = async () => {
        setUser(null);
    };

    const signup = async (email, password) => {
        // Lógica de registro aquí
    };

    const value = {
        user,
        loading,
        login,
        logout,
        signup,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}


/*La autenticación basada en tokens es un protocolo de autenticación en el que los usuarios verifican su identidad a cambio de un token de acceso único. Los usuarios pueden entonces acceder al sitio web, la aplicación o el recurso durante la vida del token sin tener que volver a introducir sus credenciales.*/
/*El token se genera en el servidor y se envía al cliente. El cliente almacena el token y lo envía al servidor en cada solicitud. El servidor verifica el token y responde con los datos solicitados si el token es válido.*/