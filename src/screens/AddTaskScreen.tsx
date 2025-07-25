import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/store';
import { addTask, Task } from '../store/tasksSlice';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { LinearGradient } from 'expo-linear-gradient';

// Type for navigation props
 type Props = NativeStackScreenProps<RootStackParamList, 'AddTask'>;

const AddTaskScreen: React.FC<Props> = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(state => state.tasks.tasks);

  const handleAddTask = () => {
    if (!title.trim()) {
      Alert.alert('Validation', 'Task title cannot be empty.');
      return;
    }
    // Simulate adding a task (no API call)
    const maxId = tasks.length ? Math.max(...tasks.map(t => t.id)) : 0;
    const newTask: Task = {
      id: maxId + 1,
      title: title.trim(),
      completed: false,
    };
    dispatch(addTask(newTask));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Task Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter task title"
          placeholderTextColor="#BDBDBD"
          autoFocus
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask} activeOpacity={0.85}>
          <LinearGradient
            colors={["#FF69B4", "#F5E6DA"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.addButtonGradient}
          >
            <Text style={styles.addButtonText}>Add Task</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E6DA',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 28,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#FF69B4',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 3,
    alignItems: 'stretch',
  },
  label: {
    fontSize: 16,
    color: '#3E2723',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#FF69B4',
    borderRadius: 10,
    padding: 14,
    marginBottom: 22,
    fontSize: 16,
    color: '#3E2723',
    backgroundColor: '#F5E6DA',
  },
  addButton: {
    alignItems: 'center',
    borderRadius: 30,
    overflow: 'hidden',
    alignSelf: 'center',
    width: 180,
  },
  addButtonGradient: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignItems: 'center',
    width: '100%',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 1,
    textShadowColor: '#FF1493',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});

export default AddTaskScreen; 