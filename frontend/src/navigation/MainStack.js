import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import Historial from '../screens/Historial.js'
import Home from '../screens/Home.js'
import IngresoDeDatos from '../screens/IngresoDeDatos.js'
import SalirJornada from '../screens/SalirJornada.js'
import PrimeraHome from '../screens/PrimeraHome.jsx'
import Usuario from '../screens/Usuario.js'
import InicioSesion from '../screens/InicioSesion.js'
import CrearCuenta from '../screens/CrearCuenta.js'
import CompletarDatos from '../screens/CompletarDatos.js'
import EstadoUsuario from '../screens/EstadoUsuario.js'
import Configuracion from '../screens/Configuracion.js'
import Sintomas from '../screens/Sintomas.js'
import CerrarSesion from '../screens/CerrarSesion.js'
import { useAuth } from '../context/AuthContext'
import { ActionTypes, setContextState, useContextState } from '../navigation/contextState';

const Stack = createNativeStackNavigator()
const StackTwo = createStackNavigator()

const MainStack = () => {
    const { user } = useAuth();
    console.log('user', user);
    const { contextState, setContextState } = useContextState()

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false, }}>
                {!user ? (
                    <>
                        <Stack.Screen
                            name='InicioSesion'
                            component={InicioSesion}
                        />
                        <Stack.Screen
                            name='CrearCuenta'
                            component={CrearCuenta}
                        />
                        <Stack.Screen
                            name='CompletarDatos'
                            component={CompletarDatos}
                        />
                    </>
                ) : (
                    <>
                    <Stack.Screen
                        name='PrimeraHome'
                        component={PrimeraHome}
                    />
                    <Stack.Screen
                        name='Home'
                        component={Home}
                    />
                    
                    <Stack.Screen
                        name='IngresoDeDatos'
                        component={IngresoDeDatos}
                    />
                    <Stack.Screen
                        name='Historial'
                        component={Historial}
                    />
                    <Stack.Screen
                        name='SalirJornada'
                        component={SalirJornada}
                    />
                    
                    <Stack.Screen
                        name='EstadoUsuario'
                        component={EstadoUsuario}
                    />
                    <Stack.Screen
                        name='Usuario'
                        component={Usuario}
                    />
                    <Stack.Screen
                        name='Sintomas'
                        component={Sintomas}
                    />
                    <Stack.Screen
                        name='Configuracion'
                        component={Configuracion}
                    />
                    <Stack.Screen
                        name='CerrarSesion'
                        component={CerrarSesion}
                    />
                </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainStack