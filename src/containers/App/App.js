import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Helmet from 'react-helmet';
import { isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
import { push } from 'react-router-redux';
import config from '../../config';
import { asyncConnect } from 'redux-async-connect';
import { ColumnNavigation } from 'components';
import { Chat } from 'containers';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];

    if (!isInfoLoaded(getState())) {
      promises.push(dispatch(loadInfo()));
    }
    if (!isAuthLoaded(getState())) {
      promises.push(dispatch(loadAuth()));
    }

    return Promise.all(promises);
  }
}])
@connect(
  state => ({user: state.auth.user}),
  {logout, pushState: push})

export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.props.pushState('/');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState('/welcome');
    }
  }

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  };

  render() {
    const {user} = this.props;
    const styles = require('./App.scss');

    const renderNavbar = currentUser =>
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <IndexLink to="/" activeStyle={{color: '#33e0ff'}}>
              <div className={styles.brand}/>
              <span>{config.app.title}</span>
            </IndexLink>
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>

        <Navbar.Collapse eventKey={0}>
          {/* <Nav navbar>
            {currentUser && <LinkContainer to="/chat">
              <NavItem eventKey={1}>Chat</NavItem>
            </LinkContainer>}

            <LinkContainer to="/widgets">
              <NavItem eventKey={2}>Widgets</NavItem>
            </LinkContainer>
            <LinkContainer to="/pagination">
              <NavItem eventKey={3}>Pagination</NavItem>
            </LinkContainer>
            <LinkContainer to="/about">
              <NavItem eventKey={4}>About Us</NavItem>
            </LinkContainer>
          </Nav> */}
          <Nav navbar pullRight>
            {/* <NavItem eventKey={1} target="_blank" title="View on Github" href="https://github.com/erikras/react-redux-universal-hot-example">
              <i className="fa fa-github"/>
            </NavItem> */}
            {currentUser &&
            <p className={styles.loggedInMessage + ' navbar-text'}><strong>{currentUser.name}</strong></p>}
            {!currentUser &&
            <LinkContainer to="/signup">
              <NavItem eventKey={1}>Join</NavItem>
            </LinkContainer>}
            {!currentUser &&
            <LinkContainer to="/login">
              <NavItem eventKey={2}>Login</NavItem>
            </LinkContainer>}
            {currentUser &&
            <LinkContainer to="/logout">
              <NavItem eventKey={1} className="logout-link" onClick={this.handleLogout}>
                Logout
              </NavItem>
            </LinkContainer>}
          </Nav>
        </Navbar.Collapse>
      </Navbar>;

    return (
      <div className={styles.app}>
        <Helmet {...config.app.head}/>
        {renderNavbar(user)}
        {user && <Row>
          <Col
            md={2}
            xs={3}
            className={styles.navColumn}
          >
            <ColumnNavigation />
          </Col>
          <Col
            xs={12}
            md={8}
            mdOffset={2}
            className={styles.appContent}
          >
            {this.props.children}
          </Col>
          <Col
            md={2}
            xs={3}
            className={styles.chatColumn}
          >
            <Chat />
          </Col>
        </Row>}
        {!user && this.props.children}
      </div>
    );
  }
}
