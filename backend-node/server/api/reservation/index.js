'use strict';

import Router from 'koa-router';
import reservationCtrl from './reservation.ctrl';

const api = new Router(); // 라우터 분리

api.get('/', reservationCtrl.findAll); // 모든 예약 정보 조회
api.delete('/', reservationCtrl.destroyAll); // 모든 예약 정보 조회

module.exports = api;
