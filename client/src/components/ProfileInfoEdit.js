import './profileinfoedit/profileinfoedit.scss';

import React from 'react';
import { Form, Button } from 'semantic-ui-react';

import MessageDisplayer from './commons/MessageDisplayer';
import BlurbEditor from './BlurbEditor';
import EditForm from './profileinfoedit/EditForm';

export default class ProfileInfoEdit extends React.Component {
  // updateInfo = () => {
  //   const { fullname, yearOfBirth, value, occupation } = this.state.inputs;
  //   const blurb = value.toJSON();
  //   this.props.updateInfo(fullname, yearOfBirth, blurb, occupation);
  // };

  render() {
    // const { errorMessage } = this.props;
    const { blurb, fullname, yearOfBirth, occupation, onClick } = this.props;
    return (
      <div>
        {/* {errorMessage ? (
          <MessageDisplayer
            type="error"
            message={errorMessage}
            header="Update User Info"
          />
        ) : null} */}
        <Form onSubmit={this.updateInfo}>
          <div className="profile-info-edit-form">
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
            <EditForm
              fullname={fullname}
              yearOfBirth={yearOfBirth}
              occupation={occupation}
              onClick={onClick}
            />
          </div>
          <div className="profile-info-edit-blurb">
            <h3>STORY BLURB</h3>
            <hr />
            <span>PROVIDE SOME BRIEF DETAILS ABOUT YOUR STORY BELOW.</span>
            <hr />
            <BlurbEditor blurb={blurb} />
          </div>
        </Form>
      </div>
    );
  }
}
