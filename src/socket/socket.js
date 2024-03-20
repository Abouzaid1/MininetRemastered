import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
// const URL = 'http://localhost:3000';
const URL = 'wss://mininetremasteredserverside-4.onrender.com/socket.io/?EIO=4&transport=websocket';

export const socket = io(URL, { transports: ['websocket', 'polling', 'flashsocket'] });