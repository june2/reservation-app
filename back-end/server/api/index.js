'use strict';

import Router from 'koa-router';
import user from './user';
import room from './room';
import reservation from './reservation';
import pkginfo from '~.package.json';

const api = new Router(); // 라우터 분리

let getApiInfo = ctx => {
  const data = {
    name: pkginfo.name,
    version: pkginfo.version,
    description: pkginfo.description,
    author: pkginfo.author
  };
  return ctx.res.ok({ data: data });
};

api.get('/', getApiInfo);
api.use('/users', user.routes());
api.use('/rooms', room.routes());
api.use('/reservations', reservation.routes());

module.exports = api;