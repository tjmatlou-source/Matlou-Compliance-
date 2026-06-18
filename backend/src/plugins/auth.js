const fp = require('fastify-plugin');

async function authPlugin(fastify, opts) {
  fastify.decorate('authenticate', async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });

  fastify.decorate('authorize', (roles) => {
    return async (request, reply) => {
      const { role } = request.user;
      if (!roles.includes(role)) {
        return reply.code(403).send({ message: 'Forbidden: Insufficient permissions' });
      }
    };
  });
}

module.exports = fp(authPlugin);
