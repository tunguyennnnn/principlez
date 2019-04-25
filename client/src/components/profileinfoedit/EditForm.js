import './editform.scss';

import React from 'react';
import { Dropdown } from 'semantic-ui-react';

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
      <form className="edit-form-container">
        <label>FULL NAME</label>
        <input
          name="fullname"
          defaultValue={fullname}
          onChange={event =>
            this.onChangeInfo(event.target.name, event.target.value)
          }
        />
        <label>YEAR OF BIRTH</label>
        <Dropdown
          name="yearOfBirth"
          fluid
          options={yearsDropdown()}
          defaultValue={yearOfBirth}
          selection
          onChange={(event, data) =>
            this.onChangeInfo('yearOfBirth', data.value)
          }
        />
        <label>OCCUPATION</label>
        <input
          name="occupation"
          defaultValue={occupation}
          onChange={event =>
            this.onChangeInfo(event.target.name, event.target.value)
          }
        />
      </form>
    );
  }
}
