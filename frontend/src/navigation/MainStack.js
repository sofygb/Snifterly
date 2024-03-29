import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { View, Text } from 'react-native'
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
import Test from '../screens/Test.js'

const Stack = createNativeStackNavigator()

const MainStack = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false,}}>
            <Stack.Screen
                name= 'InicioSesion'
                component={ InicioSesion }
                />
                {/* [<Stack.Screen
                name= 'Test'
                component={ Test }
                />] */}
                <Stack.Screen
                name= 'CrearCuenta'
                component={ CrearCuenta }
                />
                <Stack.Screen
                name= 'CompletarDatos'
                component={ CompletarDatos }
                />
                <Stack.Screen
                name= 'Home'
                component={ Home }
                />
                <Stack.Screen
                name= 'IngresoDeDatos'
                component={ IngresoDeDatos }
                />
                <Stack.Screen
                name= 'Historial'
                component={ Historial }
                />
                <Stack.Screen
                name= 'SalirJornada'
                component={ SalirJornada }
                />
                <Stack.Screen
                name= 'PrimeraHome'
                component={ PrimeraHome }
                />
                <Stack.Screen
                name= 'EstadoUsuario'
                component={ EstadoUsuario }
                />
                <Stack.Screen
                name= 'Usuario'
                component={ Usuario }
                />
                <Stack.Screen
                name= 'Sintomas'
                component={ Sintomas }
                />
                <Stack.Screen
                name= 'Configuracion'
                component={ Configuracion }
                />
                <Stack.Screen
                name= 'CerrarSesion'
                component={ CerrarSesion }
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainStack