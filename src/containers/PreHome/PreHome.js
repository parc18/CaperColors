import React, { Component } from 'react';
import Footer from '../Footer/Footer';

export default class PreHome extends Component {
  render() {
    const styles = require('./PreHome.scss');
    return (
      <div className=" ">
        <div>
          <div id={styles.cover}>
            <img src="images/cover-img.jpg" id={styles.coverImg} />

            <div className={styles.eventdetails}>
              <p className={styles.eventTitle}>Badminton Tournament</p>
              <div className={styles.clear} />
              <p className={styles.eventPd}>Delhi and NCR, 11th November 2018</p>
              <div className={styles.clear} />
              <a id={styles.bookNow} href="">
                <div id={styles.bookNow}>
                  <div className={styles.btnText}>Book Now</div>
                  <img className={styles.btnImg} src="images/arrow_white.svg" />
                </div>
              </a>
            </div>
          </div>

          <div className={styles.clear} />

          <div className={styles.grid}>
            <div className={styles.aboutT}>
              <div className={styles.sectionT}>
                <p>About</p>
              </div>
            </div>

            <div className={styles.aboutC}>
              <div className={styles.sectionR}>
                <p className={styles.sectionText}>
                  We are a team of exuberant engineers with a goal of stimulating, endorsing and expanding the sports culture throughout India. We believe in nurturing the passion for sports from the
                  very beginning through the dedication in sports via our expertise.
                </p>

                <p className={styles.sectionText}>We manage: Profiles of all the participants. Provide marketing solutions to the sports academies and clubs.</p>

                <p className={styles.sectionText2}>The prime motive is to instil the importance of sports in our day to day life. We are committed to active sports in participation from everyone.</p>
              </div>
            </div>

            <div className={styles.aboutG}>
              <div className={styles.sectionL} />
            </div>

            <div className={styles.bleagueT}>
              <div className={styles.sectionT}>
                <p>Badminton League</p>
              </div>
            </div>

            <div className={styles.bleagueC}>
              <div className={styles.sectionR}>
                <p className={styles.sectionText}>
                  Be Ready for an Exciting Season of Badminton Tournament with Khelacademy. Cash Prize worth Rs 30,000 Khelacademy, coming up with fresh Badminton tournament league, which not only let
                  players to play a smooth and well-organized tournament but also let players to create their profile and maintain their rankings in our tournament. The more you play, the more you
                  improve your game and the better chance to become a season player of the league.
                </p>

                <a href="">
                  <div className={styles.learnMore}>
                    <div className={styles.btnText}>Learn More</div>
                    <img className={styles.btnImg} src="images/arrow_white.svg" />
                  </div>
                </a>
              </div>
            </div>

            <div className={styles.bleagueG}>
              <div className={styles.sectionL} />
            </div>

            <div className={styles.moreThanL}>
              <div className={styles.sectionT}>
                <p>More than organising events</p>
              </div>
            </div>

            <div className={styles.moreThan1}>
              <div className={styles.sectionR}>
                <img className={styles.moreThanIc} src="images/ic_sponsor.svg" />

                <span className={styles.moreThanText}>Sponsor</span>

                <p className={styles.sectionText}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec sodales mi. className aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras
                  sit amet nulla et risus aliquam porta. Pellente.
                </p>

                <div className={styles.clear} />

                <a href="">
                  <div className={styles.learnMore} id="mt-lm-btn">
                    <div className={styles.btnText}>Learn More</div>
                    <img className={styles.btnImg} src="images/arrow_white.svg" />
                  </div>
                </a>
              </div>
            </div>

            <div className={styles.moreThan2}>
              <div className={styles.sectionL}>
                <img className={styles.moreThanIc} src="images/ic_sponsor.svg" />

                <span className={styles.moreThanText}>Sponsor</span>

                <p className={styles.sectionText}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec sodales mi. className aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras
                  sit amet nulla et risus aliquam porta. Pellente.
                </p>

                <div className={styles.clear} />

                <a href="">
                  <div className={styles.learnMore} id={styles.mtLmBtn}>
                    <div className={styles.btnText}>Learn More</div>
                    <img className={styles.btnImg} src="images/arrow_white.svg" />
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className={styles.clear} />

          <div id={styles.topNmbr}>
            <div id={styles.topNmbrCont}>
              <div className={styles.nmbrElement}>
                <p className={styles.tnNmbr}>450</p>
                <div className={styles.clear} />
                <p className={styles.tnText}>Tornaments</p>
              </div>

              <div className={styles.nmbrElement}>
                <p className={styles.tnNmbr}>15</p>
                <div className={styles.clear} />
                <p className={styles.tnText}>Sponsors</p>
              </div>

              <div className={styles.nmbrElement}>
                <p className={styles.tnNmbr}>2000</p>
                <div className={styles.clear} />
                <p className={styles.tnText}>ActivePlayers</p>
              </div>

              <div className={styles.nmbrElement}>
                <p className={styles.tnNmbr}>10</p>
                <div className={styles.clear} />
                <p className={styles.tnText}>Cities</p>
              </div>
            </div>
          </div>

          <div className={styles.clear} />

          <div id={styles.custReview}>
            <div className={styles.sectionT}>
              <p>Customer Reviews</p>
            </div>

            <div className={styles.review}>
              <img src="images/cust1.png" className={styles.custImg} />

              <p className={styles.custText}>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec sodales mi. className aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras
                sit amet nulla et risus aliquam porta. Pellente."
              </p>

              <p className={styles.custName}>
                <strong>-Sakhi</strong> Singh
              </p>
            </div>

            <div className={styles.review}>
              <img src="images/cust2.png" className={styles.custImg} />

              <p className={styles.custText}>
                "Sit amet, consectetur adipiscing elit. Integer nec sodales mi. className aptent taciti sociosqora torquent per conubia nostra, per inceptos himenaeos. Cras sit amet nulla et risus
                aliquam porta. Pellente."
              </p>

              <p className={styles.custName}>
                <strong>-Pooja</strong> Agarwal
              </p>
            </div>

            <div className={styles.review}>
              <img src="images/cust3.png" className={styles.custImg} />

              <p className={styles.custText}>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec sodales mi. className aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos sodales
                mi. className aptent taciti sociosqu ad litora torquent per conubia nostra, pe."
              </p>

              <p className={styles.custName}>
                <strong>-Dheeraj</strong> Kumar
              </p>
            </div>
          </div>

          <div className={styles.clear} />
        </div>
        <Footer />
      </div>
    );
  }
}
