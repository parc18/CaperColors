const CITY_REQUEST = 'CITY_REQUEST';
const CITY_SUCCESS = 'CITY_SUCCESS';
const CITY_FAILURE = 'CITY_FAILURE';

const initialState = {
  loaded: false
};

export default function city(state = initialState, action = {}) {
  switch (action.type) {
    case CITY_REQUEST:
      return {
        ...state,
        cityLoading: true
      };
    case CITY_SUCCESS:
      return {
        ...state,
        cityLoading: false,
        cityLoaded: true,
        data: action.result.message.response
      };
    case CITY_FAILURE:
      return {
        ...state,
        loading: false,
        cityLoaded: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function isCityLoaded(globalState) {
  return globalState.city && globalState.city.cityLoaded;
}

export function getCities() {
  return {
    types: [CITY_REQUEST, CITY_SUCCESS, CITY_FAILURE],
    promise: ({ client }) => client.get('city/getCities')
  };
}
