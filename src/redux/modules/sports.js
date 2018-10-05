const SPORTS_REQUEST = 'SPORTS_REQUEST';
const SPORTS_SUCCESS = 'SPORTS_SUCCESS';
const SPORTS_FAILURE = 'SPORTS_FAILURE';

const initialState = {
  loaded: false
};

export default function sports(state = initialState, action = {}) {
  switch (action.type) {
    case SPORTS_REQUEST:
      return {
        ...state,
        sportsLoading: true
      };
    case SPORTS_SUCCESS:
      return {
        ...state,
        sportsLoading: false,
        sportsLoaded: true,
        data: action.result.message.response
      };
    case SPORTS_FAILURE:
      return {
        ...state,
        loading: false,
        sportsLoaded: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function isSportsLoaded(globalState) {
  return globalState.sports && globalState.sports.sportsLoaded;
}

export function getAllSports() {
  return {
    types: [SPORTS_REQUEST, SPORTS_SUCCESS, SPORTS_FAILURE],
    promise: ({ client }) => client.get('sports/getSports')
  };
}
