const { 
  initiateCheck, 
  getCheckStatus, 
  approveCheck 
} = require('../controllers/backgroundCheckController');

async function backgroundCheckRoutes(fastify, opts) {
  fastify.post('/initiate', {
    preHandler: [fastify.authenticate]
  }, initiateCheck);

  fastify.get('/:id', {
    preHandler: [fastify.authenticate]
  }, getCheckStatus);

  fastify.post('/:id/approve', {
    preHandler: [fastify.authenticate]
  }, approveCheck);
}

module.exports = backgroundCheckRoutes;
