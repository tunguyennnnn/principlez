import React, { useState, useEffect } from 'react';

import { auth } from '../../services';
import HeaderDropdown from './HeaderDropdown';

function UserAvatar(props) {
  const { fullname, onClick = null } = props;
  return (
    <div className="avatar-container">
      <img
        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
        alt="Avatar"
        className="header-image"
        onClick={onClick}
      />
      <span>{fullname}</span>
    </div>
  );
}

export default function UserProfile() {
  const { fullname } = auth.userProfile;

  const [isDropdownVisible, setDropdownVisibility] = useState(false);
  const myRef = document.querySelector('#root');

  const clickOutsideToHideDropdown = event => {
    if (myRef && myRef.contains(event.target)) {
      setDropdownVisibility(false);
    }
  };

  const clickToShowDropdown = () => {
    if (!isDropdownVisible) {
      setDropdownVisibility(true);
    }
  };

  useEffect(() => {
    document.addEventListener('click', clickOutsideToHideDropdown);
    return () => {
      document.removeEventListener('click', clickOutsideToHideDropdown);
    };
  });

  return (
    <span className="user-profile-container">
      {isDropdownVisible && (
        <div>
          <UserAvatar fullname={fullname} />
          <HeaderDropdown />
        </div>
      )}
      {!isDropdownVisible && (
        <UserAvatar fullname={fullname} onClick={clickToShowDropdown} />
      )}
    </span>
  );
}
