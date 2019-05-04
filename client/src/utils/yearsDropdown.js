import * as _ from 'lodash';
import moment from 'moment';
import React from 'react';

export const yearsDropdown = function() {
  const now = moment().year();
  const years = _.range(now, now - 100, -1);
  return _.map(years, year => (
    <option key={year} value={year}>
      {year}
    </option>
  ));
};
