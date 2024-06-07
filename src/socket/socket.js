import { io } from 'socket.io-client';

const URL = import.meta.env.VITE_APP_SOCKET

export const socketMininetPython = io("http://localhost:8080", { transports: ['websocket'] });
export const socket = io(URL, { transports: ['websocket'] });