require('dotenv').config();
const fastify = require('fastify')({ logger: true });

fastify.register(require('@fastify/cors'), {
  origin: '*',
});

fastify.get('/health', async (request, reply) => {
  return { status: 'ok' };
});

const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT || 3001, host: '0.0.0.0' });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
