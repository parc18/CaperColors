import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    const styles = require('./Footer.scss');
    return (
      <div className={styles.myFooter}>
        <div className={styles.contactAndAddress}>
          <div className={styles.contactUs}>
            <span className={styles.contactUsHeader}>Contact Us</span>
            <div className={styles.userDetails}>
              <div className={styles.userNameAndEmail}>
                <input className={styles.userName} placeholder="Your Name" />
                <input className={styles.userEmail} placeholder="Your Email" />
              </div>
              <div>
                <textarea className={styles.userMessage} placeholder="Your Message" />
              </div>
            </div>
            <div className={styles.contactUsButton}>
              {' '}
              <button className={styles.connectBtn}>Connect</button>
            </div>
          </div>
          <div className={styles.userAddressDetails}>
            <div className={styles.kaAddressDetails}>
              <div className={styles.infoElem}>
                <label>Address</label>
                <div className={styles.kaAddress}>J-115, Matfields Garden, J-Block, Sector - 61, Gurgaon Haryana</div>
              </div>
              <div className={styles.infoElem}>
                <label>Phone</label>
                <div className={styles.kaPhoneNo}>+91 9087654321</div>
              </div>
              <div className={styles.infoElem}>
                <label>Email</label>
                <div className={styles.kaEmail}>info@khelacademy.com</div>
              </div>
            </div>
            <div className={styles.shareItWith} />
          </div>
        </div>
        <div className={styles.shareIt}>
          <a href="https://www.facebook.com/khelacademy/" target="_blank" className={styles.allFooterLogos}>
            <img className={styles.imgFClass} src="https://res.cloudinary.com/parc-india/image/upload/v1546131232/facebook_ozccdx.svg" alt="venue_logo" />
          </a>
          <a href="https://www.instagram.com/khelacademy/" target="_blank" className={styles.allFooterLogos}>
            <img className={styles.imgFClass} src="https://res.cloudinary.com/parc-india/image/upload/v1546131233/instagram_l0v3gl.svg" alt="venue_logo" />
          </a>
          <a href="https://web.whatsapp.com/send?text=https://www.khelacademy.com/" target="_blank" className={styles.allFooterLogos}>
            <img className={styles.imgFClass} src="https://res.cloudinary.com/parc-india/image/upload/v1546131233/whatsapp_d7bguf.svg" alt="venue_logo" />
          </a>
        </div>
        <div className={styles.khelacademyinfofooter}>
          <div className={styles.companyName}>Khel Academy</div>
          <div className={styles.companycerti}>&copy; 2019 khelacademy</div>
        </div>
      </div>
    );
  }
}
