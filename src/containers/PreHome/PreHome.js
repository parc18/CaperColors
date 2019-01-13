import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { provideHooks } from 'redial';
import PropTypes from 'prop-types';
import cookie from 'js-cookie';
import { Card } from 'components';
import { connect } from 'react-redux';
import { isHomeLoaded as isHomeFilled, getEventsBycityId as fillHome } from 'redux/modules/home';
import Footer from '../Footer/Footer';

@connect(state => ({
  online: state.online,
  home: state.home,
  sports: state.sports
}))

@provideHooks({
  fetch: async ({ store: { dispatch, getState } }) => {
    if (!isHomeFilled(getState())) {
      if (cookie.get('city')) {
        await dispatch(fillHome(cookie.get('city'))).catch(() => null);
      } else {
        cookie.set('city', -1, 30);
        await dispatch(fillHome(-1)).catch(() => null);
      }
    }
  }
})

export default class PreHome extends Component {
  static propTypes = {
    home: PropTypes.shape(Object).isRequired,
    dispatch: PropTypes.func.isRequired,
    sports: PropTypes.shape(Object).isRequired
    // match: PropTypes.arrayOf(PropTypes.array).isRequired
  };
  render() {
    const { home, sports } = this.props;
    const events = home.data;
    const styles = require('./PreHome.scss');
    let i=0;
    return (
      <div>
          <div id={styles.cover}>
            <img src="images/cover-img.jpg" id={styles.coverImg} />
          </div>
          <div className={styles.eventdetails}>
            <p className={styles.eventTitle}>Badminton Tournament</p>
            <div className={styles.clear} />
            <p className={styles.eventPd}>Delhi and NCR, 11th November 2018</p>
            <div className={styles.clear} />
            <Link to={`/events/`}>
              <div className={styles.bookNow}>
                <div className={styles.button}>Book Now</div>
                <div><img className={styles.arrow} src="images/arrow_white.svg" /></div>
              </div>
            </Link>
          </div>
          <div className={styles.myCards}>
            <div className={styles.container}>
              {/* <Intro /> */}
              {home &&
                typeof home !== 'undefined' &&
                home.data &&
                typeof home.data !== 'undefined' &&
                Object.keys(events).map(item => {
                  if(i++>2){
                    return;
                  }
                  if (typeof item !== 'undefined') {
                    return (
                      <Card
                        name={home.data[item].eventName}
                        img={home.data[item].eventImgUrl}
                        city={home.data[item].city}
                        date={home.data[item].date}
                        index={home.data[item].eventId}
                        key={home.data[item].eventId}
                        id={home.data[item].eventId}
                      />
                    );
                  }
                  return null;
                })}
            </div>
          </div>
          <div className={styles.usIntro}>
            <div className={styles.desc}>
              <div className={styles.head}>About us</div><br />

                We are a team of exuberant engineers with a goal of stimulating, endorsing and expanding the sports culture throughout India.
                <br />
                <br />
                We manage :
                <br />
            <div className={styles.square} /> <div>Promotion of Sports events</div>
            <div className={styles.square} /><div>Ticket selling for the sports events.</div>
            <div className={styles.square} /><div>Marketing and Branding solutions for the academies.</div>
            <div className={styles.square} /><div>Conduct Sports tournaments for Kids and Corporates.</div>
            <br />



            Marketing and Branding Solutions for the academies.

            Whether you are a New academy, Sports Complexes or clubs.
            Whether your venue is easy or complex to reach.

            We let people to know about the Venue  details with precise  informations like :
             the nearest metro station, nearest bus stop, nearest tempo stand, nearest landmarks etc, to reach.
            </div>
            <div>
              <img src="https://res.cloudinary.com/parc-india/image/upload/v1538149524/jp2q4mevpojkrab0fy4q.jpg" />
            </div>
          </div>
        <Footer />
      </div>
    );
  }
}
