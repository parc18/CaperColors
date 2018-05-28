const BOOKING_PRICE_REQUEST = 'BOOKING_PRICE_REQUEST';
const BOOKING_PRICE_SUCCESS = 'BOOKING_PRICE_SUCCESS';
const BOOKING_PRICE_FAILURE = 'BOOKING_PRICE_FAILURE';

const initialState = {
  loaded: false
};

export default function currentPrices(state = initialState, action = {}) {
  switch (action.type) {
    case BOOKING_PRICE_REQUEST:
      return {
        ...state,
        pricesLoading: true
      };
    case BOOKING_PRICE_SUCCESS:
      return {
        ...state,
        pricesLoaded: true,
        data: action.result.message.response.priceDetails
      };
    case BOOKING_PRICE_FAILURE:
      return {
        ...state,
        pricesLoading: false,
        pricesLoaded: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function isHomeLoaded(globalState) {
  return globalState.home && globalState.home.homeLoaded;
}

export function getEventsPrices(eventId) {
  return {
    types: [BOOKING_PRICE_REQUEST, BOOKING_PRICE_SUCCESS, BOOKING_PRICE_FAILURE],
    promise: ({ client }) => client.get(`/bookevent/getEventPrices/${eventId}`)
  };
}
