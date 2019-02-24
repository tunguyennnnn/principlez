require('dotenv').config();
import bcrypt from 'bcrypt-nodejs';

export function encrypt(string) {
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

export function compare(string, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(string, hash, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(res);
    });
  });
}
