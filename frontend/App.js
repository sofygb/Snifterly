import React, { useState, useEffect } from 'react';
import MainStack from './src/navigation/MainStack';
import { ContextProvider } from './src/navigation/contextState';
import { AuthProvider } from './src/context/AuthContext';

export default function App() {
  
  return (
    <ContextProvider>
      <AuthProvider>
        <MainStack />
      </AuthProvider>
    </ContextProvider>
  );
}



