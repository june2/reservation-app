'use strict';

import models from '~/db/models';

exports.create = async (ctx, next) => {
  try {
    let name = ctx.request.body.name;
    if (!name) {
      return ctx.res.unprocessableEntity({ data: 'error', message: 'name cannot be blank' });
    }
    let reservation = await models.reservation.create({
      name: name
    });
    return ctx.res.ok({ data: reservation, message: 'reservation is created' });
  } catch (e) {
    ctx.throw(500, e);
  }
};

exports.findAll = async (ctx, next) => {
  try {
    let reservation = await models.reservation.findAll();
    return ctx.res.ok({ data: reservation });
  } catch (e) {
    ctx.throw(500, e);
  }
};

exports.findById = async (ctx, next) => {
  try {
    let id = ctx.params.id;    
    let reservation = await models.reservation.findById(id);
    if (reservation) {
      return ctx.res.ok({ data: reservation });
    } else {
      return ctx.res.notFound({ data: 'error', message: 'id not found' });
    }    
  } catch (e) {
    ctx.throw(500, e);
  }
};
