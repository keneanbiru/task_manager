import { Task } from '../store/tasksSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=20');
  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  const data = await response.json();
  // Map API response to our Task type
  return data.map((item: any) => ({
    id: item.id,
    title: item.title,
    completed: item.completed,
  }));
};

export const saveTasksToStorage = async (tasks: Task[]) => {
  try {
    await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
  } catch (e) {
    // Handle error silently
  }
};

export const loadTasksFromStorage = async (): Promise<Task[] | null> => {
  try {
    const data = await AsyncStorage.getItem('tasks');
    if (data) return JSON.parse(data);
    return null;
  } catch (e) {
    return null;
  }
}; 