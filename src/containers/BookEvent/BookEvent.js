import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import { getEventsPrices as prices } from 'redux/modules/bookevent';
import { requsetPaymentUrl as getPaymentUrl } from 'redux/modules/payment';
import gameconfig from '../../../config/gameconfig';
import { edpTime } from '../../helpers/timeConverter';

const playerCount = [];
let totalAmount = 0;
const styles = require('./BookEvent.scss');
const styles1 = require('../EventDescription/EventDescription.scss');

@provideHooks({
  fetch: async ({ store: { dispatch }, match }) => {
    await dispatch(prices(match[1].match.params.eventId)).catch(() => null);
  }
})
@connect(state => ({
  online: state.online,
  bookingPrices: state.bookingPrices,
  home: state.home,
  payment: state.payment
}))
export default class BookEvent extends Component {
  static propTypes = {
    bookingPrices: PropTypes.arrayOf(PropTypes.array).isRequired,
    home: PropTypes.arrayOf(PropTypes.array).isRequired,
    match: PropTypes.arrayOf(PropTypes.array).isRequired,
    dispatch: PropTypes.func.isRequired,
    payment: PropTypes.arrayOf(PropTypes.array).isRequired
  };
  constructor(props) {
    super(props);
    this.DecrementAmount = (id, amount, name, priceId, categoryId = undefined) => {
      if (Number(document.getElementById(id).value) > 0) {
        document.getElementById(id).value = Number(document.getElementById(id).value) - 1;
        playerCount[id] = {
          qty: Number(document.getElementById(id).value),
          amount,
          catId: categoryId !== undefined ? categoryId : this.state.catId,
          name,
          priceId
        };
        this.setState({ playerCount });
      }
      this.checkStatustoShowNextButton();
    };
    this.IncrementAmount = (id, amount, name, priceId, categoryId = undefined) => {
      if (Number(document.getElementById(id).value) < 18) {
        document.getElementById(id).value = Number(document.getElementById(id).value) + 1;
        playerCount[id] = {
          qty: Number(document.getElementById(id).value),
          amount,
          catId: categoryId !== undefined ? categoryId : this.state.catId,
          name,
          priceId
        };
        this.setState({ playerCount });
        this.checkStatustoShowNextButton();
      }
    };
    this.checkStatustoShowNextButton = () => {
      // if (Number(document.getElementById(1).value) > 0) {
      this.setState({ ShowNextButton: true });
      // } else {
      // this.setState({ ShowNextButton: false });
      // }
    };
    this.proceed = () => {
      this.setState({ completed: true });
    };
    this.modifyPaymentDetails = () => {
      this.setState({ completed: false });
    };
    this.makePayment = () => {
      const paymentObject = {};
      paymentObject.eventId = this.state.eventId;
      paymentObject.userId = this.state.userId;
      paymentObject.email = this.state.email;
      paymentObject.phone = this.state.phone;
      paymentObject.totalAmount = totalAmount;
      if (!this.isEmail(this.state.email)) {
        alert('Please Provide a Valid Email ID');
        return;
      }
      if (!this.isPhone(this.state.phone)) {
        alert('Please Provide a Valid Mobile Number');
        return;
      }
      paymentObject.priceDetail = [];
      this.state.playerCount.map(item => {
        if (typeof item !== 'undefined' && item.qty > 0) {
          const priceIdDetails = {};
          const playerNames = {};
          priceIdDetails.priceId = item.priceId;
          priceIdDetails.quantity = item.qty;
          priceIdDetails.playerNames = {};
          for (let i = 1; i <= item.qty; i += 1) {
            const id = document.getElementsByClassName(`${item.priceId}`);
            for (let x = 0; x < id.length; x += 1) {
              playerNames[x + 1] = id[x].value;
            }
            priceIdDetails.playerNames = playerNames;
          }
          paymentObject.priceDetail.push(priceIdDetails);
        }
        return null;
      });
      this.props.dispatch(getPaymentUrl(paymentObject)).catch(() => null);
    };
  }
  state = {
    eventId: this.props.match.params.eventId,
    catId: this.props.bookingPrices.data && this.props.bookingPrices.data !== undefined ? Object.keys(this.props.bookingPrices.data)[0] : {},
    details: this.props.bookingPrices.data[Object.keys(this.props.bookingPrices.data)[0]],
    ShowNextButton: false,
    completed: false,
    playerCount: {},
    phone: '',
    email: ''
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.payment && nextProps.payment.paymentUrl) {
      window.location.assign(nextProps.payment.paymentUrl);
    }
  }
  onCategoryChange = (id, e) => {
    const el = document.getElementsByClassName(e.target.className);
    let i = 0;
    while (i < el.length) {
      el[i].classList.remove(styles.selected);
      i += 1;
    }
    e.currentTarget.className += ` ${styles.selected}`;
    this.setState({ details: this.props.bookingPrices.data[id], catId: id });
  };
  calc = () => {
    totalAmount = 0;
    this.state.playerCount.map(item => {
      totalAmount += item.amount * item.qty;
      return null;
    });
    // this.setState({ totalAmount });
    return totalAmount;
  };
  handleUserInput = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  createInputFields = (number, identity) => {
    const table = [];
    for (let i = 0; i < number; i += 1) {
      table.push(<div>
        <input type="text" className={`${identity} ${styles.players}`} placeholder="Player Name" />
      </div>);
    }
    return table;
  };
  isEmail = (email = null) => {
    const re = /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  isPhone = (phone = null) => {
    const re = /^[0]?[789]\d{9}$/;
    return re.test(phone);
  };
  renderEmailField = () => (
    <input
      className={styles.userEmailInput}
      name="email"
      pattern="/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
      required
      placeholder="Enter Your email"
      value={this.state.email}
      onChange={event => this.handleUserInput(event)}
    />
  );
  renderPhoneField = () => <input className={styles.userPhoneInput} name="phone" placeholder="Enter 10 digit mobile number" value={this.state.phone} onChange={event => this.handleUserInput(event)} />;
  renderPlayerDetails = () => (
    <div>
      <div className={styles.infoBox}>
        <div className={styles.name}>{this.props.home.data[this.props.match.params.eventId].eventName}</div>
        <div className={styles.place}>{this.props.home.data[this.props.match.params.eventId].eventVenue}</div>
        <div className={styles.timings}>
          {edpTime(this.props.home.data[this.props.match.params.eventId].date)}, &nbsp;
          {this.props.home.data[this.props.match.params.eventId].timings}
        </div>
        <div className={styles.payableAmount}>
          {' '}
          Total Payable Amount :{' '}
          <span className={styles.money}>
            <sup className={styles.rupee}>&#8377;</sup>
            {this.calc()}
          </span>{' '}
        </div>
      </div>
      <div className={styles.userInfo}>
        <div className={styles.userEmail}>{this.renderEmailField()} </div>
        <div className={styles.userPhone}>{this.renderPhoneField()} </div>
      </div>
      <div>
        {this.state.playerCount &&
          Object.values(this.state.playerCount).map(item => {
            if (typeof item !== 'undefined') {
              return (
                <div className={styles.playerNamess} key={item.catId}>
                  <div className={styles.catNamerofl}>
                    <div className={`${styles.catName} ${styles.margletfright}`}>
                      {item.name} <span className={styles.catgroup}>{gameconfig[item.catId]} </span>
                    </div>
                    <div className={styles.addsubContainer}>
                      <button className={styles.addsub} onClick={() => this.DecrementAmount(item.priceId, item.amount, item.name, item.priceId, item.catId)}>
                        &#8211;
                      </button>
                      <input
                        className={styles.qtyInput}
                        type="number"
                        name="amount"
                        value={this.state.playerCount[item.priceId] !== undefined ? this.state.playerCount[item.priceId].qty : 0}
                        id={item.priceId}
                      />
                      <button className={styles.addsub} onClick={() => this.IncrementAmount(item.priceId, item.amount, item.name, item.priceId, item.catId)}>
                        +
                      </button>
                    </div>
                  </div>
                  <div>{this.createInputFields(this.state.playerCount[item.priceId].qty, item.priceId)}</div>
                </div>
              );
            }
            return null;
          })}
      </div>
      <div className={styles.ctas}>
        <button className={styles1.eventShareStickyBtn} onClick={() => this.modifyPaymentDetails()}>
          {' '}
          Modify{' '}
        </button>
        <button className={styles1.eventBookStickyBtn} onClick={() => this.makePayment()}>
          {' '}
          Payment &#8594;{' '}
        </button>
      </div>
    </div>
  );
  render() {
    return (
      <div className={styles.home}>
        <Helmet title="Home" />
        {!this.state.completed && (
          <div>
            <div className={styles.container}>
              <div className={styles.selectGameType}>
                {Object.keys(this.props.bookingPrices.data).map((index, item) => {
                  if (typeof item !== 'undefined') {
                    return (
                      <div className={`${styles.category} ${item === 0 ? styles.selected : ''}`} key={index} onClick={e => this.onCategoryChange(index, e, this)} role="presentation">
                        {gameconfig[index]}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
              <div>
                {this.state.details &&
                  Object.values(this.state.details).map(item => {
                    if (typeof item !== 'undefined') {
                      return (
                        <div classNmae={styles.bigBox} key={item.priceId}>
                          <div className={styles.allDetails}>
                            <div className={styles.catName}>{item.name} </div>
                            <div className={styles.amount}>
                              <sup className={styles.rupee}>&#8377;</sup>
                              {item.priceAmount}
                            </div>
                            <div className={styles.ageDesc}>{item.desc}</div>
                          </div>
                          <div className={styles.priceInput}>
                            <button className={styles.addsub} onClick={() => this.DecrementAmount(item.priceId, item.priceAmount, item.name, item.priceId)}>
                              &#8211;
                            </button>
                            <input
                              className={styles.qtyInput}
                              type="number"
                              name="amount"
                              value={this.state.playerCount[item.priceId] !== undefined ? this.state.playerCount[item.priceId].qty : 0}
                              id={item.priceId}
                              onChange={() => this.checkStatustoShowNextButton(item.priceId)}
                            />
                            <button className={styles.addsub} onClick={() => this.IncrementAmount(item.priceId, item.priceAmount, item.name, item.priceId)}>
                              +
                            </button>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
              </div>
            </div>
            {this.state.ShowNextButton && (
              <button className={styles.nextButton} onClick={() => this.proceed()}>
                {' '}
                Next{' '}
              </button>
            )}
          </div>
        )}
        {this.state.completed && this.renderPlayerDetails()}
      </div>
    );
  }
}
