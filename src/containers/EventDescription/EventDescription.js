import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Helmet from 'react-helmet';
import { connect } from 'react-redux';

@connect(state => ({
  online: state.online,
  home: state.home
}))
export default class EventDescription extends Component {
  static propTypes = {
    home: PropTypes.arrayOf(PropTypes.object).isRequired,
    match: PropTypes.arrayOf(PropTypes.array).isRequired
  };
  state = {
    home: this.props.home.data[this.props.match.params.eventId]
  };
  render() {
    const styles = require('./EventDescription.scss');
    // require the logo image both from client and server
    return (
      <div className={styles.home}>
        <Helmet title="Home" />
        <div>
          <div className={styles.container}>
            <div className={styles.eventImgContainer}>
              <img className={styles.eventDescImg} src={this.state.home.eventImgUrl} alt="EventImage" />
              <div className={styles.eventName}>{this.state.home.eventName}</div>
              <div className={styles.imgFilter} />
            </div>
            <div className="mccc">{this.state.home.eventVenue}</div>
            <div className="mccc">{this.state.home.date}</div>
            <div className="mccc">{this.state.home.price}</div>
            <div className="mccc">{this.state.home.description}</div>
            <button className={styles.eventBookStickyBtn}>Book Now &#8594;</button>
          </div>
        </div>
      </div>
    );
  }
}
