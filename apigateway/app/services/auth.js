require('dotenv').config();
import jwt from 'jsonwebtoken';

import models from '../../models';

const superSecret = process.env.superSecret || 'some secret';

export function generateToken(user) {
  return {
    token: jwt.sign(user, superSecret, { expiresIn: 60 * 60 * 24 * 30 }),
    expiresIn: 60 * 60 * 24 * 30,
  };
}

export const authCheck = async req => {
  const { headers } = req;
  if (
    headers.authorization &&
    headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    try {
      const decoded = jwt.verify(
        headers.authorization.split(' ')[1],
        superSecret,
      );
      const user = await models.User.findOne({
        where: { id: decoded.id },
      });
      return user;
    } finally {
      return null;
    }
  }
};
