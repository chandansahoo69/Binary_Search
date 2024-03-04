import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTodo = createAsyncThunk('fetchTodos', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    return response.json();
});

const initialState = {
    isLoading: false,
    data: null,
    error: null,
};

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTodo.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchTodo.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchTodo.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
    },
});

export default todoSlice.reducer;
