import React from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import * as UserId from '../../utils/userId';

import { auth } from '../../services';

class Authorized extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  render() {
    const { userId, fullname } = auth.userProfile;
    return (
      <Dropdown
        isOpen={this.state.dropdownOpen}
        toggle={this.toggle}
        className="dropdown navbar-user"
        tag="li"
      >
        <DropdownToggle className="dropdown-toggle" tag="a">
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            alt=""
          />
          <span className="d-none d-md-inline">{fullname}</span>{' '}
          <b className="caret" />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu dropdown-menu-right" tag="ul">
          <DropdownItem>
            <Link to={`/of/${UserId.generateId(userId, fullname)}/stories`}>
              Stories
            </Link>
          </DropdownItem>
          <DropdownItem>
            <span className="badge badge-danger pull-right">2</span> Inbox
          </DropdownItem>
          <DropdownItem>
            <Link to={`/of/${UserId.generateId(userId, fullname)}`}>
              Profile
            </Link>
          </DropdownItem>
          <DropdownItem>Setting</DropdownItem>
          <div className="dropdown-divider" />
          <DropdownItem
            onClick={() => {
              auth.logout();
              document.location.href = '/';
            }}
          >
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

function Unauthorized() {
  return (
    <li>
      <a>
        <ol className="breadcrumb pull-right">
          <li className="breadcrumb-item">
            <Link to="/login">LOGIN</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/signup">SIGN UP</Link>
          </li>
        </ol>
      </a>
    </li>
  );
}

export default function User() {
  return auth.isUserLoginned() ? <Authorized /> : <Unauthorized />;
}
