import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { provideHooks } from 'redial';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import * as qs from 'query-string';
import { isThankYouPage as thankedBefore, getThankYouPageStatus as pleaseThanks } from 'redux/modules/thankyou';

let txnId = null;

@provideHooks({
  fetch: async ({ store: { dispatch, getState }, location }) => {
    const orderId = qs.parse(location.search).id;
    txnId = qs.parse(location.search).transaction_id;
    if (!thankedBefore(getState())) {
      await dispatch(pleaseThanks(orderId)).catch(() => null);
    }
  }
})
@connect(state => ({
  online: state.online,
  // home: state.home,
  thankYouStatus: state.thankYouStatus
}))
export default class ThankYouPage extends Component {
  static propTypes = {
    thankYouStatus: PropTypes.arrayOf(PropTypes.array).isRequired
  };
  state = {
    thankYouStatus: this.props.thankYouStatus
  };
  render() {
    const styles = require('./ThankYouPage.scss');
    console.log(this.state);
    // require the logo image both from client and server
    return (
      <div className={styles.home}>
        <Helmet title="ThankYouPage" />
        <div className={styles.infobox}>
          {this.state.thankYouStatus &&
            this.state.thankYouStatus.data &&
            this.state.thankYouStatus.data === 'completed' && (
            <div className={styles.infoboxContent}>
              <div> Thank you for booking events with Khelacademy </div>
              <div> All the best </div>
              <div>Your TRANSACTION ID is : {txnId} </div>
              <img className={styles.thankyouImg} src="https://res.cloudinary.com/parc-india/image/upload/v1531665796/checkmark_rbbvmm.gif" alt="EventImage" />
            </div>
          )}
          { this.state.thankYouStatus &&
            this.state.thankYouStatus.error && <div> Your tickets are on its way, you will get a SMS notification. Your transaction id is {txnId} </div>}
        </div>
        <Link to="/">
          <button className={styles.nextButton}>Home &#8594;</button>
        </Link>
      </div>
    );
  }
}
