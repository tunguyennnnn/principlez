import './profilepage/profilepage.scss';

import React from 'react';

import ProfileInfo from './profilepage/ProfileInfo';
import ProfileImage from './profilepage/ProfileImage';

export default function ProfilePage() {
  return (
    <div className="profile-page-container">
      <div className="profile-page-row">
        <div className="profile-page-column">
          <ProfileImage />
        </div>
        <div className="profile-page-double-column">
          <ProfileInfo />
        </div>
      </div>
      <div className="profile-page-row" />
    </div>
  );
}
