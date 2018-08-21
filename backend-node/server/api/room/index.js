'use strict';

import Router from 'koa-router';
import roomCtrl from './room.ctrl';

const api = new Router(); // 라우터 분리

api.post('/', roomCtrl.create); // 미팅룸 생성
api.get('/', roomCtrl.findAll); // 미팅룸 조회
api.get('/:id', roomCtrl.findById); // 미팅룸 상세 조회

api.post('/:id/reservations', roomCtrl.createRoomReservation); // 미팅룸 예약 생성
api.get('/:id/reservations', roomCtrl.findRoomReservation); // 미팅룸 예약 조회
api.get('/:id/reservations/check', roomCtrl.checkRoomReservationTime); // 미팅룸 가능 예약 시간 조회

module.exports = api;
