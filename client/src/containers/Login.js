import './login.scss';

import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link, Redirect } from 'react-router-dom';

import { auth } from '../services';

class Login extends React.Component {
  state = {
    inputs: {
      email: '',
      password: '',
    },
    signinSuccess: false,
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

      const { fullname, authToken } = response.data.login;
      const { token, expiresIn } = authToken;
      auth.login({ fullname, email, token, expiresIn });
      this.setState({ ...this.state, signinSuccess: true });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { signinSuccess } = this.state;
    if (signinSuccess) return <Redirect to="/" />;
    return (
      <div>
        <div className="login-page-container">
          <h2>Principlez</h2>
          <h4 className="login-sub-header">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </h4>
          <div className="login-content">
            <Form onSubmit={this.onSubmit}>
              <Form.Input
                placeholder="Email"
                name="email"
                icon="mail"
                iconPosition="left"
                onChange={this.onChange}
              />
              <Form.Input
                type="password"
                placeholder="Password"
                name="password"
                icon="lock open"
                iconPosition="left"
                onChange={this.onChange}
              />
              <Button className="login-button">LOGIN</Button>
            </Form>
            <h4 className="login-centered-header">Forgot password?</h4>
          </div>
        </div>
      </div>
    );
  }
}

const mutationLogin = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      fullname
      email
      authToken {
        token
        expiresIn
      }
    }
  }
`;

export default compose(graphql(mutationLogin, { name: 'login' }))(Login);
