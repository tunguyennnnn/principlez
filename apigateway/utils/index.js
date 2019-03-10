import _ from 'lodash';

/**
 *
 * @param {*} a1 array
 * @param {*} a2 array
 * check if array 1 and 2 has the same elements;
 */
export const hasSameElements = (a1, a2) => {
  if (a1.length !== a2.length) return false;

  return !_.some(a2, el => !_.includes(a1, el));
};
