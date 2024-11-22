import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation, route }: HomeScreenProps) {
  const [menuItems, setMenuItems] = useState<{ dishName: string; description: string; course: string; price: number }[]>([]);

  const averagePrice = menuItems.length > 0 
    ? menuItems.reduce((sum, item) => sum + item.price, 0) / menuItems.length 
    : 0;

  useEffect(() => {
    if (route.params?.newItem) {
      const newItem = route.params.newItem;
      setMenuItems((prevItems) => [...prevItems, newItem]);
    }
  }, [route.params?.newItem]);

  const removeItem = (index: number) => {
    Alert.alert(
      "Remove Item",
      "Are you sure you want to remove this item?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => {
          const updatedItems = menuItems.filter((_, i) => i !== index);
          setMenuItems(updatedItems);
        }}
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.jpg')} style={styles.logo} />
      <Text style={styles.title}>Chef's Menu</Text>
      <Button title="Add Menu" onPress={() => navigation.navigate('AddMenu')} />
      <Button title="Filter Menu" onPress={() => navigation.navigate('FilterMenu', { menuItems })} />
      <Text style={styles.totalItems}>Total Items: {menuItems.length}</Text>
      <Text style={styles.averagePrice}>Average Price: ${averagePrice.toFixed(2)}</Text>
      <FlatList
        data={menuItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.menuItem}>
            <Text style={styles.dishName}>{item.dishName} - {item.course}</Text>
            <Text>{item.description}</Text>
            <Text>${item.price.toFixed(2)}</Text>
            <Button title="Remove" color="red" onPress={() => removeItem(index)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#A7C7E7', // Baby blue background
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#fff',
  },
  logo: {
    marginBottom: 20,
    width: 150,
    height: 150,
  },
  totalItems: {
    fontSize: 18,
    marginTop: 10,
    color: '#fff',
  },
  averagePrice: {
    fontSize: 18,
    marginBottom: 20,
    color: '#fff',
  },
  menuItem: {
    borderBottomWidth: 1,
    paddingVertical: 10,
    width: '100%',
  },
  dishName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
