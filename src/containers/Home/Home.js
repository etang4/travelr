import React, { Component } from 'react';
// import { Link } from 'react-router';
// import { CounterButton } from 'components';
// import config from '../../config';
import Helmet from 'react-helmet';
import {Chart} from 'react-google-charts';

export default class Home extends Component {

  render() {
    const styles = require('./Home.scss');
    // require the logo image both from client and server
    // const logoImage = require('./logo.png');
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
              rgba(0, 0, 0, 0.6),
              rgba(0, 0, 0, 0.3)),
              url('${randomFact.backgroundImage}') no-repeat`
          }}
        >
          <div className="row">
            {/* <div className={styles.logo}>
              <p>
                <img src={logoImage}/>
              </p>
            </div> */}
            <h1>{randomFact.cityName}</h1>
            <h2>{randomFact.fact}</h2>
          </div>
        </div>

        <div className="container">
          <div className={"my-pretty-chart-container"}>
            <Chart
              chartType="GeoMap"
              data={[
                ['Country', 'Popularity'],
                ['Germany', 200],
                ['United States', 300],
                ['Brazil', 400],
                ['Canada', 500],
                ['France', 600],
                ['RU', 700]
              ]}
              options={{'dataMode': 'regions'}}
              graph_id="GeoMap"
              width="100%"
              height="400px"
              legend_toggle
             />
          </div>
        </div>
      </div>
    );
  }
}
