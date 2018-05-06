import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'components';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

@provideHooks({
  fetch: async ({ store: { dispatch, getState } }) => {
    console.log(getState);
    if (!isAuthLoaded(getState())) {
      await dispatch(loadAuth()).catch(() => null);
    }
    if (!isInfoLoaded(getState())) {
      await dispatch(loadInfo()).catch(() => null);
    }
    if (!isHomeFilled(getState())) {
      await dispatch(fillHome(1)).catch(() => null);
    }
  }
})

@connect(state => ({
  online: state.online,
  home: state.home
}))
export default class Home extends Component {
  static propTypes = {
    home: PropTypes.arrayOf(PropTypes.object).isRequired,
    match: PropTypes.arrayOf(PropTypes.array).isRequired
  };

  state = {
    home: this.props.home.data,
    eventId: this.props.match.params.eventId
  }
  componentWillMount() {
    console.log(this.props);
    console.log(this.props.home.data[this.state.eventId], 'lols');
  }
  componentDidMount() {
    console.log(this.state.home);
    console.log('yes mounted');
  }
  render() {
    const { home } = this.props;
    const styles = require('./Home.scss');
    console.log(home, 'fuckssss');
    // require the logo image both from client and server
    return (
      <div className={styles.home}>
        <Helmet title="Home" />
        <div>
          <div className={styles.container}>
            {
              Object.keys(home.data).map((item => {
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
              }))
            }
          </div>
        </div>
      </div>
    );
  }
}
