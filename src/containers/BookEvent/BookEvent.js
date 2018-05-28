import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import { getEventsPrices as prices } from 'redux/modules/bookevent';

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
    // require the logo image both from client and server
    return (
      <div className={styles.home}>
        <Helmet title="Home" />
        <div>
          <div className={styles.container}>
            {Object.keys(this.props.bookingPrices.data).map((item, index) => {
              if (typeof item !== 'undefined') {
                return (
                  <div>
                    {' '}
                    {item} {index}
                  </div>
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
