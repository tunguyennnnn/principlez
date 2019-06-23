import React from 'react';
import { Link } from 'react-router-dom';

export default function ProfileHeader({
  fullname,
  occupation,
  profileImage,
  location,
  tabs = [],
  showTab,
  activeTab,
}) {
  return (
    <div className="profile">
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
          {tabs.map(tab => (
            <li
              className="nav-item"
              key={`profile-header-${tab.replace(/s+/, '')}`}
            >
              <Link
                className={'nav-link ' + (activeTab === tab ? 'active ' : '')}
                to="/extra/profile"
                onClick={e => {
                  e.preventDefault();
                  showTab(tab);
                }}
              >
                {tab}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
