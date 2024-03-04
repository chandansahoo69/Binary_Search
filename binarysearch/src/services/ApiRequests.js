import { createAsyncThunk } from '@reduxjs/toolkit';
import { privateApi } from 'api/http';
import toast from 'react-hot-toast';
import { clearTokens, setAccessToken, setRefreshToken } from './ApiService';

export const login = createAsyncThunk('user/login', async (args, { rejectWithValue }) => {
    try {
        const response = await privateApi.post('/users/login', args);
        setAccessToken(response?.data?.data?.accessToken);
        setRefreshToken(response?.data?.data?.refreshToken);

        return response?.data?.data?.user;
    } catch (error) {
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data);
    }
});

export const logout = createAsyncThunk('user/logout', async (args, { rejectWithValue }) => {
    try {
        const response = await privateApi.post('/users/logout', args);
        clearTokens();
        return response?.data?.data?.user || null;
    } catch (error) {
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data);
    }
});

export const signup = createAsyncThunk('user/signup', async ({}, { rejectWithValue }) => {
    console.log('get user signup thunk');
    try {
        const response = await privateApi.get('/users/register');
        console.log('response in signup thunk', response);
        return response;
    } catch (error) {
        console.log('get user signup thunk failed', error);
        rejectWithValue(error.response);
    }
});

export const getCurrentUser = createAsyncThunk(
    'user/getCurrentUser',
    async (_, { rejectWithValue }) => {
        try {
            const { data: response } = await privateApi.get('/users/current-user');
            return response?.user;
        } catch (error) {
            toast.error(error.response.data.message);
            return rejectWithValue(error.response.data);
        }
    }
);
