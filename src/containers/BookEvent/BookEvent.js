import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import { getEventsPrices as prices } from 'redux/modules/bookevent';
import gameconfig from '../../../config/gameconfig';

@provideHooks({
  fetch: async ({ store: { dispatch }, match }) => {
    await dispatch(prices(match[1].match.params.eventId)).catch(() => null);
  }
})
@connect(state => ({
  online: state.online,
  bookingPrices: state.bookingPrices
}))
export default class BookEvent extends Component {
  static propTypes = {
    bookingPrices: PropTypes.arrayOf(PropTypes.array).isRequired
  };
  render() {
    const styles = require('./BookEvent.scss');
    const firstValue = Object.values(this.props.bookingPrices.data)[0];
    console.log('firstValue: ', firstValue);
    // require the logo image both from client and server
    return (
      <div className={styles.home}>
        <Helmet title="Home" />
        <div>
          <div className={styles.container}>
            <div className={styles.selectGameType}>
              {Object.keys(this.props.bookingPrices.data).map((item, index) => {
                if (typeof item !== 'undefined') {
                  return <span>{gameconfig[item]}</span>;
                }
                return null;
              })}
            </div>
            <div>
              {Object.values(this.props.bookingPrices.data)[0].map((item, index) => {
                if (typeof item !== 'undefined') {
                  <div>
                    <span>{item.name}</span>
                    <span>{item.desc}</span>
                  </div>;
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
