import React from 'react';
import { Link } from 'react-router-dom';

export default function ProfileHeader({
  fullname,
  occupation,
  profileImage,
  location,
}) {
  return (
    <div className="profile-header">
      <div className="profile-header-cover" />
      <div className="profile-header-content">
        <div className="profile-header-img">
          <img src={profileImage.medium} alt="" />
        </div>
        <div className="profile-header-info">
          <h4 className="m-t-10 m-b-5">{fullname}</h4>
          <p className="m-b-10">{occupation}</p>
          <p className="m-b-10">{location.city}</p>
          <Link to="/extra/profile" className="btn btn-xs btn-yellow">
            Edit Profile
          </Link>
        </div>
      </div>
      <ul className="profile-header-tab nav nav-tabs">
        <li className="nav-item">
          <Link to="/extra/profile" onClick={e => this.showTab(e, 'post')}>
            POSTS
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/extra/profile" onClick={e => this.showTab(e, 'about')}>
            ABOUT
          </Link>
        </li>
      </ul>
    </div>
  );
}
