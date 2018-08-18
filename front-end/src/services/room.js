import axios from 'axios';
import * as Api from './api';

export const findAll = () => axios.get(`${Api.URL}/api/rooms`);
export const findReservations = (roomId, params) => axios.get(`${Api.URL}/api/rooms/${roomId}/reservations`, { params: params });
export const createReservations = (roomId, data) => axios.post(`${Api.URL}/api/rooms/${roomId}/reservations`, data);