import { io } from 'socket.io-client';

const URL = import.meta.env.VITE_APP_URL

export const socket = io("http://35.180.164.192:4000/", { transports: ['websocket'] });