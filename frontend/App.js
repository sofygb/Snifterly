import { StyleSheet, SafeAreaView} from 'react-native';
import React, { useState, useEffect } from 'react';
import MainStack from './navigation/MainStack';

export default function App() {
  
  return (
    <SafeAreaView style= {{ flex: 1 }}>
      <MainStack />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {

  },
});
