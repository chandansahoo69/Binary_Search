import { configureStore } from '@reduxjs/toolkit';
import todoSlice from 'slice/todo';
import userSlice from 'slice/user';

export const store = configureStore({
    reducer: {
        todos: todoSlice,
        auth: userSlice,
    },
});
