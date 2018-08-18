import axios from 'axios';
import * as Api from './api';

export const findAll = () => axios.get(`${Api.URL}/api/rooms`);
export const findReservations = (roomId) => axios.get(`${Api.URL}/api/rooms/${roomId}/reservations`);
export const createReservations = (roomId, data) => axios.post(`${Api.URL}/api/rooms/${roomId}/reservations`, data);