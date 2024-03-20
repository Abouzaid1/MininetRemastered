import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
// const URL = 'http://localhost:3000';
const URL = 'https://mininetremasteredserverside-4.onrender.com/';

export const socket = io(URL);