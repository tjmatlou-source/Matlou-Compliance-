const { register, login } = require('../controllers/authController');

async function authRoutes(fastify, opts) {
  fastify.post('/register', register);
  fastify.post('/login', login);
}

module.exports = authRoutes;
