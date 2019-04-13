import React from 'react';

import { Editor } from 'slate-react';
import { Value } from 'slate';
import Blocks from './editors/Blocks';
import _ from 'lodash';

const initialBlurb = {
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: '',
              },
            ],
          },
        ],
      },
    ],
  },
};

export default class BlurbEditor extends React.Component {
  constructor(props) {
    super(props);
    const { blurb } = props;

    this.state = {
      value: this.blurbValue(blurb),
    };
  }

  blurbValue = (blurb = []) => {
    return Value.fromJSON(!_.isEmpty(blurb) ? blurb : initialBlurb);
  };

  onChangeBlurb = ({ value }) => {
    this.setState({ value });
  };

  renderNode = (props, editor, next) => {
    return Blocks[props.node.type].call(null, props);
  };

  render() {
    const { value } = this.state;
    const { readOnly } = this.props;
    return (
      <Editor
        value={value}
        onChange={this.onChangeBlurb}
        renderNode={this.renderNode}
        readOnly={readOnly}
      />
    );
  }
}
