const HOME_REQUEST = 'HOME_REQUEST';
const HOME_SUCCESS = 'HOME_SUCCESS';
const HOME_FAILURE = 'HOME_FAILURE';

const initialState = {
  loaded: false
};

export default function home(state = initialState, action = {}) {
  switch (action.type) {
    case HOME_REQUEST:
      return {
        ...state,
        homeLoading: true
      };
    case HOME_SUCCESS:
      return {
        ...state,
        homeLoading: false,
        homeLoaded: true,
        data: action.result.message.response
      };
    case HOME_FAILURE:
      return {
        ...state,
        loading: false,
        homeLoaded: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function isHomeLoaded(globalState) {
  return globalState.home && globalState.home.homeLoaded;
}

export function getEventsBycityId(cityId) {
  return {
    types: [HOME_REQUEST, HOME_SUCCESS, HOME_FAILURE],
    promise: ({ client }) => client.get(`/home/getEvents/${cityId}`)
  };
}

export function getEventsBycityIdandGameId(cityId, gameId) {
  return {
    types: [HOME_REQUEST, HOME_SUCCESS, HOME_FAILURE],
    promise: ({ client }) => client.get(`/home/getEvents/${cityId}/${gameId}`)
  };
}
