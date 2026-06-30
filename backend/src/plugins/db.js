const fp = require('fastify-plugin');
const knex = require('knex');
const knexConfig = require('../../knexfile');

async function dbConnector(fastify, opts) {
  const connection = knex(knexConfig.development);
  
  fastify.decorate('db', connection);
  
  fastify.addHook('onClose', (instance, done) => {
    if (instance.db) {
      instance.db.destroy();
    }
    done();
  });
}

module.exports = fp(dbConnector);
