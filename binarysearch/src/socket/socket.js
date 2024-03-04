import { io } from 'socket.io-client';

const URL = process.env.REACT_APP_SOCKET_URL;

const path = process.env.REACT_APP_SOCKET_PATH;

// const options = {
//   transports: ['websocket', 'polling', 'flashsocket'],
// };

export const socket = io(URL, {
  path,
});

// export const socket = io('http://216.48.182.81', {
//   path: '/socket/',
// });
