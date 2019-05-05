import React from 'react';
import { AUTO_COMPLETE_MARK } from './types';
import AutoComplete from './AutoComplete';

export default {
  [AUTO_COMPLETE_MARK]: props => <AutoComplete {...props} />,
};
