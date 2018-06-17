import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import { getEventsPrices as prices } from 'redux/modules/bookevent';
import gameconfig from '../../../config/gameconfig';

const playerCount = [];
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
    match: PropTypes.arrayOf(PropTypes.array).isRequired
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
  }
  state = {
    catId: Object.keys(this.props.bookingPrices.data)[0],
    details: this.props.bookingPrices.data[Object.keys(this.props.bookingPrices.data)[0]],
    ShowNextButton: false,
    completed: false,
    playerCount: {}
  };
  onCategoryChange = id => {
    console.log(this.props.bookingPrices.data[id], 'premi');
    this.setState({ details: this.props.bookingPrices.data[id], catId: id });
  };
  calc = () => {
    let totalAmount = 0;
    this.state.playerCount.map(item => {
      totalAmount += item.amount * item.qty;
      return null;
    });
    return totalAmount;
  };
  createInputFields = number => {
    const table = [];
    for (let i = 0; i < number; i += 1) {
      table.push(<div>
        <br /> <input type="text" />
        <br />{' '}
      </div>);
    }
    return table;
  };
  renderPlayerDetails = () => (
    <div>
      <span>{this.props.home.data[this.props.match.params.eventId].eventName}</span>
      <div> total Amount : {this.calc()} </div>
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
                    <button
                      onClick={() =>
                        this.DecrementAmount(item.priceId, item.amount, item.name, item.priceId, item.catId)
                      }
                    >
                      -
                    </button>
                    <input
                      type="number"
                      name="amount"
                      value={
                        this.state.playerCount[item.priceId] !== undefined
                          ? this.state.playerCount[item.priceId].qty
                          : 0
                      }
                      id={item.priceId}
                    />
                    <button
                      onClick={() =>
                        this.IncrementAmount(item.priceId, item.amount, item.name, item.priceId, item.catId)
                      }
                    >
                      +
                    </button>
                    {this.createInputFields(this.state.playerCount[item.priceId].qty)}
                  </div>
                </div>
              );
            }
            return null;
          })}
      </div>
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
                            <button
                              onClick={() =>
                                this.DecrementAmount(item.priceId, item.priceAmount, item.name, item.priceId)
                              }
                            >
                              -
                            </button>
                            <input
                              type="number"
                              name="amount"
                              value={
                                this.state.playerCount[item.priceId] !== undefined
                                  ? this.state.playerCount[item.priceId].qty
                                  : 0
                              }
                              id={item.priceId}
                              onChange={() => this.checkStatustoShowNextButton(item.priceId)}
                            />
                            <button
                              onClick={() =>
                                this.IncrementAmount(item.priceId, item.priceAmount, item.name, item.priceId)
                              }
                            >
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
            {this.state.ShowNextButton && <button onClick={() => this.proceed()}> Next </button>}
          </div>
        )}
        {this.state.completed && this.renderPlayerDetails()}
      </div>
    );
  }
}
