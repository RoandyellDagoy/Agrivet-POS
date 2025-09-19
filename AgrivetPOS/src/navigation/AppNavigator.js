import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import ProductScreen from '../screens/ProductScreen';
import SalesScreen from '../screens/SalesScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
	return (
		<Stack.Navigator initialRouteName="Login">
			<Stack.Screen name="Login" component={LoginScreen} />
			<Stack.Screen name="Products" component={ProductScreen} />
			<Stack.Screen name="Sales" component={SalesScreen} />
		</Stack.Navigator>
	);
}
