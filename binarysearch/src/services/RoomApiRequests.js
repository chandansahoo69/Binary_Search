import { privateApi } from 'api/http';

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

export const startWar = async (args) => {
    const response = await privateApi.post(`/room/start-war`, args);
    return response;
};

export const compileCode = async (args) => {
    const response = await privateApi.post(`/room/compile-code`, args);
    return response;
};

export const submitCode = async (args) => {
    const response = await privateApi.post(`/room/submit-code`, args);
    return response;
};

export const searchUsers = async (args) => {
    const response = await privateApi.get(`/users/search?user=${args}`);
    return response;
};

export const getNotifications = async (args) => {
    const response = await privateApi.get(`/notifications`);
    return response;
};

export const getEvents = async (args) => {
    const response = await privateApi.get(`/events/get-events`);
    return response;
};

export const createEvent = async (args) => {
    const response = await privateApi.post(`/events/create-event`, args);
    return response;
};
