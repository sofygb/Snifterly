import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as Font from 'expo-font';

const data = [
    { label: 'Ceguera parcial/completa temporal', value: '1' },
    { label: 'Comportamiento excesivamente impulsivo', value: '2' },
    { label: 'Desmayos o pérdida de consciencia', value: '3' },
    { label: 'Dificultad/imposibilidad del habla temporal', value: '4' },
    { label: 'Disfunción sexual temporal', value: '5' },
    { label: 'Dolores de cabeza o mareos', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
];

export default function ({ navigation }) {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const renderLabel = () => {
        if (value || isFocus) {
            return (
                <Text style={[styles.label, isFocus && { color: 'blue' }]}>

                </Text>
            );
        }
        return null;
    };
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
        <View style={styles.container}>
            <View style={{flex: 3, display: 'flex', alignContent: 'center', justifyContent: 'center', margin: '2rem'}}>
                <Text style={styles.textoPrincipal}>¿Tenés alguno de estos síntomas?</Text>
                {renderLabel()}
                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    data={data}
                    search
                    maxHeight={200}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Seleccionar sintoma' : '...'}
                    searchPlaceholder="Buscar..."
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setValue(item.value);
                        setIsFocus(false);
                    }}
                    renderLeftIcon={() => (
                        <AntDesign
                            style={styles.icon}
                            color={isFocus ? 'blue' : 'black'}
                            name="Safety"
                            size={20}
                        />
                    )}
                />
                <TouchableOpacity style={styles.aceptarBoton} onPress={() => { navigation.navigate('Home') }}>
                    <Text style={{ color: 'white', fontFamily: 'inter', fontSize: '1rem', textAlign: 'center' }}>Aceptar</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.finalizarJornada} onPress={() => { navigation.navigate('SalirJornada') }}>
                <Text style={[{ color: 'red', fontSize: '1rem', fontFamily: 'inter', display: 'flex', alignItems: 'center', justifyContent: 'center', }]}>Finalizar jornada</Text>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
        backgroundColor: 'white',
    },
    finalizarJornada: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '1rem',
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    textoPrincipal: {
        display: 'flex',
        justifyContent: 'center',
        fontSize: '1.5rem',
        marginTop: '3rem',
        marginBottom: '2rem',
        fontFamily: 'alata',
    },
    aceptarBoton: {
        display: 'flex',
        alignSelf: 'center',
        justifyContent: 'center',
        minWidth: '8rem',
        backgroundColor: "#5654E1",
        borderRadius: 15,
        padding: 10,
        marginTop: '2rem',
        minWidth: '10rem'
    }
});