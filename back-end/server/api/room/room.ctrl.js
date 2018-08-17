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
    return ctx.res.created({ data: { id: room.id, name: room.name }, message: 'room is created' });
  } catch (e) {
    ctx.throw(500, e);
  }
};

exports.findAll = async (ctx, next) => {
  try {
    let room = await models.room.findAll({
      attributes: ['id', 'name']
    });
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

exports.findRoomReservation = async (ctx, next) => {
  try {
    let roomId = ctx.params.id;
    let reservations = await models.reservation.findAll({
      where: {
        roomId: roomId
      }
    });
    return ctx.res.ok({ data: reservations });
  } catch (e) {
    ctx.throw(500, e);
  }
};
