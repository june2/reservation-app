import axios from 'axios';
import * as Api from './api';

export const findAll = () => axios.get(`${Api.URL}/api/rooms`);
export const findReservations = (roomId) => axios.get(`${Api.URL}/api/rooms/${roomId}/reservations`);