import * as _ from "lodash";

import {
  INIT_AUTH,
  CLOSE_AUTH,
  LOGIN_SUCCES,
  LOGIN_FAILED,
  INIT_LOGOUT,
  PERSIST_ITEMS
} from "./../actions/authActions";

import { saveToken, getToken } from "./../services/localStorage";

const INITIAL_STATE = {
  failedAttempt: false,
  authenticated: false,
  isLoading: false,
  token: undefined,
  user: {
    _id: undefined,
    name: undefined,
    email: undefined
  }
};

const handleInitAuth = state => {
  let stateToReturn = _.cloneDeep(state);
  stateToReturn.isLoading = true;
  return stateToReturn;
};

const handleCloseAuth = state => {
  let stateToReturn = _.cloneDeep(state);
  stateToReturn.isLoading = false;
  return stateToReturn;
};

const handleLogInSuccess = (state, payload) => {
  let stateToReturn = _.cloneDeep(state);

  const { _id, name, email, token } = payload;
  stateToReturn.failedAttempt = false;
  stateToReturn.authenticated = true;

  stateToReturn.user._id = _id;
  stateToReturn.user.name = name;
  stateToReturn.user.email = email;
  stateToReturn.token = token;

  return stateToReturn;
};

const handleFailedLogIn = state => {
  let stateToReturn = _.cloneDeep(state);

  stateToReturn.failedAttempt = true;
  return stateToReturn;
};

const auth = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case INIT_AUTH:
      return handleInitAuth(state);
    case CLOSE_AUTH:
      return handleCloseAuth(state);
    case LOGIN_SUCCES:
      return handleLogInSuccess(state, payload);
    case INIT_LOGOUT:
      return {
        authenticated: false,
        isLoading: false,
        token: undefined,
        user: {
          _id: undefined,
          name: undefined,
          email: undefined
        }
      };
    case LOGIN_FAILED:
      return handleFailedLogIn(state);
    default:
      return state;
  }
};

export default auth;
