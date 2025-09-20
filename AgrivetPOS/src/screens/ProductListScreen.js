import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, Button, TextInput } from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function ProductListScreen() {
  const { token } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch("http://localhost:5000/api/products", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  const handleSale = async (productId, price) => {
    const total = price * quantity;

    await fetch("http://localhost:5000/api/products/sale", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId, quantity }),
    });

    alert(`Sale recorded! Total: ₱${total}`);
  };

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <View style={{ padding: 10 }}>
          <Text>
            {item.name} - ₱{item.price}/{item.unit}
          </Text>

          <TextInput
            placeholder="Quantity"
            keyboardType="numeric"
            value={String(quantity)}
            onChangeText={(text) => setQuantity(Number(text))}
            style={{
              borderWidth: 1,
              padding: 5,
              marginVertical: 5,
              width: 100,
            }}
          />

          <Button
            title="Sell"
            onPress={() => handleSale(item._id, item.price)}
          />
        </View>
      )}
    />
  );
}
