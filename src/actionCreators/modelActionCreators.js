import axios from "axios";
import * as _ from "lodash";

import {
  WRITE_ACCOUNT,
  WRITE_ACCOUNTS,
  WIPE_ACCOUNTS,
  INIT_API,
  CLOSE_API,
  CREATE_SUCCESS_MESSAGE,
  CREATE_ERROR_MESSAGE,
  DISMISS_MESSAGE,
  WRITE_GROUPING,
  WRITE_GROUPINGS,
  WIPE_GROUPING,
  REMOVE_ACCOUNT,
  REMOVE_GROUPING,
  REMOVE_TRANSACTION,
  SELECT_GROUPING,
  WRITE_TRANSACTION,
  WRITE_TRANSACTIONS,
  WIPE_TRANSACTIONS,
  WRITE_BUDGET,
  WRITE_BUDGETS,
  REMOVE_BUDGET,
  WIPE_BUDGETS
} from "./../actions/modelActions";

const BASE_URL = "http://localhost:2000/api";

const getBudgetsConfigCreator = getState => ({
  url: `${BASE_URL}/budget`,
  method: "GET",
  timeout: 1000,
  headers: {
    "x-auth": getState().auth.token
  }
});

const getTransactionsConfigCreator = getState => ({
  url: `${BASE_URL}/transaction`,
  method: "GET",
  timeout: 1000,
  headers: {
    "x-auth": getState().auth.token
  }
});

const getGroupingsConfigCreator = getState => ({
  url: `${BASE_URL}/grouping`,
  method: "GET",
  timeout: 1000,
  headers: {
    "x-auth": getState().auth.token
  }
});

const getAccountsConfigCreator = getState => ({
  url: `${BASE_URL}/account`,
  method: "GET",
  timeout: 1000,
  headers: {
    "x-auth": getState().auth.token
  }
});

const createAccount = ({ name, initialBalance, currency }) => (
  dispatch,
  getState
) => {
  if (!getState().auth.authenticated) return;
  let config = {
    url: `${BASE_URL}/account`,
    method: "POST",
    data: {
      name,
      initialBalance,
      currency
    },
    timeout: 1000,
    headers: {
      "x-auth": getState().auth.token
    }
  };
  dispatch({ type: INIT_API });
  axios(config)
    .then(response => {
      dispatch({ type: WRITE_ACCOUNT, payload: response.data });
      dispatch({ type: CLOSE_API });
      dispatch({
        type: CREATE_SUCCESS_MESSAGE,
        payload: `Account was created!`
      });
    })
    .catch(error => {
      dispatch({ type: CLOSE_API });
      dispatch({
        type: CREATE_ERROR_MESSAGE,
        payload: `Couldn't create account!`
      });
    });
};

const getAccounts = () => (dispatch, getState) => {
  if (!getState().auth.authenticated) return;
  dispatch({ type: INIT_API });
  axios({
    url: `${BASE_URL}/account`,
    method: "GET",
    timeout: 1000,
    headers: {
      "x-auth": getState().auth.token
    }
  })
    .then(response => {
      dispatch({ type: WIPE_ACCOUNTS });
      dispatch({ type: WRITE_ACCOUNTS, payload: response.data });
      dispatch({ type: CLOSE_API });
    })
    .catch(error => {
      dispatch({ type: CLOSE_API });
      dispatch({
        type: CREATE_ERROR_MESSAGE,
        payload: `Couldn't load accounts!`
      });
    });
};

const createGrouping = ({ name, type }) => (dispatch, getState) => {
  if (!getState().auth.authenticated) return;
  dispatch({ type: INIT_API });
  axios({
    url: `${BASE_URL}/grouping`,
    method: "POST",
    timeout: 1000,
    headers: {
      "x-auth": getState().auth.token
    },
    data: {
      name,
      type
    }
  })
    .then(response => {
      dispatch({ type: WRITE_GROUPING, payload: response.data });
      dispatch({ type: CLOSE_API });
      dispatch({
        type: CREATE_SUCCESS_MESSAGE,
        payload: `Grouping was created!`
      });
    })
    .catch(error => {
      dispatch({ type: CLOSE_API });
      dispatch({
        type: CREATE_ERROR_MESSAGE,
        payload: `Couldn't create grouping!`
      });
    });
};

