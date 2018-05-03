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
  }
  render() {
    const { home } = this.props;
    const styles = require('./EventDescription.scss');
    console.log(home, 'fuckssss');
    // require the logo image both from client and server
    return (
      <div className={styles.home}>
        <Helmet title="Home" />
        <div>
          <div className={styles.container}>
            <img src={this.state.home.eventImgUrl} alt="event" />
            <div className="mccc">
              {this.state.home.eventName}
            </div>
            <div className="mccc">
              {this.state.home.eventVenue}
            </div>
            <div className="mccc">
              {this.state.home.date}
            </div>
            <div className="mccc">
              {this.state.home.price}
            </div>
            <div className="mccc">
              {this.state.home.description}
            </div>
            <button>
              Book Now &#8594;
            </button>
          </div>
        </div>
      </div>
    );
  }
}
