import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TaskListScreen from '../screens/TaskListScreen';
import AddTaskScreen from '../screens/AddTaskScreen';
import TaskDetailsScreen from '../screens/TaskDetailsScreen';

export type RootStackParamList = {
  TaskList: undefined;
  AddTask: undefined;
  TaskDetails: { taskId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => (
  <Stack.Navigator initialRouteName="TaskList">
    <Stack.Screen name="TaskList" component={TaskListScreen} options={{ title: 'Tasks' }} />
    <Stack.Screen name="AddTask" component={AddTaskScreen} options={{ title: 'Add Task' }} />
    <Stack.Screen name="TaskDetails" component={TaskDetailsScreen} options={{ title: 'Task Details' }} />
  </Stack.Navigator>
);

export default RootNavigator; 