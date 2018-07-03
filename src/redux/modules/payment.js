const PAYMENT_REQUSET = 'PAYMENT_REQUSET';
const PAYMENT_SUCCESS = 'PAYMENT_SUCCESS';
const PAYMENT_FAIL = 'PAYMENT_FAIL';

const initialState = {
  loaded: false
};

export default function payment(state = initialState, action = {}) {
  switch (action.type) {
    case PAYMENT_REQUSET:
      return {
        ...state,
        PaymentRunning: true
      };
    case PAYMENT_SUCCESS:
      return {
        ...state,
        PaymentRunning: false,
        PaymentLoaded: true,
        paymentUrl: action.result.message
      };
    case PAYMENT_FAIL:
      return {
        ...state,
        PaymentRunning: false,
        PaymentLoaded: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function requsetPaymentUrl(paymentObject) {
  return {
    types: [PAYMENT_REQUSET, PAYMENT_SUCCESS, PAYMENT_FAIL],
    promise: ({ client }) => client.post('payment/payment', paymentObject)
  };
}
