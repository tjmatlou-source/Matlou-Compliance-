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
  fastify.put('/complete', {
    preHandler: [fastify.authenticate]
  }, async (request, reply) => {
    const db = fastify.db;
    const { 
      first_name, 
      last_name, 
      id_number, 
      phone_number, 
      address, 
      employment_info, 
      monthly_income 
    } = request.body;

    const profile = await db('profiles').where({ user_id: request.user.id }).first();

    if (profile) {
      await db('profiles')
        .where({ user_id: request.user.id })
        .update({
          first_name,
          last_name,
          id_number,
          phone_number,
          address,
          employment_info,
          monthly_income,
          updated_at: db.fn.now()
        });
    } else {
      await db('profiles').insert({
        user_id: request.user.id,
        first_name,
        last_name,
        id_number,
        phone_number,
        address,
        employment_info,
        monthly_income,
        created_at: db.fn.now(),
        updated_at: db.fn.now()
      });
    }

    return { message: 'Profile updated successfully' };
  });
}

module.exports = profileRoutes;
