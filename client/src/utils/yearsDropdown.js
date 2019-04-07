import * as _ from 'lodash';
import moment from 'moment';

export const yearsDropdown = function() {
  const now = moment().year();
  const years = _.range(now, now - 100, -1);
  return _.map(years, year => ({ value: String(year), text: String(year) }));
};
