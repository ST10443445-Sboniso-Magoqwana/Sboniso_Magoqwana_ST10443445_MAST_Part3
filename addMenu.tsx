import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

const courses = ['Starters', 'Mains', 'Desserts'];

type AddMenuScreenProps = NativeStackScreenProps<RootStackParamList, 'AddMenu'>;

export default function AddMenuScreen({ navigation }: AddMenuScreenProps) {
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState(courses[0]);
  const [price, setPrice] = useState('');

  const handleSubmit = () => {
    const newItem = { dishName, description, course, price: parseFloat(price) };
    navigation.navigate('Home', { newItem });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Dish Name:</Text>
      <TextInput style={styles.input} onChangeText={setDishName} value={dishName} />
      <Text style={styles.label}>Description:</Text>
      <TextInput style={styles.input} onChangeText={setDescription} value={description} />
      <Text style={styles.label}>Course:</Text>
      <Picker selectedValue={course} onValueChange={setCourse} style={styles.picker}>
        {courses.map((course) => (
          <Picker.Item key={course} label={course} value={course} />
        ))}
      </Picker>
      <Text style={styles.label}>Price:</Text>
      <TextInput style={styles.input} onChangeText={setPrice} value={price} keyboardType="numeric" />
      <Button title="Add Dish" onPress={handleSubmit} color="#A7C7E7" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#A7C7E7', // Baby blue background
  },
  label: {
    fontSize: 18,
    marginVertical: 8,
    color: '#fff', // White text color for labels
  },
  input: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#fff', // White input background for contrast
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#A7C7E7', // Baby blue text color in Picker
  },
});
