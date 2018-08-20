'use strict';

import Router from 'koa-router';
import userCtrl from './user.ctrl';

const api = new Router(); // 라우터 분리

api.post('/', userCtrl.create); // 사용자 생성

module.exports = api;
