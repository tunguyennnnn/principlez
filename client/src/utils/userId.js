import _ from 'lodash';
export function generateId(userId, fullname) {
  if (!fullname) {
    return userId;
  }
  return fullname.split(/\s+/).join('-') + `-${userId}`;
}

export function extractUserId(id) {
  return _.last(id.split('-'));
}
