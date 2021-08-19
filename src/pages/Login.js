import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as userAction from '../actions/index';
import '../css/Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isDisabled: true,
      shouldRedirectToWallet: false,
    };
    this.shouldEnableButton = this.shouldEnableButton.bind(this);
    this.redirectToWallet = this.redirectToWallet.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value }, () => this.shouldEnableButton());
  }

  verifyEmail(email) {
    const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    return emailRegex.test(email);
  }

  shouldEnableButton() {
    const { email, password } = this.state;
    const minValue = 6;
    if (this.verifyEmail(email) && password.length >= minValue) {
      return this.setState({ isDisabled: false });
    }
    return this.setState({ isDisabled: true });
  }

  redirectToWallet() {
    const { saveEmail } = this.props;
    const { email } = this.state;
    saveEmail(email);
    this.setState({
      shouldRedirectToWallet: true,
    });
  }

  render() {
    const { isDisabled, shouldRedirectToWallet } = this.state;
    return (
      <div className="login-container">
        <label htmlFor="email">
          Email
          <input
            name="email"
            type="email"
            id="email"
            data-testid="email-input"
            onChange={ this.handleChange }
            className="login-inputs"
          />
        </label>
        {' '}
        <br />
        {' '}
        <br />
        <label htmlFor="password">
          Senha
          <input
            name="password"
            type="password"
            id="password"
            data-testid="password-input"
            onChange={ this.handleChange }
            className="login-inputs"
          />
        </label>
        {' '}
        <br />
        {' '}
        <br />
        <button
          type="button"
          disabled={ isDisabled }
          onClick={ () => this.redirectToWallet() }
          className="button-login"
        >
          Entrar
        </button>
        <span>{ shouldRedirectToWallet ? <Redirect to="/carteira" /> : <div /> }</span>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({ // mapeia as minha ações que serão disparadas
  saveEmail: (email) => dispatch(userAction.login(email)),
});

Login.propTypes = {
  saveEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
