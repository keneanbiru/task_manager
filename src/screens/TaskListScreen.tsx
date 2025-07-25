import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Button, Alert, TouchableOpacity } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/store';
import { setTasks, toggleTaskCompletion, Task } from '../store/tasksSlice';
import { fetchTasks, saveTasksToStorage, loadTasksFromStorage } from '../services/taskService';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import Checkbox from '../components/Checkbox';
import { LinearGradient } from 'expo-linear-gradient';

type Props = NativeStackScreenProps<RootStackParamList, 'TaskList'>;

const TaskListScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(state => state.tasks.tasks);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadInitialTasks = async () => {
      setLoading(true);
      setError('');
      try {
        // Try loading from storage first
        const cached = await loadTasksFromStorage();
        if (cached && cached.length > 0) {
          dispatch(setTasks(cached));
          setLoading(false);
        } else {
          // Fallback to API
          const data = await fetchTasks();
          dispatch(setTasks(data));
          saveTasksToStorage(data);
          setLoading(false);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load tasks');
        setLoading(false);
      }
    };
    loadInitialTasks();
  }, [dispatch]);

  // Save tasks to storage whenever they change
  useEffect(() => {
    if (tasks.length > 0) {
      saveTasksToStorage(tasks);
    }
  }, [tasks]);

  const handleToggle = (id: number) => {
    dispatch(toggleTaskCompletion(id));
  };

  const renderItem = ({ item }: { item: Task }) => (
    <View style={styles.taskCard}>
      <TouchableOpacity onPress={() => handleToggle(item.id)}>
        <Checkbox checked={item.completed} />
      </TouchableOpacity>
      <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.navigate('TaskDetails', { taskId: item.id })}>
        <Text style={[styles.taskTitle, item.completed && styles.completed]}>
          {item.title}
        </Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return <ActivityIndicator style={styles.centered} size="large" color="#FF69B4" />;
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: 'red' }}>{error}</Text>
        <Button title="Retry" onPress={() => {
          setError('');
          setLoading(true);
          fetchTasks().then(data => {
            dispatch(setTasks(data));
            setLoading(false);
          }).catch(err => {
            setError(err.message || 'Failed to load tasks');
            setLoading(false);
          });
        }} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingVertical: 16 }}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddTask')} activeOpacity={0.85}>
        <LinearGradient
          colors={["#FF69B4", "#F5E6DA"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.addButtonGradient}
        >
          <Text style={styles.addButtonText}>+ Add Task</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E6DA',
    paddingHorizontal: 16,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#FF69B4',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
  },
  taskTitle: {
    marginLeft: 16,
    fontSize: 17,
    color: '#3E2723',
    fontWeight: '600',
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#BDBDBD',
    fontStyle: 'italic',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  checked: {
    backgroundColor: '#007AFF',
  },
  addButton: {
    alignItems: 'center',
    marginVertical: 24,
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

export default TaskListScreen; 