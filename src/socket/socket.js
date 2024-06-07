import { io } from 'socket.io-client';

const URL = import.meta.env.VITE_APP_SOCKET

export const socket = io(URL, { transports: ['websocket'] });
export const socketMininetPython = io("http://localhost:6000", { transports: ['websocket'] });