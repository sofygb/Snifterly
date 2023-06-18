import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View, Alert, SafeAreaView, TouchableOpacity, InputAccessoryView, ScrollView} from 'react-native';
import { TextInput } from "@react-native-material/core";
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import {HomeFilled} from '@ant-design/icons';
import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';

export default function Historial({ navigation }) {

    return(
    <View>

        <Text style={styles.titulo}>Tu actividad en la última semana</Text>

        <View style={styles.footer}>
            <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                <TouchableOpacity onPress = { () => {navigation.navigate('Home')}}>
                    <Icon icon="material-symbols:home"  width={'2.5rem'}/>
                </TouchableOpacity>
                <TouchableOpacity onPress = { () => {navigation.navigate('Historial')}}>
                    <Icon icon="zondicons:calendar" width={'2.3rem'}/>
                </TouchableOpacity>
                <Icon icon="mdi:account" width={'2.5rem'}/>
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
    },
    titulo: {

    },
    footer:{
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '1rem', 
        width: '100%',
        paddingLeft: '2rem',
        paddingRight: '2rem',
    },
    
});