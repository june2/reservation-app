'use strict';

import models from '~/db/models';

exports.findAll = async (ctx, next) => {
  try {
    const user = await models.user.findAll({});    
    ctx.body = user;
    next();
  } catch (e) {
    ctx.throw(500, e);
  }
};

// module.exports = {
//   create(ctx) {
//     return models.users
//       .create(req.body)
//       .then((user) => ctx.res.status(201).send(user))
//       .catch((err) => ctx.res.status(500).send(err));
//   },
//   findById(ctx) {
//     return models.users
//       .findById(req.params.id)
//       .then((user) => res.status(200).send(user))
//       .catch((err) => res.status(500).send(err));
//   },
//   findAll(ctx) {        
//     return models.user
//       .findAll({
//       })
//       .then((users) => ctx.res.status(200).send(users))
//       .catch((err) => ctx.res.status(500).send(err));
//   },
//   update(req, res) {
//     return models.materials
//       .update(req.body, {
//         where: { sku: req.params.id }
//       })
//       .then((materials) => res.status(200).send())
//       .catch((err) => res.status(500).send(err));
//   },
//   destroy(req, res) {
//     return models.materials
//       .destroy({
//         where: { sku: req.params.id }
//       })
//       .then((materials) => res.status(200).send())
//       .catch((err) => res.status(500).send(err));
//   }
// };