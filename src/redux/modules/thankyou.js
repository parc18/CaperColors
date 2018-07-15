const THANK_YOU_PAGE_REQUEST = 'THANK_YOU_PAGE_REQUEST';
const THANK_YOU_PAGE_SUCCESS = 'THANK_YOU_PAGE_SUCCESS';
const THANK_YOU_PAGE_FAILURE = 'THANK_YOU_PAGE_FAILURE';

const initialState = {
  thankYouPageLoaded: false
};

export default function thankYouStatus(state = initialState, action = {}) {
  switch (action.type) {
    case THANK_YOU_PAGE_REQUEST:
      return {
        ...state,
        thankYouPageLoading: true
      };
    case THANK_YOU_PAGE_SUCCESS:
      return {
        ...state,
        thankYouPageLoaded: true,
        data: action.result.message
      };
    case THANK_YOU_PAGE_FAILURE:
      return {
        ...state,
        thankYouPageLoading: false,
        thankYouPageLoaded: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function isThankYouPage(globalState) {
  return globalState.thankYouStatus && globalState.thankYouStatus.thankYouPageLoaded;
}

export function getThankYouPageStatus(orderId) {
  return {
    types: [THANK_YOU_PAGE_REQUEST, THANK_YOU_PAGE_SUCCESS, THANK_YOU_PAGE_FAILURE],
    promise: ({ client }) => client.get(`/thankyou/thankyou/${orderId}`)
  };
}
