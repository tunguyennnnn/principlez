import './profilepage/profilepage.scss';

import React from 'react';
import { Grid } from 'semantic-ui-react';

import ProfileInfo from './profilepage/ProfileInfo';
import ProfileImage from './profilepage/ProfileImage';

export default class ProfilePage extends React.Component {
  render() {
    return (
      <Grid className="profile-page-container">
        <Grid.Column mobile={16} tablet={6} largeScreen={6} widescreen={6}>
          <ProfileImage />
          <ProfileInfo />
        </Grid.Column>
        <Grid.Column mobile={16} tablet={10} largeScreen={10} widescreen={10}>
          Hello I will put a list of stories here
        </Grid.Column>
      </Grid>
    );
  }
}
