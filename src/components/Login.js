import React from 'react';
import { withRouter } from 'react-router-dom';
import api from '../utils/Api';
import '../blocks/login/login.css';
import AuthorizeUser from './AuthorizeUser';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'Email',
      password: 'Password',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.email || !this.state.password) {
      return;
    }
    api
      .authorize(this.state.email, this.state.password)
      .then((data) => {
        if (data.jwt) {
          this.setState({ email: '', password: '' }, () => {
            this.props.handleLogin();
            this.props.history.push('/signin');
          });
        }
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <AuthorizeUser title='Log in' handleChange={this.handleChange} handleSubmit={this.handleSubmit} text='Not a member yet? Sign up here!'/>
    );
  }
}

export default withRouter(Login);
