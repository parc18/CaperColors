import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class Card extends Component {
  // eslint-disable-next-line react/prefer-stateless-function
  static propTypes = {
    name: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    date: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired
  };
  render() {
    const style = require('./card.scss');
    return (
      <Link to={`/eventdetails/${this.props.id}`}>
        <div className={style.box} id={this.props.index}>
          <div className={style.imgContainer}>
            <img className={style.eventImg} src={this.props.img} alt="EventImage" />
            <div className={style.eventName}>{this.props.name}</div>
            <div className={style.imgFilter} />
          </div>
          <div className={style.contentContainer}>
            <div>{this.props.city} |</div>
            <div>{this.props.date}</div>
            <div className={style.pdpDetails}>Details &#8594;</div>
          </div>
        </div>
      </Link>
    );
  }
}
