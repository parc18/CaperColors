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
			 									<input className={styles.userName} placeholder="Your Name"></input>
			 									<input className={styles.userEmail} placeholder="Your Email"></input>
					         </div>
				         <div>
				             <textarea className={styles.userMessage} placeholder="Your Message"></textarea>
				         </div>
				      </div>
				      <div className={styles.contactUsButton}> <button className={styles.connectBtn}>Connect</button></div>
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
				      <div className={styles.shareItWith}> <button className={styles.connectBtn}>Connect</button></div>
				    </div>
			    </div>
			    <div className={styles.khelacademyinfofooter}>
				    <div className={styles.companyName}>Khel Academy</div>
				    <div className={styles.companycerti}>A 2018 all right reserved @khelacademy</div>
			    </div>
		    </div>
    );
  }
}
