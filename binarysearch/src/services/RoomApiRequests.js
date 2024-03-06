import { createAsyncThunk } from '@reduxjs/toolkit';
import { privateApi } from 'api/http';
import toast from 'react-hot-toast';

// export const getRooms = createAsyncThunk('rooms/getRooms', async (args, { rejectWithValue }) => {
//     try {
//         const response = await privateApi.post('/room/get-rooms', args);

//         return response?.data?.data?.user;
//     } catch (error) {
//         toast.error(error.response.data.message);
//         return rejectWithValue(error.response.data);
//     }
// });

export const createRoom = async (args) => {
    const response = await privateApi.post('/room/create-room', args);
    return response;
};

export const getRooms = async (args) => {
    const response = await privateApi.get('/room/get-rooms', args);
    return response;
};

export const getRoom = async (args) => {
    const response = await privateApi.get(`/room/get-room/${args}`);
    return response;
};

export const searchUsers = async (args) => {
    const response = await privateApi.get(`/users/search?user=${args}`);
    return response;
};
