import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import logger from '~../server/middlewares/logger';
import responseHandler from '~../server/middlewares/responseHandler';
import errorHandler from '~../server/middlewares/errorHandler';
import api from '~../server/api';

const env = process.env.NODE_ENV || 'development';
const config = require('~../config/config.json')[env];
const app = new Koa();
const router = new Router();
 
// Trust proxy
app.proxy = true;

// Set middlewares
app.use(
  bodyParser({
    enableTypes: ['json', 'form'],
    formLimit: '10mb',
    jsonLimit: '10mb'
  })
);
app.use(
  cors({
    origin: '*',
    allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
    exposeHeaders: ['X-Request-Id']
  })
);

// res/res handler
app.use(responseHandler({ contentType: 'application/json' }))
app.use(errorHandler());

// Bootstrap application router
router.use('/api', api.routes());
app.use(router.routes());
app.use(router.allowedMethods());
// app.use(requestId());
// app.use(logMiddleware({ logger }));

// Start server
if (!module.parent) {
  const server = app.listen(config.port, config.host, () => {
    logger.info({ event: 'execute' }, `API server listening on ${config.host}:${config.port}, in ${env}`);
  });
  server.on('error', (err) => {
    throw err;
  });
}

// Expose app
module.exports = app;