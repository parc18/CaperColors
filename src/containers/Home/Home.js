import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'components';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

@connect(state => ({
  online: state.online,
  home: state.home
}))
export default class Home extends Component {
  static propTypes = {
    home: PropTypes.shape(Object).isRequired
    // match: PropTypes.arrayOf(PropTypes.array).isRequired
  };
  render() {
    const { home } = this.props;
    const styles = require('./Home.scss');
    // require the logo image both from client and server
    return (
      <div className={styles.home}>
        <Helmet title="Home" />
        <div className={styles.selectGame}>
          <span>All</span>
          <span>Badminton</span>
          <span>Table Tennis</span>
          <span>Football</span>
          <span>Cricket</span>
        </div>
        <div>
          <div className={styles.container}>
            {home &&
              typeof home !== 'undefined' &&
              home.data &&
              typeof home.data !== 'undefined' &&
              Object.keys(home.data).map(item => {
                if (typeof item !== 'undefined') {
                  return (
                    <Card
                      name={home.data[item].eventName}
                      img={home.data[item].eventImgUrl}
                      city={home.data[item].city}
                      date={home.data[item].date}
                      index={home.data[item].eventId}
                      key={home.data[item].eventId}
                      id={home.data[item].eventId}
                    />
                  );
                }
                return null;
              })}
          </div>
        </div>
      </div>
    );
  }
}
