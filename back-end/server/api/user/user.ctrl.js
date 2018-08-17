'use strict';

import models from '~/db/models';

exports.create = async (ctx, next) => {
  try {
    let name = ctx.request.body.name;
    let password = ctx.request.body.name;
    if (!name) {
      return ctx.res.unprocessableEntity({ data: 'error', message: 'name cannot be blank' });
    }
    if (!password) {
      return ctx.res.unprocessableEntity({ data: 'error', message: 'password cannot be blank' });
    }
    let user = await models.user.create({
      name: name
    });
    return ctx.res.ok({ data: user, message: 'user is created' });
  } catch (e) {
    ctx.throw(500, e);
  }
};

exports.findAll = async (ctx, next) => {
  try {
    let user = await models.user.findAll();
    return ctx.res.ok({ data: user });
  } catch (e) {
    ctx.throw(500, e);
  }
};

exports.findById = async (ctx, next) => {
  try {
    let id = ctx.params.id;    
    let user = await models.user.findById(id);
    if (user) {
      return ctx.res.ok({ data: user });
    } else {
      return ctx.res.notFound({ data: 'error', message: 'id not found' });
    }    
  } catch (e) {
    ctx.throw(500, e);
  }
};
