import moment from 'moment';

export const formatDateTime = updatedAt => {
  const time = moment(Number(updatedAt));
  return time.format('YYYY-MM-DD');
};
