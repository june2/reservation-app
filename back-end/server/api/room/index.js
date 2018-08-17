'use strict';

import Router from 'koa-router';
import roomCtrl from './room.ctrl';

const api = new Router(); // 라우터 분리

api.get('/', roomCtrl.findAll);
api.get('/:id', roomCtrl.findById);
api.post('/', roomCtrl.create);

module.exports = api;
