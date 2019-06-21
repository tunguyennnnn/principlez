import './login/login.scss';

import React from 'react';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import { PageSettings } from '../config/page-settings';

import { auth } from '../services';
import LargeButton from '../components/commons/Button';
import Notification from '../components/commons/Notification';

class Login extends React.Component {
  static contextType = PageSettings;
  state = {
    inputs: {
      email: '',
      password: '',
    },
  };

  componentDidMount() {
    this.context.handleSetPageSidebar(false);
    this.context.handleSetPageHeader(false);
  }

  componentWillUnmount() {
    this.context.handleSetPageSidebar(true);
    this.context.handleSetPageHeader(true);
  }

  onChange = event => {
    const { name, value } = event.target;
    const { inputs } = this.state;
    this.setState({ ...this.state, inputs: { ...inputs, [name]: value } });
  };

  showErrorMessage = (type, title, message) => {
    this.props.notificationDOMRef.current.addNotification({
      insert: 'top',
      container: 'top-right',
      animationIn: ['animated', 'fadeIn'],
      animationOut: ['animated', 'fadeOut'],
      dismiss: { duration: 2000 },
      dismissable: { click: true },
      content: <Notification type={type} title={title} message={message} />,
    });
  };

  onSubmit = async () => {
    try {
      const { email, password } = this.state.inputs;

      const response = await this.props.login({
        variables: {
          email,
          password,
        },
      });

      const { error, user } = response.data.login;

      if (error) {
        this.showErrorMessage('error', 'Login error', error);
        return;
      }

      const { id, fullname, authToken } = user;
      const { token, expiresIn } = authToken;
      auth.login({ id, fullname, email, token, expiresIn });

      document.location.href = '/';
    } catch (error) {
      this.showErrorMessage('error', 'Login error', error);
    }
  };

  render() {
    return (
      <div className="login-page-container">
        <div className="login-sub-container">
          <h4>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </h4>
          <form className="login-form" onSubmit={this.onSubmit}>
            <input name="email" placeholder="Email" onChange={this.onChange} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={this.onChange}
            />
            <LargeButton title="LOG IN" onClick={this.onSubmit} />
          </form>
          <h4 className="login-text">Forgot password?</h4>
        </div>
      </div>
    );
  }
}

const mutationLogin = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      error
      user {
        id
        fullname
        email
        authToken {
          token
          expiresIn
        }
      }
    }
  }
`;

export default compose(graphql(mutationLogin, { name: 'login' }))(Login);
