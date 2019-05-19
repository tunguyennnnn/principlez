import './signup/signup.scss';

import * as _ from 'lodash';
import React from 'react';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link, Redirect } from 'react-router-dom';

import Select from '../components/commons/Select';
import LargeButton from '../components/commons/Button';
import { ipLookUp } from '../services/userLocation';
import { auth } from '../services';
import MessageDisplayer from '../components/commons/MessageDisplayer';
import { yearsDropdown } from '../utils/yearsDropdown';

class SignUp extends React.Component {
  state = {
    inputs: {
      fullname: '',
      email: '',
      password: '',
      confirmPassword: '',
      yearOfBirth: '',
      country: '',
      city: '',
    },
    signupSuccess: null,
    message: '',
  };

  componentDidMount() {
    this.getUserLocation();
  }

  getUserLocation = async () => {
    const data = await ipLookUp();
    const { country_name, city } = data;
    const { state } = this;
    this.setState({
      ...state,
      inputs: {
        ...state.inputs,
        country: country_name,
        city: city,
      },
    });
  };

  onInputChange = (name, value) => {
    const { state } = this;
    this.setState({ ...state, inputs: { ...state.inputs, [name]: value } });
  };

  onSubmit = async () => {
    const {
      fullname,
      email,
      password,
      yearOfBirth,
      country,
      city,
    } = this.state.inputs;

    try {
      const response = await this.props.signup({
        variables: {
          fullname,
          email,
          password,
          yearOfBirth,
          country,
          city,
        },
      });

      const {
        data: { signup },
      } = response;

      const { error, user } = signup;

      if (error) {
        this.setState({ signupSuccess: false, message: error });
        return;
      }

      const { token, expiresIn } = user.authToken;
      auth.saveToken(token, expiresIn);
      this.setState({ signupSuccess: true });
    } catch (error) {
      console.log(error);
      this.setState({ signupSuccess: false, message: 'Something is wrong' });
    }
  };

  render() {
    const { signupSuccess, message, inputs } = this.state;
    if (signupSuccess) return <Redirect to="/" />;

    const messageComponent =
      signupSuccess === false ? (
        <MessageDisplayer type="error" header="Sign Up" message={message} />
      ) : null;

    const { country, city } = inputs;
    return (
      <div className="signup-page-container">
        <div className="signup-sub-container">
          {messageComponent}
          <h3>CREATE ACCOUNT</h3>
          <form className="signup-form" onSubmit={this.onSubmit}>
            <input
              name="fullname"
              placeholder="Full Name"
              onChange={event =>
                this.onInputChange(event.target.name, event.target.value)
              }
            />
            <input
              name="email"
              placeholder="Email"
              onChange={event =>
                this.onInputChange(event.target.name, event.target.value)
              }
            />
            <Select
              name="yearOfBirth"
              onChange={event =>
                this.onInputChange(event.target.name, event.target.value)
              }
              firstOption="Year of Birth"
              options={yearsDropdown}
            />
            <input name="country" placeholder="Country" value={country} />
            <input name="city" placeholder="City" value={city} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={event =>
                this.onInputChange(event.target.name, event.target.value)
              }
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Password Confirmation"
              onChange={event =>
                this.onInputChange(event.target.name, event.target.value)
              }
            />
            <LargeButton title="SIGN UP" onClick={this.onSubmit} />
          </form>
          <h4 className="signup-text">
            Already have an account? <Link to="/login">Sign In</Link>
          </h4>
        </div>
      </div>
    );
  }
}

const mutationSignUp = gql`
  mutation signup(
    $fullname: String!
    $email: String!
    $yearOfBirth: String!
    $password: String!
    $country: String!
    $city: String!
  ) {
    signup(
      fullname: $fullname
      email: $email
      yearOfBirth: $yearOfBirth
      password: $password
      location: { country: $country, city: $city }
    ) {
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

export default compose(graphql(mutationSignUp, { name: 'signup' }))(SignUp);
