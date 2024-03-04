import axios from 'axios';
import { getAccessToken, getAccessTokenUsingRefreshToken } from 'services/ApiService';

const publicApi = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

const privateApi = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

publicApi.interceptors.request.use(
    (config) => {
        config.headers = {
            ...config.headers,
            'Content-Type': 'application/json',
        };
        // console.log('public_api intereceptor request config', config);
        return config;
    },
    (error) => {
        return Promise.reject('Error in axios');
    }
);

publicApi.interceptors.response.use(
    (response) => {
        // console.log('public_api Interceptor response : ', response);
        return response;
    },
    (error) => {
        // console.log('error in publicapi response interceptor', error);
        return Promise.reject(error);
    }
);

privateApi.interceptors.request.use(
    (config) => {
        const accesstoken = getAccessToken();
        config.headers = {
            ...config.headers,
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accesstoken}`,
        };
        // console.log('private_api intereceptor request config', config);
        return config;
    },
    (error) => {
        // console.log(error);
        return Promise.reject('Error in axios');
    }
);

privateApi.interceptors.response.use(
    (response) => {
        // console.log('response in intereceptor ', response);
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        //if the error is due to an "unauthorized" response
        if (error.response.status === 401 && !originalRequest._retry) {
            // console.log('refresh_token-step-1', originalRequest, originalRequest?._retry);
            originalRequest._retry = true;

            try {
                //Attempt to refresh the access token
                // console.log('refresh_token-step-2');
                const newAccessToken = await getAccessTokenUsingRefreshToken();
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return privateApi(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }
        // console.log('error in privateapi response interceptor', error);
        return Promise.reject(error);
    }
);

export { publicApi, privateApi };
