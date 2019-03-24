import React from 'react';
import _ from 'lodash';
import { Message } from 'semantic-ui-react';

const VALID_TYPES = ['error', 'warning', 'success'];

export default function MessageDisplayer({ type, message, header }) {
  if (!_.includes(VALID_TYPES, type)) return null;
  const types = {};
  VALID_TYPES.forEach(vType => {
    if (vType === 'error') {
      types['negative'] = vType === type;
    }
    types[vType] = vType === type;
  });
  return (
    <div className="message-display-container">
      <Message {...types} header={header} content={message} />
    </div>
  );
}
