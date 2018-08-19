'use strict';

import models from '~/db/models';

exports.findAll = async (ctx) => {
  try {
    let reservation = await models.reservation.findAll();
    return ctx.res.ok({ data: reservation });
  } catch (e) {
    ctx.throw(500, e);
  }
};

exports.destroyAll = async (ctx) => {
  try {
    let reservation = await models.reservation.destroy({
      // where: {},
      truncate: true
    });
    return ctx.res.ok({ data: reservation });
  } catch (e) {
    ctx.throw(500, e);
  }
};
