import './profileinfoview/profileinfoview.scss';

import React from 'react';
import { Icon, Button } from 'semantic-ui-react';

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
          <div>
            A paragraph is a self-contained unit of a discourse in writing
            dealing with a particular point or idea. A paragraph consists of one
            or more sentences. Though not required by the syntax of any
            language, paragraphs are usually an expected part of formal writing,
            used to organize longer prose.
          </div>
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
