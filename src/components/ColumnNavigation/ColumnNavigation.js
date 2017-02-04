import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import Button from 'react-bootstrap/lib/Button';

export default class ColumnNavigation extends Component {

  render() {
    const styles = require('./ColumnNavigation.scss');
    return (
      <div className={styles.columnNavigationContainer}>
        <LinkContainer to="/chat">
          <Button
            bsStyle="primary"
            bsSize="large"
            block
          >
            My World
          </Button>
      </LinkContainer>
        <LinkContainer to="/widgets">
          <Button
            bsStyle="primary"
            bsSize="large"
            block
          >
            My Adventures
          </Button>
        </LinkContainer>
      </div>
    );
  }
}
