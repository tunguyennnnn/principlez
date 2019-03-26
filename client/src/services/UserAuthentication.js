import { generateId } from '../utils/userId';

export default class Auth {
  saveToken(token, expiresIn) {
    this.expiresIn = Date.now() + expiresIn * 1000;
    window.localStorage.setItem('token', token);
    window.localStorage.setItem('expiresIn', this.expiresIn);
  }

  isUserLoginned() {
    const token = window.localStorage.getItem('token');
    const expiresIn = window.localStorage.getItem('expiresIn');
    return token && expiresIn && Number(expiresIn) > Date.now();
  }

  login = ({ token, expiresIn, id, email, fullname }) => {
    window.localStorage.setItem('userId', id);
    window.localStorage.setItem('email', email);
    window.localStorage.setItem('fullname', fullname);
    this.expiresIn = Date.now() + expiresIn * 1000;
    window.localStorage.setItem('token', token);
    window.localStorage.setItem('expiresIn', this.expiresIn);
  };

  get userProfile() {
    const { userId, fullname, email } = window.localStorage;
    return { userId, fullname, email };
  }

  get userProfileLink() {
    if (this.isUserLoginned()) {
      const { userId, fullname } = this.userProfile;
      return '/of/' + generateId(userId, fullname);
    }

    return '/login';
  }

  get userStoriesLink() {
    if (this.isUserLoginned()) {
      const { userId, fullname } = this.userProfile;
      return '/of/' + generateId(userId, fullname) + '/stories';
    }
    return '/login';
  }
}
