import multireducer from 'multireducer';
import { routerReducer } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import auth from './modules/auth';
import notifs from './modules/notifs';
import counter from './modules/counter';
import info from './modules/info';
import home from './modules/home';
import bookingPrices from './modules/bookevent';
import payment from './modules/payment';
import thankYouStatus from './modules/thankyou';
import city from './modules/city';
import sports from './modules/sports';

export default function createReducers(asyncReducers) {
  return {
    router: routerReducer,
    online: (v = true) => v,
    form,
    notifs,
    auth,
    counter: multireducer({
      counter1: counter,
      counter2: counter,
      counter3: counter
    }),
    info,
    home,
    bookingPrices,
    payment,
    thankYouStatus,
    city,
    sports,
    ...asyncReducers
  };
}
