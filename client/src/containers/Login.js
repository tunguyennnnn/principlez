import './login/login.scss';

import React from 'react';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link, Redirect } from 'react-router-dom';

import { auth } from '../services';
import MessageDisplayer from '../components/commons/MessageDisplayer';
import LargeButton from '../components/commons/Button';

class Login extends React.Component {
  state = {
    inputs: {
      email: '',
      password: '',
    },
    signinSuccess: null,
    message: '',
  };

  onChange = event => {
    const { name, value } = event.target;
    const { inputs } = this.state;
    this.setState({ ...this.state, inputs: { ...inputs, [name]: value } });
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
        this.setState({ signinSuccess: false, message: error });
        return;
      }

      const { id, fullname, authToken } = user;
      const { token, expiresIn } = authToken;
      auth.login({ id, fullname, email, token, expiresIn });

      this.setState({ signinSuccess: true });
    } catch (error) {
      this.setState({ signinSuccess: false, message: 'Something is wrong' });
      console.log(error);
    }
  };

  render() {
    const { signinSuccess, message } = this.state;
    if (signinSuccess) return <Redirect to="/" />;
    return (
      <div className="login-page-container">
        <div className="login-sub-container">
          {message ? (
            <MessageDisplayer type="error" message={message} header="Log In" />
          ) : null}
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
