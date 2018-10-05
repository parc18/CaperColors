import React, { Component } from 'react';

export default class Intro extends Component {
  render() {
    const styles = require('./Home.scss');
    return <div className={styles.IntroTop}>Got talents on courts? You'll love us!</div>;
  }
}
