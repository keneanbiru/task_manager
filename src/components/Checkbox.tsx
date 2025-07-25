import React from 'react';
import { View, StyleSheet } from 'react-native';

interface CheckboxProps {
  checked: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked }) => (
  <View testID="checkbox" style={[styles.checkbox, checked && styles.checked]} />
);

const styles = StyleSheet.create({
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#FF69B4',
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  checked: {
    backgroundColor: '#FF69B4',
  },
});

export default Checkbox; 