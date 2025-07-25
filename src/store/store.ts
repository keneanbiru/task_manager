import { configureStore } from '@reduxjs/toolkit';
import tasksReducer, { TasksState } from './tasksSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

export type RootState = {
  tasks: TasksState;
};
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; 