import './profileinfoedit/profileinfoedit.scss';

import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import Blocks from './editors/Blocks';
import _ from 'lodash';

import MessageDisplayer from './commons/MessageDisplayer';
import { yearsDropdown } from '../utils/yearsDropdown';
import BlurbEditor from './BlurbEditor';

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

export default class ProfileInfoEdit extends React.Component {
  constructor(props) {
    super(props);
    const { fullname, yearOfBirth, blurb, occupation } = props;

    this.state = {
      inputs: {
        fullname: fullname || '',
        yearOfBirth: yearOfBirth || '',
        value: this.blurbValue(blurb),
        occupation: occupation || '',
      },
    };
  }

  blurbValue = (blurb = []) => {
    return Value.fromJSON(!_.isEmpty(blurb) ? blurb : initialBlurb);
  };

  onChangeInfo = (name, value) => {
    this.setState({
      ...this.state,
      inputs: { ...this.state.inputs, [name]: value },
    });
  };

  onChangeBlurb = ({ value }) => {
    this.setState({ inputs: { ...this.state.inputs, value: value } });
  };

  renderNode = (props, editor, next) => {
    return Blocks[props.node.type].call(null, props);
  };

  updateInfo = () => {
    const { fullname, yearOfBirth, value, occupation } = this.state.inputs;
    const blurb = value.toJSON();
    this.props.updateInfo(fullname, yearOfBirth, blurb, occupation);
  };

  render() {
    // const { errorMessage } = this.props;
    const {
      fullname,
      yearOfBirth,
      value,
      occupation,
      onClick,
    } = this.state.inputs;
    const { blurb } = this.props;
    return (
      <div>
        {/* {errorMessage ? (
          <MessageDisplayer
            type="error"
            message={errorMessage}
            header="Update User Info"
          />
        ) : null} */}
        <div>
          <Form onSubmit={this.updateInfo}>
            <div className="profile-info-edit-header-container">
              <h3>BASIC INFO</h3>
              <Button className="profile-info-edit-button push-button-to-right">
                SAVE
              </Button>
              <Button
                basic
                color="black"
                className="profile-info-edit-button"
                onClick={onClick}
              >
                CANCEL
              </Button>
            </div>
            <hr />
            <Form.Field>
              <label>FULL NAME</label>
              <input
                name="fullname"
                defaultValue={fullname}
                onChange={event =>
                  this.onChangeInfo(event.target.name, event.target.value)
                }
              />
            </Form.Field>
            <Form.Dropdown
              label="YEAR OF BIRTH"
              name="yearOfBirth"
              options={yearsDropdown()}
              defaultValue={yearOfBirth}
              selection
              onChange={(event, data) =>
                this.onChangeInfo('yearOfBirth', data.value)
              }
            />
            <Form.Field>
              <label>OCCUPATION</label>
              <input
                name="occupation"
                defaultValue={occupation}
                onChange={event =>
                  this.onChangeInfo(event.target.name, event.target.value)
                }
              />
            </Form.Field>
            <div className="profile-info-edit-blurb">
              <h3>STORY BLURB</h3>
              <hr />
              <span>PROVIDE SOME BRIEF DETAILS ABOUT YOUR STORY HERE.</span>
              <BlurbEditor blurb={blurb} />
            </div>
          </Form>
        </div>
      </div>
    );
  }
}
