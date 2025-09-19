import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { loadToken } from './src/api/api';

export default function App() {
  useEffect(() => { loadToken(); }, []);
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
