import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prefer-stateless-function
export default class Footer extends Component {
  render() {
    const style = require('./footer.scss');
    return (
      <footer className={style.footer}>
        <div>
          <div className={style.footerMenu}>
           <div> Delhi </div>
           <div> Bangalore </div>
           <div> Pune </div>
          </div>
          <div className={style.contentContainer}>
          	<div> About Us </div>
          	<div> About Us </div>
          	<div> About Us </div>
          	<div> About Us </div>
          </div>
          <div className={style.contentContainer}>
          	<div> Contact Us </div>
          </div>
          <div className={style.contentContainer}>
          	<div> Follow Us </div>
          </div>
          <div className={style.contentContainer}>
          	<div> Cities </div>
          </div>
        </div>
      </footer>
    );
  }
}
