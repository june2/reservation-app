'use strict';

import Router from 'koa-router';
import user from './user';

const api = new Router(); // 라우터 분리

api.use('/users', user.routes());

module.exports = api;