'use strict';

import Router from 'koa-router';
import userCtrl from './user.ctrl';

const api = new Router(); // 라우터 분리

// api.post('/', userCtrl.create);
// api.get('/:id', userCtrl.findById);
api.get('/', userCtrl.findAll);

module.exports = api;
