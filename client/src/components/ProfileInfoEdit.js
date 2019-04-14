import './profileinfoedit/profileinfoedit.scss';

import React from 'react';
import { Form, Button } from 'semantic-ui-react';

import MessageDisplayer from './commons/MessageDisplayer';
import BlurbEditor from './BlurbEditor';
import EditForm from './profileinfoedit/EditForm';

export default class ProfileInfoEdit extends React.Component {
  constructor(props) {
    super(props);

    const { fullname, yearOfBirth, occupation, blurb } = props;
    this.state = {
      fullname,
      yearOfBirth,
      occupation,
      blurb,
    };
  }

  updateInfo = () => {
    const { fullname, yearOfBirth, blurb, occupation } = this.state;
    this.props.updateInfo(fullname, yearOfBirth, blurb, occupation);
  };

  updateInfoFromOnChange = (name, value) => {
    this.setState({ ...this.state, [name]: value });
  };

  render() {
    // const { errorMessage } = this.props;
    const { blurb, fullname, yearOfBirth, occupation } = this.state;
    const { onClick } = this.props;
    return (
      <div>
        {/* {errorMessage ? (
          <MessageDisplayer
            type="error"
            message={errorMessage}
            header="Update User Info"
          />
        ) : null} */}
        <Form>
          <div className="profile-info-edit-form">
            <div className="profile-info-edit-form-container">
              <h3>BASIC INFO</h3>
              <Button
                className="profile-info-edit-button push-button-to-right"
                onClick={this.updateInfo}
              >
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
            <EditForm
              fullname={fullname}
              yearOfBirth={yearOfBirth}
              occupation={occupation}
              onClick={onClick}
              onUpdate={this.updateInfoFromOnChange}
            />
          </div>
          <div className="profile-info-edit-blurb">
            <h3>STORY BLURB</h3>
            <hr />
            <span>PROVIDE SOME BRIEF DETAILS ABOUT YOUR STORY BELOW.</span>
            <hr />
            <BlurbEditor blurb={blurb} onUpdate={this.updateInfoFromOnChange} />
          </div>
        </Form>
      </div>
    );
  }
}
