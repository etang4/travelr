import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import Col from 'react-bootstrap/lib/Col';
import * as authActions from 'redux/modules/auth';

@connect(
  state => ({user: state.auth.user}),
  authActions)
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const input = this.refs.username;
    this.props.login(input.value);
    input.value = '';
  }

  render() {
    const {user, logout} = this.props;
    const styles = require('./Login.scss');
    return (
      <div className={styles.loginPage + ' container'}>
        <Col
          md={4}
          mdOffset={4}
          className="p20 animated fadeInDown"
        >
          <Helmet title="Login"/>
          <h1>Login</h1>
          {!user &&
          <div>
            <form className="login-form form-inline" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  ref="username"
                  placeholder="Username"
                  className="form-control"
                />
                <input
                  type="password"
                  ref="password"
                  placeholder="Password"
                  className="mt10 form-control"
                />
              </div>
              <button
                className="mt10 btn btn-success"
                onClick={this.handleSubmit}
              >
                <i className="fa fa-sign-in"/>{' '}Log In
              </button>
            </form>
          </div>
          }
          {user &&
          <div>
            <p>You are currently logged in as {user.name}.</p>

            <div>
              <button className="btn btn-danger" onClick={logout}><i className="fa fa-sign-out"/>{' '}Log Out</button>
            </div>
          </div>
          }
        </Col>
      </div>
    );
  }
}
