import './signup/signup.scss';

import * as _ from 'lodash';
import moment from 'moment';
import React from 'react';
import { Form, Grid, Header, Image, Button } from 'semantic-ui-react';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link, Redirect } from 'react-router-dom';

import SideImage from './images/img1.png';
import { ipLookUp } from '../utils/userLocation';
import { auth } from '../services';
import MessageDisplayer from '../components/commons/MessageDisplayer';

const listOfYears = () => {
  const now = moment().year();
  const years = _.range(now, now - 100, -1);
  return _.map(years, year => ({ value: String(year), text: String(year) }));
};

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
      <Grid className="signup-grid">
        <Grid.Row className="signup-row">
          <Grid.Column className="signup-column-left" largeScreen={6}>
            <Image className="signup-image" src={SideImage} />
          </Grid.Column>
          <Grid.Column
            className="signup-column-right-container"
            largeScreen={10}
            verticalAlign="middle"
            mobile={16}
          >
            <div className="signup-column-right">
              {messageComponent}
              <h3 className="signup-header-main">CREATE ACCOUNT</h3>
              <Form className="signup-form" width={8} onSubmit={this.onSubmit}>
                <Form.Input
                  placeholder="Full Name"
                  name="fullname"
                  icon="user"
                  iconPosition="left"
                  onChange={event =>
                    this.onInputChange(event.target.name, event.target.value)
                  }
                />
                <Form.Input
                  placeholder="Email"
                  name="email"
                  icon="mail"
                  iconPosition="left"
                  onChange={event =>
                    this.onInputChange(event.target.name, event.target.value)
                  }
                />
                <Form.Dropdown
                  placeholder="Year of Birth"
                  name="yearOfBirth"
                  options={listOfYears()}
                  selection
                  onChange={(event, data) =>
                    this.onInputChange('yearOfBirth', data.value)
                  }
                />
                <Form.Input
                  placeholder="Country"
                  value={country}
                  name="country"
                />
                <Form.Input placeholder="City" value={city} name="city" />
                <Form.Input
                  type="password"
                  placeholder="Password"
                  name="password"
                  icon="lock open"
                  iconPosition="left"
                  onChange={event =>
                    this.onInputChange(event.target.name, event.target.value)
                  }
                />
                <Form.Input
                  type="password"
                  placeholder="Password Confirmation"
                  name="confirmPassword"
                  icon="lock open"
                  iconPosition="left"
                  onChange={event =>
                    this.onInputChange(event.target.name, event.target.value)
                  }
                />
                <Button className="signup-button" size="large">
                  SIGN UP
                </Button>
              </Form>
              <Header className="signup-header" as="h4">
                Already have an account? <Link to="/login">Sign In</Link>
              </Header>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
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
