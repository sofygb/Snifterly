import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View, Alert, SafeAreaView, TouchableOpacity, InputAccessoryView, ScrollView } from 'react-native';
import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import {Calendar, LocaleConfig} from 'react-native-calendars';

export default function Historial({ navigation }) {
    const [selected, setSelected] = useState('');
    const loadJornada = async () => {
        const data = await getJornada()
        console.log(data)
        setJornada([data])
    }
    const [fontsLoaded, setFontsLoaded] = useState(false);
    useEffect(() => {
        if (!fontsLoaded) {
            loadFonts();
        }
        loadJornada()
    })

    const loadFonts = async () => {
        await Font.loadAsync({
            'alata': require('../assets/fonts/Alata/Alata.ttf'),
            'inter': require('../assets/fonts/Inter/Inter.ttf'),
        });
        setFontsLoaded(true);
    }
    return (
        <View>

            <Text style={styles.titulo}>Tu actividad en la última semana</Text>

            <Calendar
            onDayPress={day => {
                setSelected(day.dateString);
            }}
            markedDates={{
                [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
            }}
            />

            <View style={styles.footer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => { navigation.navigate('Home') }}>
                        <Icon icon="material-symbols:home" width={'2.5rem'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate('Historial') }}>
                        <Icon icon="zondicons:calendar" width={'2.3rem'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate('Usuario') }}>
                        <Icon icon="mdi:account" width={'2.5rem'}/>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    titulo: {

    },
    footer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '1rem',
        width: '100%',
        paddingLeft: '2rem',
        paddingRight: '2rem',
    },

});