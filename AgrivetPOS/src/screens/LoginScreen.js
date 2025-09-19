import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import api, { saveToken } from '../api/api';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  const handleLogin = async () => {
    try {
      const res = await api.post('/auth/login', { username, password });
      const { token } = res.data;
      await saveToken(token);
      navigation.replace('Products');
    } catch (e) {
      setErr('Login failed');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Login</Text>
      <TextInput placeholder="username" value={username} onChangeText={setUsername} />
      <TextInput placeholder="password" value={password} onChangeText={setPassword} secureTextEntry />
      {err ? <Text style={{ color:'red' }}>{err}</Text> : null}
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
