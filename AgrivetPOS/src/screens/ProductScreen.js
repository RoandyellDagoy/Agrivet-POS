import React from 'react';
import { View, Text, Button } from 'react-native';

export default function ProductScreen({ navigation }) {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>Products</Text>
			<Button title="Go to Sales" onPress={() => navigation.navigate('Sales')} />
		</View>
	);
}
