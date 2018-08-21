'use strict';

import models from '~/db/models';
import utils from '~/server/components/utils';
import { Op } from 'sequelize';

exports.create = async (ctx) => {
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

exports.findAll = async (ctx) => {
  try {
    let room = await models.room.findAll({
      attributes: ['id', 'name']
    });
    return ctx.res.ok({ data: room });
  } catch (e) {
    ctx.throw(500, e);
  }
};

exports.findById = async (ctx) => {
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

exports.createRoomReservation = async (ctx) => {
  try {
    let roomId = ctx.params.id;
    let startAt = ctx.request.body.startAt; // 예약 시작
    let endAt = ctx.request.body.endAt; // 예약 끝
    let count = ctx.request.body.count || 1; // 예약 날짜 반복 횟수
    let memo = ctx.request.body.memo || null;  // 예약 메모 
    // validations
    if (!startAt) {
      return ctx.res.unprocessableEntity({ data: 'error', message: 'startAt cannot be blank' });
    }
    if (!endAt) {
      return ctx.res.unprocessableEntity({ data: 'error', message: 'endAt cannot be blank' });
    }
    // 종료일이 시작일보다 클 경우, 30분 단위 예약 아닐시 error
    if (!utils.validateReservationDate(startAt, endAt)) {
      return ctx.res.unprocessableEntity({ data: 'error', message: 'datetime is invaild' });
    }
    // 중복 예약 방지
    let obj = await models.reservation.findOne({
      attributes: ['id'],
      where: {
        roomId: roomId,
        startAt: { [Op.between]: [utils.convertUtc(startAt), utils.convertUtc(endAt)] }
      }
    });    
    if (obj) {
      return ctx.res.forbidden({ data: 'error', message: 'The room is not available' });
    }
    let reservation = { roomId: roomId, startAt: startAt, endAt: endAt, memo: memo };
    let data = utils.generateDate(reservation, count);
    let reservations = await models.reservation.bulkCreate(data);
    return ctx.res.created({ data: reservations, message: 'reservations is created' });
  } catch (e) {
    ctx.throw(500, e);
  }
};

exports.findRoomReservation = async (ctx) => {
  try {
    let roomId = ctx.params.id;
    let begin = ctx.query.begin || new Date();
    let last = ctx.query.last || new Date();
    let reservations = await models.reservation.findAll({
      attributes: ['id', ['startAt', 'start'], ['endAt', 'end'], ['memo', 'title']],
      where: {
        roomId: roomId,
        startAt: { [Op.gte]: begin },
        endAt: { [Op.lte]: last }
      }
    });
    return ctx.res.ok({ data: reservations });
  } catch (e) {
    ctx.throw(500, e);
  }
};

exports.checkRoomReservationTime = async (ctx) => {
  try {
    let roomId = ctx.params.id;
    let begin = ctx.query.begin;
    let last = ctx.query.last;
    if (!begin) {
      return ctx.res.unprocessableEntity({ data: 'error', message: 'begin date is needed' });
    }
    if (!last) {
      return ctx.res.unprocessableEntity({ data: 'error', message: 'begin date is needed' });
    }    
    let reservation = await models.reservation.findOne({
      attributes: ['id', ['startAt', 'start']],
      order: ['startAt'],
      where: {
        roomId: roomId,
        startAt: { [Op.between]: [begin, last] }
      }
    });
    return ctx.res.ok({ data: reservation });
  } catch (e) {
    ctx.throw(500, e);
  }
};
