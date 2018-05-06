import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LinkContainer } from 'react-router-bootstrap';

export default class Card extends Component {
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
      <div className={style.box} id={this.props.index}>
        <div >
          {this.props.name}
        </div>
        <img className={style.eventImg} src={this.props.img} alt="EventImage" />
        <div >
          {this.props.city} |
        </div>
        <div >
          {this.props.date}
        </div>
        <LinkContainer to={`/eventdetails/${this.props.id}`}>
          <div >
            Details &#8594;
          </div>
        </LinkContainer>
      </div>
    );
  }
}
