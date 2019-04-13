import React from 'react';
import { Button, Form } from 'semantic-ui-react';

import { yearsDropdown } from '../../utils/yearsDropdown';

export default class EditForm extends React.Component {
  constructor(props) {
    super(props);
    const { fullname, yearOfBirth, occupation } = props;

    this.state = {
      inputs: {
        fullname: fullname || '',
        yearOfBirth: yearOfBirth || '',
        occupation: occupation || '',
      },
    };
  }

  onChangeInfo = (name, value) => {
    this.setState({
      ...this.state,
      inputs: { ...this.state.inputs, [name]: value },
    });
  };

  render() {
    const { fullname, yearOfBirth, occupation } = this.state.inputs;
    const { onClick } = this.props;
    return (
      <div>
        <div className="profile-info-edit-form-container">
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
      </div>
    );
  }
}
