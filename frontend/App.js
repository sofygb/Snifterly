import { StyleSheet, SafeAreaView} from 'react-native';
import React, { useState, useEffect } from 'react';
import MainStack from './src/navigation/MainStack';
import { ContextProvider } from './src/navigation/contextState';

export default function App() {
  
  return (
    <ContextProvider>
      <SafeAreaView style= {{ flex: 1 }}>
        <MainStack />
      </SafeAreaView>
    </ContextProvider>
  );
}



