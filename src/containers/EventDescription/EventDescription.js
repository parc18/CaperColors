import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { edpTime } from '../../helpers/timeConverter';

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
              <div className={styles.eventName}>{this.state.home.eventName}</div>
              <div className={styles.imgFilter} />
            </div>
            <div className={styles.container}>
              <div className={`${styles.details} ${styles.bott}`}>
                <span className={styles.box} />
                {this.state.home.eventVenue}
              </div>
              <div className={`${styles.details} ${styles.bott}`}>
                <span className={styles.box} />
                {edpTime(this.state.home.date)}, {this.state.home.timings}
              </div>
              <div className={`${styles.details} ${styles.bott}`}>
                <span className={styles.box} />
                Rs {this.state.home.price} onwards
              </div>
              <div className={styles.details}>
                <span className={styles.box} />
                Contact No : {this.state.home.phone}
              </div>
            </div>
          </div>
          <div className={styles.buttonsTop}>
            <a href={`whatsapp://send?text=https://www.khelacademy.com/eventdetails/${this.state.home.eventId}`} data-action="share/whatsapp/share">
              <button className={styles.eventShareStickyBtn}>Share</button>
            </a>
            <Link to={`/bookevent/${this.state.home.eventId}`}>
              <button className={styles.eventBookStickyBtn}>Register Now &#8594;</button>
            </Link>
          </div>
          <div className={styles.eventDesc} dangerouslySetInnerHTML={this.createMarkup()} />
          <div className={styles.buttonsBottom}>
            <a href={`whatsapp://send?text=https://www.khelacademy.com/eventdetails/${this.state.home.eventId}`} data-action="share/whatsapp/share">
              <button className={styles.eventShareStickyBtn}>Share</button>
            </a>
            <Link to={`/bookevent/${this.state.home.eventId}`}>
              <button className={styles.eventBookStickyBtn}>Register Now &#8594;</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
