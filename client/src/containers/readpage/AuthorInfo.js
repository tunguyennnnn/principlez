import React from 'react';

export default function AuthorInfo(props) {
  const { id, fullname, location, profileImage, yearOfBirth } = props;
  return (
    <div className="author">
      <div className="profile--image">
        {profileImage && <img src={profileImage.medium} />}
      </div>
      <div className="profile">
        <div className="fullname">{fullname}</div>
        <div className="location">{`${location.city} - ${
          location.country
        }`}</div>
      </div>
    </div>
  );
}
