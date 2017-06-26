import axios from "axios";
import { push } from "react-router-redux";

import {
  getAccounts,
  getGroupings,
  getTransactions,
  initialFetch
} from "./../actionCreators/modelActionCreators";
import { saveToken, getToken, removeToken } from "./../services/localStorage";
import {
  CREATE_ERROR_MESSAGE,
  CREATE_SUCCESS_MESSAGE
} from "./../actions/modelActions";

const getMe = () => (dispatch, getState) => {
  dispatch({ type: INIT_AUTH });
  if (!getState().auth.authenticated) {
    if (getToken() !== null) {
      let config = {
        url: `http://localhost:2000/api/whoAmI`,
        method: "GET",
        timeout: 1000,
        headers: {
          "x-auth": getToken()
        }
      };
      axios(config)
        .then(response => {
          let { _id, name, email } = response.data;
          dispatch({
            type: LOGIN_SUCCES,
            payload: {
              _id,
              name,
              email,
              token: getToken()
            }
          });
          dispatch(initialFetch());
          dispatch(push("/transaction"));
          dispatch({ type: CLOSE_AUTH });
        })
        .catch(error => {
          dispatch({ type: CLOSE_AUTH });
        });
    } else {
      dispatch({ type: CLOSE_AUTH });
    }
  }
};

const initAuth = userInfo => {
  let authRequest = axios.post("http://localhost:2000/api/logIn", userInfo);

  return dispatch => {
    dispatch({ type: INIT_AUTH });

    authRequest
      .then(response => {
        let { _id, name, email } = response.data;
        let token = response.headers["x-auth"];
        dispatch({
          type: LOGIN_SUCCES,
          payload: {
            _id,
            name,
            email,
            token
          }
        });

        dispatch(initialFetch());
        saveToken(response.headers["x-auth"]);
        dispatch({
          type: CREATE_SUCCESS_MESSAGE,
          payload: `Welcome back ${name}`
        });
        dispatch({ type: CLOSE_AUTH });
        dispatch(push("/transaction"));
      })
      .catch(error => {
        dispatch({ type: LOGIN_FAILED });
        dispatch({ type: CLOSE_AUTH });
      });
  };
};

const initLogOut = () => dispatch => {
  removeToken();
  dispatch({ type: INIT_LOGOUT });
};

const initSignUp = userInfo => {
  let authRequest = axios.post("http://localhost:2000/api/signUp", userInfo);
  return dispatch => {
    dispatch({ type: INIT_AUTH });
    authRequest
      .then(response => {
        dispatch({
          type: LOGIN_SUCCES,
          payload: {
            _id: response.data._id,
            name: response.data.name,
            email: response.data.email,
            token: response.headers["x-auth"]
          }
        });
        dispatch({ type: CLOSE_AUTH });
      })
      .catch(error => {
        dispatch({ type: LOGIN_FAILED });
        dispatch({ type: CLOSE_AUTH });
      });
  };
};

export const INIT_AUTH = "INIT_AUTH";
export const CLOSE_AUTH = "CLOSE_AUTH";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGIN_SUCCES = "LOGIN_SUCCES";
export const INIT_LOGOUT = "INIT_LOGOUT";

export { initAuth, initLogOut, initSignUp, getMe };
