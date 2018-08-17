'use strict';

import Router from 'koa-router';
import userCtrl from './user.ctrl';

const api = new Router(); // 라우터 분리

api.get('/', userCtrl.findAll);
api.get('/:id', userCtrl.findById);
api.post('/', userCtrl.create);

module.exports = api;
