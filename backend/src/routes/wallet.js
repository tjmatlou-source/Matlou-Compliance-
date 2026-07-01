const walletController = require('../controllers/walletController');

async function walletRoutes(fastify, opts) {
  fastify.get('/balance', {
    preHandler: [fastify.authenticate]
  }, walletController.getBalance);
  
  fastify.post('/deposit', {
    preHandler: [fastify.authenticate]
  }, walletController.deposit);
  
  fastify.post('/withdraw', {
    preHandler: [fastify.authenticate]
  }, walletController.withdraw);
}

module.exports = walletRoutes;
