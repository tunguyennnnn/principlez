import './profileinfoview/profileinfoview.scss';

import React from 'react';
import { Icon, Button } from 'semantic-ui-react';

import BlurbEditor from './BlurbEditor';

export default class ProfileInfoView extends React.Component {
  render() {
    const {
      fullname,
      yearOfBirth,
      blurb,
      occupation,
      location,
      onClick,
    } = this.props;
    const { city, country } = location;
    return (
      <div>
        <div className="profile-info-view-section push-header-to-left">
          <h1>{fullname}</h1>
          <Button
            className="profile-info-view-button push-button-to-right"
            onClick={onClick}
          >
            EDIT
          </Button>
        </div>
        <div>
          <h4>Joined on:</h4>
        </div>
        <hr />
        <div className="profile-info-view-section">
          <h3>Story Blurb:</h3>
          <BlurbEditor blurb={blurb} />
        </div>
        <hr />
        <div className="profile-info-view-section">
          <div className="profile-info-view-user-attr">
            <Icon name="map pin" size="large" />
            <h3 className="profile-info-view-subheader">
              {city}, {country}
            </h3>
          </div>
          <div className="profile-info-view-user-attr">
            <Icon name="users" size="large" />
            <h3 className="profile-info-view-subheader">{occupation}</h3>
          </div>
          <div className="profile-info-view-user-attr">
            <Icon name="birthday cake" size="large" />
            <h3 className="profile-info-view-subheader">{yearOfBirth}</h3>
          </div>
        </div>
      </div>
    );
  }
}
