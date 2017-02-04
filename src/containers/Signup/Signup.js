import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { initialize } from 'redux-form';
import { SignupForm } from 'components';
import Col from 'react-bootstrap/lib/Col';

@connect(
  () => ({}),
  {initialize})
export default class Signup extends Component {
  static propTypes = {
    initialize: PropTypes.func.isRequired
  }

  handleSubmit = (data) => {
    window.alert('Data submitted! ' + JSON.stringify(data));
    this.props.initialize('signup', {});
  }

  render() {
    const styles = require('./Signup.scss');

    return (
      <div className={styles.signupContainer + ' row'}>
        <Col
          md={4}
          mdOffset={4}
          className="p20 animated fadeInDown"
        >
          <h1 className="alignCenter">Share your Adventures</h1>
          <Helmet title="Signup"/>
          <SignupForm onSubmit={this.handleSubmit}/>
        </Col>
      </div>
    );
  }
}
