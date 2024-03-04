import { createSlice } from '@reduxjs/toolkit';
import { getCurrentUser, login, logout } from 'services/ApiRequests';

const initialState = {
    user: null,
    isLoading: false,
    data: null,
    error: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginReducer: (state, action) => {
            state.isLoading = true;
            state.user = action.payload;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload ? action.payload : null;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });

        builder.addCase(logout.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(logout.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload ? action.payload : null;
        });
        builder.addCase(logout.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });

        builder.addCase(getCurrentUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getCurrentUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload ? action.payload : null;
        });
        builder.addCase(getCurrentUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
    },
});

export const { loginReducer } = userSlice.actions;

export default userSlice.reducer;
