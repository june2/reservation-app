'use strict';

import models from '~/db/models';

exports.create = async (ctx, next) => {
  try {
    let name = ctx.request.body.name;
    if (!name) {
      return ctx.res.unprocessableEntity({ data: 'error', message: 'name cannot be blank' });
    }
    let room = await models.room.create({
      name: name
    });
    return ctx.res.ok({ data: room, message: 'room is created' });
  } catch (e) {
    ctx.throw(500, e);
  }
};

exports.findAll = async (ctx, next) => {
  try {
    let room = await models.room.findAll();
    return ctx.res.ok({ data: room });
  } catch (e) {
    ctx.throw(500, e);
  }
};

exports.findById = async (ctx, next) => {
  try {
    let id = ctx.params.id;    
    let room = await models.room.findById(id);
    if (room) {
      return ctx.res.ok({ data: room });
    } else {
      return ctx.res.notFound({ data: 'error', message: 'id not found' });
    }    
  } catch (e) {
    ctx.throw(500, e);
  }
};
