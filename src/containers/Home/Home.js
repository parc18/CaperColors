import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cookie from 'js-cookie';
import { Card } from 'components';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { getEventsBycityIdandGameId as getSports } from 'redux/modules/home';

@connect(state => ({
  online: state.online,
  home: state.home
}))
export default class Home extends Component {
  static propTypes = {
    home: PropTypes.shape(Object).isRequired,
    dispatch: PropTypes.func.isRequired
    // match: PropTypes.arrayOf(PropTypes.array).isRequired
  };
  constructor(props) {
    super(props);
    this.selectSports = sportsId => {
      let cityId = 0;
      if (typeof cookie.get('city') !== 'undefined') {
        cityId = cookie.get('city');
      }
      this.props.dispatch(getSports(cityId, sportsId)).catch(() => null);
      this.setState({
        gameId: sportsId
      });
    };
  }
  state = {
    gameId: 0
  };
  render() {
    const { home } = this.props;
    const styles = require('./Home.scss');
    // require the logo image both from client and server
    return (
      <div className={styles.home}>
        <Helmet title="Home" />
        <div className={styles.gameFixed}>
          <div className={styles.selectGame}>
            <div className={`${styles.gameTypes} ${this.state.gameId === 0 ? styles.selectedGame : ''}`} role="presentation" onClick={() => this.selectSports(0)}>
              All
            </div>
            <div className={`${styles.gameTypes} ${this.state.gameId === 1 ? styles.selectedGame : ''}`} role="presentation" onClick={() => this.selectSports(1)}>
              Badminton
            </div>
            <div className={`${styles.gameTypes} ${this.state.gameId === 2 ? styles.selectedGame : ''}`} role="presentation" onClick={() => this.selectSports(2)}>
              Table Tennis
            </div>
          </div>
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
