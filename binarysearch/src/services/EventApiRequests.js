import { privateApi } from 'api/http';

export const getEvents = async (args) => {
    const response = await privateApi.get(`/events/get-events/${args}`);
    return response;
};

export const createEvent = async (args) => {
    const response = await privateApi.post(`/events/create-event`, args);
    return response;
};
