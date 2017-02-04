import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import Helmet from 'react-helmet';
import { LinkContainer } from 'react-router-bootstrap';
import Button from 'react-bootstrap/lib/Button';
import $jquery from 'jquery';

export default class Welcome extends Component {

  handleJoin = (event) => {
    event.preventDefault();
    $jquery('#welcome').addClass('animated fadeOut');
    browserHistory.push('/signup');
  }

  render() {
    const styles = require('./Welcome.scss');
    return (
      <div
        id="welcome"
        className={styles.welcomeContainer}
      >
        <Helmet title="Welcome" />
        <video
          src="https://s3-us-west-1.amazonaws.com/travelr-california/travelr-welcome.mp4"
          playsinline
          autoPlay
          muted
          loop
          poster="https://s3-us-west-1.amazonaws.com/travelr-california/travelr-welcome-mp4-poster.png"
        >
        </video>
        <div className={styles.welcomeMessage + ' p20 animated fadeIn'}>
          <div>
            <h1>Travelr</h1>
            <h3>Explore. Wander. Grow.</h3>
            <LinkContainer to="/signup">
              <Button
                bsStyle="primary"
                bsSize="large"
                onClick={this.handleJoin}
              >
                Join
              </Button>
            </LinkContainer>
          </div>
        </div>
      </div>
    );
  }
}