const getGroupings = () => (dispatch, getState) => {
  if (!getState().auth.authenticated) return;
  let config = {
    url: `${BASE_URL}/grouping`,
    method: "GET",
    timeout: 1000,
    headers: {
      "x-auth": getState().auth.token
    }
  };
  dispatch({ type: INIT_API });
  axios(config)
    .then(response => {
      dispatch({ type: WIPE_GROUPING });
      dispatch({ type: WRITE_GROUPINGS, payload: response.data });
      dispatch({ type: CLOSE_API });
    })
    .catch(error => {
      dispatch({ type: CLOSE_API });
      dispatch({
        type: CREATE_ERROR_MESSAGE,
        payload: `Couldn't load groupings!`
      });
    });
};

const deleteAccount = _id => (dispatch, getState) => {
  if (!getState().auth.authenticated) return;
  dispatch({ type: INIT_API });
  axios({
    url: `${BASE_URL}/account/${_id}`,
    method: "DELETE",
    timeout: 1000,
    headers: {
      "x-auth": getState().auth.token
    }
  })
    .then(response => {
      dispatch({ type: REMOVE_ACCOUNT, payload: _id });
      return axios(getTransactionsConfigCreator(getState));
    })
    .then(response => {
      dispatch({ type: WIPE_TRANSACTIONS });
      dispatch({ type: WRITE_TRANSACTIONS, payload: response.data });
      return axios(getBudgetsConfigCreator(getState));
    })
    .then(response => {
      dispatch({ type: WIPE_BUDGETS });
      dispatch({ type: WRITE_BUDGETS, payload: response.data });
      dispatch({ type: CLOSE_API });
    })
    .catch(error => {
      dispatch({ type: CLOSE_API });
      dispatch({
        type: CREATE_ERROR_MESSAGE,
        payload: `Couldn't delete accounts!`
      });
    });
};

const deleteGrouping = _id => (dispatch, getState) => {
  if (!getState().auth.authenticated) return;

  dispatch({ type: INIT_API });
  axios({
    url: `${BASE_URL}/grouping/${_id}`,
    method: "DELETE",
    timeout: 1000,
    headers: {
      "x-auth": getState().auth.token
    }
  })
    .then(response => {
      dispatch({ type: REMOVE_GROUPING, payload: _id });
      return axios(getAccountsConfigCreator(getState));
    })
    .then(response => {
      dispatch({ type: WIPE_ACCOUNTS });
      dispatch({ type: WRITE_ACCOUNTS, payload: response.data });
      return axios(getTransactionsConfigCreator(getState));
    })
    .then(response => {
      dispatch({ type: WIPE_TRANSACTIONS });
      dispatch({ type: WRITE_TRANSACTIONS, payload: response.data });
      dispatch({ type: CLOSE_API });
      dispatch({
        type: CREATE_SUCCESS_MESSAGE,
        payload: `Grouping was removed!`
      });
    })
    .catch(error => {
      dispatch({ type: CLOSE_API });
      dispatch({
        type: CREATE_ERROR_MESSAGE,
        payload: `Couldn't delete grouping!`
      });
    });
};

const updateAccount = ({ name, _id }) => (dispatch, getState) => {
  if (!getState().auth.authenticated) return;
  dispatch({ type: INIT_API });
  axios({
    url: `${BASE_URL}/account`,
    method: "PUT",
    timeout: 1000,
    data: {
      name,
      _id
    },
    headers: {
      "x-auth": getState().auth.token
    }
  })
    .then(response => {
      dispatch({ type: WRITE_ACCOUNT, payload: response.data });
      dispatch({ type: CLOSE_API });
      dispatch({
        type: CREATE_SUCCESS_MESSAGE,
        payload: `Account was updated!`
      });
    })
    .catch(error => {
      dispatch({ type: CLOSE_API });
      dispatch({
        type: CREATE_ERROR_MESSAGE,
        payload: `Couldn't update account!`
      });
    });
};

const updateGrouping = ({ name, _id }) => (dispatch, getState) => {
  if (!getState().auth.authenticated) return;
  dispatch({ type: INIT_API });
  axios({
    url: `${BASE_URL}/grouping`,
    method: "PUT",
    timeout: 1000,
    data: {
      name,
      _id
    },
    headers: {
      "x-auth": getState().auth.token
    }
  })
    .then(response => {
      dispatch({ type: WRITE_GROUPING, payload: response.data });
      dispatch({ type: CLOSE_API });
      dispatch({
        type: CREATE_SUCCESS_MESSAGE,
        payload: `Grouping was updated!`
      });
    })
    .catch(error => {
      console.log(error);
      dispatch({ type: CLOSE_API });
      dispatch({
        type: CREATE_ERROR_MESSAGE,
        payload: `Couldn't update grouping!`
      });
    });
};

