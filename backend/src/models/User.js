class User {
  constructor(db) {
    this.db = db;
  }

  async findByEmail(email) {
    return this.db('users').where({ email }).first();
  }

  async findById(id) {
    return this.db('users').where({ id }).first();
  }

  async create(userData) {
    const [user] = await this.db('users').insert(userData).returning('*');
    return user;
  }
}

module.exports = User;
