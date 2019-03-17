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

  login = ({ token, expiresIn, email, fullname }) => {
    window.localStorage.setItem('email', email);
    window.localStorage.setItem('fullname', fullname);
    this.expiresIn = Date.now() + expiresIn * 1000;
    window.localStorage.setItem('token', token);
    window.localStorage.setItem('expiresIn', this.expiresIn);
  };
}
