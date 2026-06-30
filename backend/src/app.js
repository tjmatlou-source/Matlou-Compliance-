const fastify = require('fastify');
const cors = require('@fastify/cors');
const jwt = require('@fastify/jwt');
const dbPlugin = require('./plugins/db');
const authPlugin = require('./plugins/auth');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const backgroundCheckRoutes = require('./routes/backgroundChecks');

function build(opts = {}) {
  const app = fastify(opts);

  // Plugins
  app.register(cors, {
    origin: '*',
  });
  
  app.register(jwt, {
    secret: process.env.JWT_SECRET || 'supersecret',
  });

  app.register(dbPlugin);
  app.register(authPlugin);

  // Routes
  app.get('/health', async (request, reply) => {
    return { status: 'ok' };
  });

  app.register(authRoutes, { prefix: '/auth' });
  app.register(profileRoutes, { prefix: '/profile' });
  app.register(backgroundCheckRoutes, { prefix: '/background-checks' });

  return app;
}

module.exports = build;
