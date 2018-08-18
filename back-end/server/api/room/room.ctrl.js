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

exports.createRoomReservation = async (ctx, next) => {
  try {
    let roomId = ctx.params.id;
    let startAt = ctx.request.body.startAt;
    let endAt = ctx.request.body.endAt;
    if (!startAt) {
      return ctx.res.unprocessableEntity({ data: 'error', message: 'startAt cannot be blank' });
    }
    if (!endAt) {
      return ctx.res.unprocessableEntity({ data: 'error', message: 'endAt cannot be blank' });
    }
    let data = {     
      roomId: roomId, startAt: startAt, endAt: endAt
    }
    let reservation = await models.reservation.create(data);
    data.id = reservation.id;
    return ctx.res.created({ data: data, message: 'reservations is created' });
  } catch (e) {
    ctx.throw(500, e);
  }
};

exports.findRoomReservation = async (ctx, next) => {
  try {
    let roomId = ctx.params.id;
    let reservations = await models.reservation.findAll({
      attributes: ['id', 'startAt', 'endAt', 'memo'],
      where: {
        roomId: roomId
      }
    });
    return ctx.res.ok({ data: reservations });
  } catch (e) {
    ctx.throw(500, e);
  }
};
