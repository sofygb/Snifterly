import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { View, Text } from 'react-native'
import Home from '../screens/Home.js'
import IngresoDeDatos from '../screens/IngresoDeDatos.js'

const Stack = createNativeStackNavigator()

const MainStack = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false,}}>
                <Stack.Screen
                name= 'Home'
                component={ Home }
                />
                <Stack.Screen
                name= 'IngresoDeDatos'
                component={ IngresoDeDatos }
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainStack