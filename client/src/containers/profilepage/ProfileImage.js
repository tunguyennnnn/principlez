import './profilepage.scss';

import React from 'react';

import FakeProfileImage from '../../assets/darth_vader.jpg';

export default class ProfileImage extends React.Component {
  render() {
    return (
      <div className="profile-image-container">
        <img src={FakeProfileImage} className="profile-image" />
      </div>
    );
  }
}
