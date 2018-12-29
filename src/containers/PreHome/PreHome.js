import React, { Component } from 'react';
import Footer from '../Footer/Footer';

export default class PreHome extends Component {
  render() {
    const styles = require('./PreHome.scss');
    return (
      <div className={styles.myFooter}>
        <div> MY PreHome Content goes here </div>
        <Footer />
      </div>
    );
  }
}
