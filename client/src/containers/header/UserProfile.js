import React, { useState } from 'react';
import { Menu, Image, Card } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { isBrowser } from 'react-device-detect';

import * as UserId from '../../utils/userId';
import { auth } from '../../services';

function Trigger({ src }) {
  return (
    <Menu.Item>
      <Image src={src} avatar />
      Me
    </Menu.Item>
  );
}

function Profile({ fullname, email, userId }) {
  return (
    <div class="profile-container">
      <div class="card-container">
        <Card>
          <Card.Content>
            <Card.Header>{fullname}</Card.Header>
            <Card.Meta>
              <span className="date">Joined in 2015</span>
            </Card.Meta>
            <Card.Description>{email}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a href={`/of/${UserId.generateId(userId, fullname)}`}>
              My Profile
            </a>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}

function profileStateClick(profileState) {
  const { showProfile, shouldNavigate } = profileState;
  if (!showProfile) {
    return { showProfile: true, shouldNavigate };
  }
  return { showProfile, shouldNavigate: true };
}

export default function UserProfile() {
  const [profileState, updateProfileState] = useState({
    shouldNavigate: false,
    showProfile: false,
  });

  const { showProfile, shouldNavigate } = profileState;
  const { userId, fullname, email } = auth.userProfile;
  if (shouldNavigate) {
    return <Redirect to={`/of/${UserId.generateId(userId, fullname)}`} />;
  }

  return (
    <div
      class="header-userprofile-container"
      onMouseEnter={() =>
        isBrowser &&
        updateProfileState({
          ...profileState,
          showProfile: true,
        })
      }
      onMouseLeave={() => {
        isBrowser &&
          updateProfileState({
            ...profileState,
            showProfile: false,
          });
      }}
      onClick={() => updateProfileState(profileStateClick(profileState))}
    >
      <Trigger src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" />
      {showProfile && (
        <Profile email={email} fullname={fullname} userId={userId} />
      )}
    </div>
  );
}