const initialFetch = () => (dispatch, getState) => {
  if (!getState().auth.authenticated) return;

  dispatch({ type: INIT_API });

  Promise.all([
    axios(getAccountsConfigCreator(getState)),
    axios(getGroupingsConfigCreator(getState)),
    axios(getBudgetsConfigCreator(getState)),
    axios(getTransactionsConfigCreator(getState))
  ])
    .then(response => {
      dispatch({ type: WIPE_ACCOUNTS });
      dispatch({ type: WRITE_ACCOUNTS, payload: response[0].data });

      dispatch({ type: WIPE_GROUPING });
      dispatch({ type: WRITE_GROUPINGS, payload: response[1].data });

      dispatch({ type: WIPE_BUDGETS });
      dispatch({ type: WRITE_BUDGETS, payload: response[2].data });

      dispatch({ type: WIPE_TRANSACTIONS });
      dispatch({ type: WRITE_TRANSACTIONS, payload: response[3].data });

      dispatch({ type: CLOSE_API });
    })
    .catch(error => {
      dispatch({ type: CLOSE_API });
      dispatch({
        type: CREATE_ERROR_MESSAGE,
        payload: `Couldn't reach the database!`
      });
    });
};

const getTransactions = () => (dispatch, getState) => {
  if (!getState().auth.authenticated) return;

  dispatch({ type: INIT_API });

  axios({
    url: `${BASE_URL}/transaction`,
    method: "GET",
    timeout: 1000,
    headers: {
      "x-auth": getState().auth.token
    }
  })
    .then(response => {
      dispatch({ type: WIPE_TRANSACTIONS });
      dispatch({ type: WRITE_TRANSACTIONS, payload: response.data });

      dispatch({ type: CLOSE_API });
    })
    .catch(error => {
      dispatch({ type: CLOSE_API });
      dispatch({
        type: CREATE_ERROR_MESSAGE,
        payload: `Couldn't load transactions!`
      });
    });
};

const createTransaction = ({
  name,
  amount,
  grouping,
  account,
  currency,
  memo,
  budget
}) => (dispatch, getState) => {
  if (!getState().auth.authenticated) return;
  dispatch({ type: INIT_API });
  axios({
    url: `${BASE_URL}/transaction`,
    method: "POST",
    timeout: 1000,
    data: {
      name,
      amount,
      grouping,
      account,
      currency,
      memo,
      budget
    },
    headers: {
      "x-auth": getState().auth.token
    }
  })
    .then(response => {
      dispatch({ type: WRITE_TRANSACTION, payload: response.data });

      return Promise.all([
        axios(getAccountsConfigCreator(getState)),
        axios(getBudgetsConfigCreator(getState))
      ]);
    })
    .then(response => {
      dispatch({ type: WIPE_ACCOUNTS });
      dispatch({ type: WRITE_ACCOUNTS, payload: response[0].data });

      dispatch({ type: WIPE_BUDGETS });
      dispatch({ type: WRITE_BUDGETS, payload: response[1].data });

      dispatch({ type: CLOSE_API });
      dispatch({
        type: CREATE_SUCCESS_MESSAGE,
        payload: `Transaction was created!`
      });
    })
    .catch(error => {
      dispatch({ type: CLOSE_API });
      dispatch({
        type: CREATE_ERROR_MESSAGE,
        payload: `Couldn't create transaction!`
      });
    });
};

