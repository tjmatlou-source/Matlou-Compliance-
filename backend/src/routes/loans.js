const loanController = require('../controllers/loanController');

async function loanRoutes(fastify, opts) {
  fastify.get('/available', loanController.getAvailableLoans);
  
  fastify.post('/', {
    preHandler: [fastify.authenticate]
  }, loanController.createLoanRequest);
  
  fastify.post('/:id/fund', {
    preHandler: [fastify.authenticate]
  }, loanController.fundLoan);
  
  fastify.get('/:id', loanController.getLoanDetails);
  
  fastify.get('/my', {
    preHandler: [fastify.authenticate]
  }, loanController.getMyLoans);
}

module.exports = loanRoutes;
