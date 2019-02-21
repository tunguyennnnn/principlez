require('dotenv').config();
import bcrypt from 'bcrypt-nodejs';

export default function encrypt(string) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(string, null, null, (err, hash) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(hash);
    });
  });
}
