'use strict';

import Router from 'koa-router';
import reservationCtrl from './reservation.ctrl';

const api = new Router(); // 라우터 분리

api.get('/', reservationCtrl.findAll);
api.get('/:id', reservationCtrl.findById);
api.post('/', reservationCtrl.create);

module.exports = api;
