import React from 'react';
import { Form } from 'semantic-ui-react';

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
    this.props.onUpdate(name, value);

    this.setState({
      ...this.state,
      inputs: { ...this.state.inputs, [name]: value },
    });
  };

  render() {
    const { fullname, yearOfBirth, occupation } = this.state.inputs;
    return (
      <Form>
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
      </Form>
    );
  }
}
