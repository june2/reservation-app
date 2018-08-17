'use strict';

import Router from 'koa-router';
import user from './user';
import room from './room';
import reservation from './reservation';

const api = new Router(); // 라우터 분리

api.use('/users', user.routes());
api.use('/rooms', room.routes());
api.use('/reservations', reservation.routes());

module.exports = api;