const deleteTransaction = _id => (dispatch, getState) => {
  if (!getState().auth.authenticated) return;
  dispatch({ type: INIT_API });

  axios({
    url: `${BASE_URL}/transaction/${_id}`,
    method: "DELETE",
    timeout: 1000,
    headers: {
      "x-auth": getState().auth.token
    }
  })
    .then(response => {
      dispatch({ type: REMOVE_TRANSACTION, payload: _id });
      return Promise.all([
        axios(getAccountsConfigCreator(getState)),
        axios(getBudgetsConfigCreator(getState))
      ]);
    })
    .then(response => {
      dispatch({ type: WIPE_ACCOUNTS });
      dispatch({ type: WRITE_ACCOUNTS, payload: response[0].data });

      dispatch({ type: WIPE_BUDGETS });
      dispatch({ type: WRITE_BUDGETS, payload: response[1].data });

      dispatch({
        type: CREATE_SUCCESS_MESSAGE,
        payload: "Transaction was deleted!"
      });

      dispatch({ type: CLOSE_API });
    })
    .catch(error => {
      dispatch({
        type: CREATE_ERROR_MESSAGE,
        payload: `Couldn't delete transaction.`
      });
      dispatch({ type: CLOSE_API });
    });
};

const updateTransaction = ({
  _id,
  name,
  amount,
  grouping,
  account,
  currency,
  memo,
  budget
}) => (dispatch, getState) => {
  if (!getState().auth.authenticated) return;
  dispatch({ type: INIT_API });

  axios({
    url: `${BASE_URL}/transaction`,
    method: "PUT",
    timeout: 1000,
    data: {
      _id,
      name,
      amount,
      grouping,
      account,
      currency,
      memo,
      budget
    },
    headers: {
      "x-auth": getState().auth.token
    }
  })
    .then(response => {
      dispatch({ type: WRITE_TRANSACTION, payload: response.data });

      return Promise.all([
        axios(getAccountsConfigCreator(getState)),
        axios(getBudgetsConfigCreator(getState))
      ]);
    })
    .then(response => {
      dispatch({ type: WIPE_ACCOUNTS });
      dispatch({ type: WRITE_ACCOUNTS, payload: response[0].data });

      dispatch({ type: WIPE_BUDGETS });
      dispatch({ type: WRITE_BUDGETS, payload: response[1].data });

      dispatch({ type: CLOSE_API });
      dispatch({
        type: CREATE_SUCCESS_MESSAGE,
        payload: `Transaction was updated!`
      });
    })
    .catch(error => {
      dispatch({ type: CLOSE_API });
      dispatch({
        type: CREATE_ERROR_MESSAGE,
        payload: `Couldn't update transaction!`
      });
    });
};

const disMissMessage = _id => dispatch =>
  dispatch({ type: DISMISS_MESSAGE, payload: _id });

const getBudgets = () => (dispatch, getState) => {
  if (!getState().auth.authenticated) return;
  dispatch({ type: INIT_API });

  axios(getBudgetsConfigCreator(getState))
    .then(response => {
      dispatch({ type: WIPE_BUDGETS });
      dispatch({ type: WRITE_BUDGETS, payload: response.data });

      dispatch({ type: CLOSE_API });
    })
    .catch(error => {
      dispatch({
        type: CREATE_ERROR_MESSAGE,
        payload: `Couldn't load budgets!`
      });
    });
};

const deleteBudget = _id => (dispatch, getState) => {
  if (!getState().auth.authenticated) return;
  dispatch({ type: INIT_API });
};

const updateBudget = ({ defaultAllowance, name }) => (dispatch, getState) => {
  if (!getState().auth.authenticated) return;
  dispatch({ type: INIT_API });
};

const createBudget = ({ name, defaultAllowance, currency }) => (
  dispatch,
  getState
) => {
  if (!getState().auth.authenticated) return;
  dispatch({ type: INIT_API });

  axios({
    url: `${BASE_URL}/budget`,
    method: "POST",
    timeout: 1000,
    data: {
      name,
      defaultAllowance,
      currency
    },
    headers: {
      "x-auth": getState().auth.token
    }
  })
    .then(response => {
      dispatch({ type: WRITE_BUDGET, payload: response.data });
      dispatch({ type: CLOSE_API });

      dispatch({
        type: CREATE_SUCCESS_MESSAGE,
        payload: `Budget was created!`
      });
    })
    .catch(error => {
      dispatch({ type: CLOSE_API });
      dispatch({
        type: CREATE_ERROR_MESSAGE,
        payload: `Couldn't create budget!`
      });
    });
};

export {
  getBudgets,
  deleteBudget,
  updateBudget,
  createBudget,
  getGroupings,
  getAccounts,
  createAccount,
  createGrouping,
  disMissMessage,
  deleteAccount,
  updateAccount,
  deleteGrouping,
  updateGrouping,
  createTransaction,
  getTransactions,
  updateTransaction,
  initialFetch,
  deleteTransaction
};
