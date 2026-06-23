const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/User');

const register = async (request, reply) => {
  const { email, password, role } = request.body;
  const db = request.server.db;
  const userModel = new User(db);

  try {
    const existingUser = await userModel.findByEmail(email);
    if (existingUser) {
      return reply.code(400).send({ message: 'User already exists' });
    }

    const password_hash = await bcrypt.hash(password, 10);
    const id = uuidv4();

    const newUser = {
      id,
      email,
      password_hash,
      role: role || 'BORROWER',
      kyc_status: 'PENDING',
      created_at: new Date(),
      updated_at: new Date()
    };

    await db('users').insert(newUser);

    // Also create a profile
    await db('profiles').insert({
      user_id: id,
      created_at: new Date(),
      updated_at: new Date()
    });

    const token = request.server.jwt.sign({ id, email, role: newUser.role });

    return reply.code(201).send({
      token,
      user: {
        id,
        email,
        role: newUser.role
      }
    });
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send({ message: 'Internal Server Error' });
  }
};

const login = async (request, reply) => {
  const { email, password } = request.body;
  const db = request.server.db;
  const userModel = new User(db);

  try {
    const user = await userModel.findByEmail(email);
    if (!user) {
      return reply.code(401).send({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return reply.code(401).send({ message: 'Invalid credentials' });
    }

    const token = request.server.jwt.sign({ id: user.id, email: user.email, role: user.role });

    return reply.send({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send({ message: 'Internal Server Error' });
  }
};

module.exports = {
  register,
  login
};
