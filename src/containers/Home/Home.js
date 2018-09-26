import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cookie from 'js-cookie';
import { Card } from 'components';
import { Footer } from 'components';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { getEventsBycityIdandGameId as getSports } from 'redux/modules/home';
import { getAllSports as getActiveSports } from 'redux/modules/sports';

@connect(state => ({
  online: state.online,
  home: state.home,
  sports: state.sports
}))
export default class Home extends Component {
  static propTypes = {
    home: PropTypes.shape(Object).isRequired,
    dispatch: PropTypes.func.isRequired,
    sports: PropTypes.shape(Object).isRequired
    // match: PropTypes.arrayOf(PropTypes.array).isRequired
  };
  constructor(props) {
    super(props);
    this.props.dispatch(getActiveSports()).catch(() => null);
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
    const { home, sports } = this.props;
    const styles = require('./Home.scss');
    // require the logo image both from client and server
    return (
      <div>
        <div className={styles.home}>
          <Helmet title="Home" />
          <div className={styles.gameFixed}>
            <div className={styles.selectGame}>
              <div className={`${styles.gameTypes} ${this.state.gameId === 0 ? styles.selectedGame : ''}`} role="presentation" onClick={() => this.selectSports(0)}>
                All
              </div>
                { sports && sports.data && typeof sports.data !== 'undefined' && Object.keys(sports.data).map((index,item) => {
                  if (typeof item !== 'undefined') {
                    return (
                      <div className={`${styles.gameTypes} key=${sports.data[index].sportsId} ${this.state.gameId === sports.data[index].sportsId ? styles.selectedGame : ''}`} role="presentation" onClick={() => this.selectSports(sports.data[index].sportsId)}>
                        {sports.data[index].sportsName}
                      </div>
                    )
                  }
                  return null;
                })}
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
      </div>
    );
  }
}
