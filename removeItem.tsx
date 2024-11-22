import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type FilterMenuScreenProps = NativeStackScreenProps<RootStackParamList, 'FilterMenu'>;

export default function FilterMenuScreen({ navigation }: FilterMenuScreenProps) {
  return (
    <ImageBackground
      source={require('../assets/babyblue.jpg')}
      style={styles.background}
      resizeMode='cover'
      >
      <View style={styles.container}>
        <Text style={styles.title}>Filter Menu</Text>
        <Text style={styles.title}>Coming Soon!</Text>
          {/* You can add your filtering functionality here */}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#fff',
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
  },
});