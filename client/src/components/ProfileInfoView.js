import './profileinfoview/profileinfoview.scss';

import React from 'react';
import { Icon, Button } from 'semantic-ui-react';

import BlurbEditor from './BlurbEditor';

export default function ProfileInfoView(props) {
  const {
    fullname,
    yearOfBirth,
    blurb,
    occupation,
    location,
    onClick,
    readOnly,
  } = props;
  const { city, country } = location;
  return (
    <div className="profile-info-view-section">
      <div className="push-header-to-left">
        <h1>{fullname}</h1>
        <Button
          className="profile-info-view-button push-button-to-right"
          onClick={onClick}
        >
          EDIT
        </Button>
      </div>
      <div className="profile-info-view-section">
        <h3>About Me</h3>
        <BlurbEditor blurb={blurb} readOnly={readOnly} />
      </div>
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
