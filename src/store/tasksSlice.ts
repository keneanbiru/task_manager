import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
    },
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.unshift(action.payload);
    },
    toggleTaskCompletion(state, action: PayloadAction<number>) {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) task.completed = !task.completed;
    },
    deleteTask(state, action: PayloadAction<number>) {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
    },
  },
});

export const { setTasks, addTask, toggleTaskCompletion, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer; 