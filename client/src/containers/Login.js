import './login.scss';

import React from 'react';
import { Grid, Form, Button } from 'semantic-ui-react';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link, Redirect } from 'react-router-dom';

import { auth } from '../services';
import MessageDisplayer from '../components/commons/MessageDisplayer';

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

      const { fullname, authToken } = user;
      const { token, expiresIn } = authToken;
      auth.login({ fullname, email, token, expiresIn });

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
      <Grid className="login-grid">
        <Grid.Row className="login-row">
          <Grid.Column className="login-column">
            {message ? (
              <MessageDisplayer
                type="error"
                message={message}
                header="Log In"
              />
            ) : null}
            <h4>
              Don't have an account? <Link to="/signup">Sign up</Link>
            </h4>
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
            <h4 className="login-centered-text">Forgot password?</h4>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const mutationLogin = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      error
      user {
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
