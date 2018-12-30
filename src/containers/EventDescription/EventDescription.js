import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { edpTime } from '../../helpers/timeConverter';
import Footer from '../Footer/Footer';

@connect(state => ({
  online: state.online,
  home: state.home
}))
export default class EventDescription extends Component {
  static propTypes = {
    home: PropTypes.objectOf(PropTypes.any).isRequired,
    match: PropTypes.objectOf(PropTypes.any).isRequired
  };
  state = {
    home: this.props.home.data[this.props.match.params.eventId],
    pageType: 'EDP'
  };
  createMarkup() {
    return { __html: this.state.home.description };
  }
  render() {
    const styles = require('./EventDescription.scss');
    // require the logo image both from client and server
    return (
      <div className={styles.home}>
        <Helmet title="Home" />
        <div>
          <div className={styles.parentContainer}>
            <div className={styles.eventImgContainer}>
              <img className={styles.eventDescImg} src={this.state.home.eventImgUrl} alt="EventImage" />
              <div className={styles.imgFilter} />
            </div>
            <div className={styles.container}>
              <div className={`${styles.custPad}`}>
                <div className={styles.eventNamebox}>{this.state.home.eventName}</div>
              </div>
              <div className={`${styles.details}`}>
                <span className={styles.box}><img src="https://res.cloudinary.com/parc-india/image/upload/v1546125232/address_t0jaac.png" alt="venue_logo" /> </span>
                {this.state.home.eventVenue}
              </div>
              <div className={`${styles.details}`}>
                <span className={styles.box}><img src="https://res.cloudinary.com/parc-india/image/upload/v1546125233/calender_xcar5s.png" alt="venue_logo" /> </span>
                {edpTime(this.state.home.date)}, {this.state.home.timings}
              </div>
              <div className={`${styles.details}`}>
                <span className={styles.box}><img src="https://res.cloudinary.com/parc-india/image/upload/v1546125233/ticket_ayncwd.png" alt="venue_logo" /> </span>
                Rs {this.state.home.price} onwards
              </div>
              <div className={styles.details}>
                <span className={styles.box}><img src="https://res.cloudinary.com/parc-india/image/upload/v1546125233/phone_dcmak4.png" alt="venue_logo" /> </span>
                Contact No : {this.state.home.phone}
              </div>
              <div className={styles.socialContainer}>
                <a href={`whatsapp://send?text=https://www.khelacademy.com/eventdetails/${this.state.home.eventId}`} data-action="share/whatsapp/share">
                  <span className={styles.social}><img src="https://res.cloudinary.com/parc-india/image/upload/v1546123547/facebook_sbnwat.png" alt="venue_logo" /> </span>
                </a>
                <span className={styles.social}><img src="https://res.cloudinary.com/parc-india/image/upload/v1546123547/whatsapp_hptzmq.png" alt="venue_logo" /> </span>
                <span className={styles.social}><img src="https://res.cloudinary.com/parc-india/image/upload/v1546123547/twitter_nre5f7.png" alt="venue_logo" /> </span>
                <span className={styles.social}><img src="https://res.cloudinary.com/parc-india/image/upload/v1546123547/instagram_eugbkr.png" alt="venue_logo" /> </span>
              </div>
              <div className={styles.buttonsTop}>
                <Link to={`/bookevent/${this.state.home.eventId}`}>
                  <button className={styles.eventBookStickyBtn}>Book Now &#8594;</button>
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.eventDesc} dangerouslySetInnerHTML={this.createMarkup()} />
          <div className={styles.buttonsBottom}>
            <Link to={`/bookevent/${this.state.home.eventId}`}>
              <button className={styles.eventBookStickyBtn}>Book Now &#8594;</button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
