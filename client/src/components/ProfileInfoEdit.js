import './profileinfoedit/profileinfoedit.scss';

import React from 'react';
import { Button } from 'semantic-ui-react';

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
      <div className="profile-info-edit-container">
        {/* {errorMessage ? (
          <MessageDisplayer
            type="error"
            message={errorMessage}
            header="Update User Info"
          />
        ) : null} */}
        <h3>ABOUT ME</h3>
        <hr />
        <div className="profile-info-edit-blurb">
          <BlurbEditor blurb={blurb} onUpdate={this.updateInfoFromOnChange} />
        </div>
        <div className="profile-info-edit-form">
          <h3>BASIC INFO</h3>
          <hr />
          <EditForm
            fullname={fullname}
            yearOfBirth={yearOfBirth}
            occupation={occupation}
            onClick={onClick}
            onUpdate={this.updateInfoFromOnChange}
          />
        </div>
        <div className="profile-info-edit-buttons">
          <Button className="profile-button" onClick={this.updateInfo}>
            SAVE
          </Button>
          <Button
            basic
            color="black"
            className="profile-button"
            onClick={onClick}
          >
            CANCEL
          </Button>
        </div>
      </div>
    );
  }
}
