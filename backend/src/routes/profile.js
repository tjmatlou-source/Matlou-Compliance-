async function profileRoutes(fastify, opts) {
  fastify.get('/me', {
    preHandler: [fastify.authenticate]
  }, async (request, reply) => {
    const db = fastify.db;
    const user = await db('users').where({ id: request.user.id }).first();
    const profile = await db('profiles').where({ user_id: request.user.id }).first();
    
    delete user.password_hash;
    
    return {
      ...user,
      profile
    };
  });
}

module.exports = profileRoutes;
