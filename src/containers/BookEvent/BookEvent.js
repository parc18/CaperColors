import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import { getEventsPrices as prices } from 'redux/modules/bookevent';
import { requsetPaymentUrl as getPaymentUrl } from 'redux/modules/payment';
import gameconfig from '../../../config/gameconfig';

const playerCount = [];
let totalAmount = 0;

@provideHooks({
  fetch: async ({ store: { dispatch }, match }) => {
    await dispatch(prices(match[1].match.params.eventId)).catch(() => null);
  }
})
@connect(state => ({
  online: state.online,
  bookingPrices: state.bookingPrices,
  home: state.home
}))
export default class BookEvent extends Component {
  static propTypes = {
    bookingPrices: PropTypes.arrayOf(PropTypes.array).isRequired,
    home: PropTypes.arrayOf(PropTypes.array).isRequired,
    match: PropTypes.arrayOf(PropTypes.array).isRequired,
    dispatch: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.DecrementAmount = (id, amount, name, priceId, categoryId = undefined) => {
      console.log(id, this.state.catId);
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
      console.log(paymentObject);
    };
  }
  state = {
    eventId: this.props.match.params.eventId,
    catId: this.props.bookingPrices.data && this.props.bookingPrices.data !== undefined ? Object.keys(this.props.bookingPrices.data)[0] : {},
    details: this.props.bookingPrices.data[Object.keys(this.props.bookingPrices.data)[0]],
    ShowNextButton: false,
    completed: false,
    playerCount: {},
    phone: '7411286816',
    email: 'premi@ka.com'
  };
  onCategoryChange = id => {
    console.log(this.props.bookingPrices.data[id], 'premi');
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
        <br /> <input type="text" className={identity} />
        <br />{' '}
      </div>);
    }
    return table;
  };
  renderPhoneField = () => <input name="phone" placeholder="Enter 10 digit Mobile Number" value={this.state.phone} onChange={event => this.handleUserInput(event)} />;
  renderEmailField = () => <input name="email" placeholder="Enter Your Email" value={this.state.email} onChange={event => this.handleUserInput(event)} />;
  renderPlayerDetails = () => (
    <div>
      <span>{this.props.home.data[this.props.match.params.eventId].eventName}</span>
      <div> total Amount : {this.calc()} </div>
      {this.renderPhoneField()}
      {this.renderEmailField()}
      <div>
        {this.state.playerCount &&
          Object.values(this.state.playerCount).map(item => {
            if (typeof item !== 'undefined') {
              return (
                <div key={item.catId}>
                  <div>
                    <span>{item.name} | </span>
                  </div>
                  <div>
                    <button onClick={() => this.DecrementAmount(item.priceId, item.amount, item.name, item.priceId, item.catId)}>-</button>
                    <input type="number" name="amount" value={this.state.playerCount[item.priceId] !== undefined ? this.state.playerCount[item.priceId].qty : 0} id={item.priceId} />
                    <button onClick={() => this.IncrementAmount(item.priceId, item.amount, item.name, item.priceId, item.catId)}>+</button>
                    {this.createInputFields(this.state.playerCount[item.priceId].qty, item.priceId)}
                  </div>
                </div>
              );
            }
            return null;
          })}
      </div>
      <button onClick={() => this.modifyPaymentDetails()}> Modify </button>
      <button onClick={() => this.makePayment()}> Payment &#8594; </button>
    </div>
  );
  render() {
    const styles = require('./BookEvent.scss');
    // const firstValue = Object.values(this.props.bookingPrices.data)[0];
    console.log('firstValue: ', this.state.details, this.state.playerCount);
    // require the logo image both from client and server
    return (
      <div className={styles.home}>
        <Helmet title="Home" />
        {!this.state.completed && (
          <div>
            <div className={styles.container}>
              <div className={styles.selectGameType}>
                {Object.keys(this.props.bookingPrices.data).map(item => {
                  if (typeof item !== 'undefined') {
                    return (
                      <div key={item} onClick={() => this.onCategoryChange(item)} role="presentation">
                        {gameconfig[item]}
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
                        <div key={item.priceId}>
                          <div>
                            <span>{item.name} | </span>
                            <span>{item.priceAmount}</span>
                            <div>{item.desc}</div>
                          </div>
                          <div>
                            <button onClick={() => this.DecrementAmount(item.priceId, item.priceAmount, item.name, item.priceId)}>-</button>
                            <input
                              type="number"
                              name="amount"
                              value={this.state.playerCount[item.priceId] !== undefined ? this.state.playerCount[item.priceId].qty : 0}
                              id={item.priceId}
                              onChange={() => this.checkStatustoShowNextButton(item.priceId)}
                            />
                            <button onClick={() => this.IncrementAmount(item.priceId, item.priceAmount, item.name, item.priceId)}>+</button>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
              </div>
            </div>
            {this.state.ShowNextButton && <button onClick={() => this.proceed()}> Next </button>}
          </div>
        )}
        {this.state.completed && this.renderPlayerDetails()}
      </div>
    );
  }
}
