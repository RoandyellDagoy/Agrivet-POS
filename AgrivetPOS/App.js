import React, { useEffect } from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { loadToken } from './src/api/api';
import { AuthProvider } from './src/context/AuthContext';

export default function App() {
  useEffect(() => { loadToken(); }, []);
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
