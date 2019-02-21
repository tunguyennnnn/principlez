require('dotenv').config();
import jwt from 'jsonwebtoken';

const superSecret = process.env.superSecret || 'some secret';

export default function generateToken(user) {
  return {
    token: jwt.sign(user, superSecret, { expiresIn: 60 * 60 * 24 * 30 }),
    expiresIn: 60 * 60 * 24 * 30,
  };
}
