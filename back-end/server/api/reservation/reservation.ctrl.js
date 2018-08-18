'use strict';

import models from '~/db/models';

exports.findAll = async (ctx, next) => {
  try {
    let reservation = await models.reservation.findAll();
    return ctx.res.ok({ data: reservation });
  } catch (e) {
    ctx.throw(500, e);
  }
};
