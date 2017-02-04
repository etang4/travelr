import React, { Component } from 'react';
// import { Link } from 'react-router';
// import { CounterButton } from 'components';
// import config from '../../config';
import Helmet from 'react-helmet';

export default class Home extends Component {

  render() {
    const styles = require('./Home.scss');
    // require the logo image both from client and server
    const logoImage = require('./logo.png');
    const randomFact = {
      cityName: 'Santa Monica, California, USA',
      fact: 'Long inhabited by the Tongva people, Santa Monica was called Kecheek in the Tongva language',
      backgroundImage: 'https://midestination.wpengine.com/wp-content/themes/destination-pages-client/img/hero-santa-monica.jpg'
    };
    return (
      <div className={styles.home}>
        <Helmet title="Home"/>
        <div
          className={styles.masthead}
          style={{
            'background': `linear-gradient(0deg,
              rgba(0, 0, 0, 0.8),
              rgba(0, 0, 0, 0.4)),
              url('${randomFact.backgroundImage}') no-repeat`
          }}
        >
          <div className="row">
            <div className={styles.logo}>
              <p>
                <img src={logoImage}/>
              </p>
            </div>
            <h1>{randomFact.cityName}</h1>
            <h2>{randomFact.fact}</h2>
          </div>
        </div>

        <div className="container">
        </div>
      </div>
    );
  }
}
