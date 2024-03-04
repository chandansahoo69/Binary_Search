import { publicApi } from 'api/http';

export function getAccessToken() {
    return localStorage.getItem('accesstoken');
}
export function getRefreshToken() {
    return localStorage.getItem('refreshtoken');
}

export function setAccessToken(token) {
    localStorage.setItem('accesstoken', token);
}
export function setRefreshToken(token) {
    localStorage.setItem('refreshtoken', token);
}

export function clearTokens() {
    localStorage.removeItem('accesstoken');
    localStorage.removeItem('refreshtoken');
}

export async function getAccessTokenUsingRefreshToken() {
    const refreshToken = getRefreshToken();
    try {
        const { data: reponse } = await publicApi.post('/users/refresh-token', { refreshToken });
        const new_accesstoken = reponse.data.accessToken;
        const new_refreshtoken = reponse.data.refreshToken;
        setAccessToken(new_accesstoken);
        setRefreshToken(new_refreshtoken);
        return new_accesstoken;
    } catch (error) {
        return error;
    }
}
