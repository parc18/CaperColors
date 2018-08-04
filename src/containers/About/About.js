import React, { Component } from 'react';
// eslint-disable-next-line react/prefer-stateless-function
export default class Card extends Component {
  render() {
    const styles = require('./About.scss');
    return (
      <div className={styles.allCont}>
        <div className={styles.headings}>ABOUT US</div>
        Khelacademy is an Event Organizing Company whose expertise lies in sports.
        It is a team of highly enthusiastic engineers with a goal of stimulating, endorsing and expanding the sports culture throughout India.
        We believe in nurturing the passion for sports from the very beginning through the dedication in sports via our expertise.
        We manage the profiles of all the participants. We provide marketing solutions to the sports academies and clubs.
        The prime motive is to instill the importance of sports in our day to day life. We are committed to active sports in participation from everyone.
      </div>
    );
  }
}
