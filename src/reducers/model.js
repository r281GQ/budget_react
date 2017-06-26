import axios from "axios";
import * as _ from "lodash";
import uuid from "uuid";

import {
  WRITE_ACCOUNT,
  WIPE_ACCOUNTS,
  WRITE_ACCOUNTS,
  WRITE_GROUPINGS,
  INIT_API,
  CLOSE_API,
  CREATE_SUCCESS_MESSAGE,
  CREATE_ERROR_MESSAGE,
  DISMISS_MESSAGE,
  WIPE_GROUPING,
  WRITE_GROUPING,
  REMOVE_ACCOUNT,
  REMOVE_GROUPING,
  SELECT_GROUPING,
  WRITE_TRANSACTION,
  WRITE_TRANSACTIONS,
  WIPE_TRANSACTIONS,
  REMOVE_TRANSACTION,
  WRITE_BUDGET,
  WRITE_BUDGETS,
  REMOVE_BUDGET,
  WIPE_BUDGETS
} from "./../actions/modelActions";

const DANGER = "danger";
const SUCCESS = "success";

const initialModelState = {
  create: false,
  messages: [],
  isLoading: false,
  transactions: {
    data: {}
  },
  accounts: {
    data: {
      0: {
        _id: 0,
        name: "No account"
      }
    }
  },
  groupings: {
    data: {
      0: {
        _id: 0,
        name: "No grouping"
      }
    }
  },
  budgets: {
    data: {
      0: {
        _id: 0,
        name: "No budget"
      }
    }
  }
};

const handleWriteGrouping = (state, payload) => {
  let { _id } = payload;
  let newState = _.cloneDeep(state);
  delete newState.groupings.data[0];
  newState.groupings.data[_id] = payload;
  return newState;
};

const handleWriteAccount = (state, payload) => {
  let { _id } = payload;
  let newState = _.cloneDeep(state);
  newState.accounts.data[_id] = payload;
  return newState;
};

const handleWriteAccounts = (state, payload) => {
  let newState = _.cloneDeep(state);
  if (_.size(payload) !== 0) delete newState.accounts.data[0];

  _.map(payload, account => {
    let { _id } = account;
    newState.accounts.data[_id] = account;
  });

  return newState;
};

const handleWriteGroupings = (state, payload) => {
  let newState = _.cloneDeep(state);
  if (_.size(payload) !== 0) delete newState.groupings.data[0];
  _.map(payload, grouping => {
    let { _id } = grouping;
    newState.groupings.data[_id] = grouping;
  });
  return newState;
};

const handleWipeAccount = state => {
  let newState = _.cloneDeep(state);
  newState.accounts.data = {
    0: {
      _id: 0,
      name: "No account"
    }
  };
  return newState;
};

const handleWipeGrouping = state => {
  let newState = _.cloneDeep(state);
  newState.groupings.data = {
    0: {
      _id: 0,
      name: "No grouping"
    }
  };
  return newState;
};

const handleWipeBudget = state => {
  let newState = _.cloneDeep(state);
  newState.budgets.data = {
    0: {
      _id: 0,
      name: "No budget"
    }
  };
  return newState;
};

const handleInitApi = state => {
  let newState = _.cloneDeep(state);
  newState.isLoading = true;
  return newState;
};

const handleCloseApi = state => {
  let newState = _.cloneDeep(state);
  newState.isLoading = false;
  return newState;
};

const handleCreateSuccessMessage = (state, payload) => {
  let newState = _.cloneDeep(state);
  newState.messages.push({ _id: uuid(), message: payload, type: SUCCESS });
  return newState;
};

const handleCreateErrorMessage = (state, payload) => {
  let newState = _.cloneDeep(state);
  newState.messages.push({
    _id: uuid(),
    message: payload,
    type: DANGER
  });
  return newState;
};

const handleDismissMessage = (state, payload) => {
  let newState = _.cloneDeep(state);
  _.remove(newState.messages, msg => msg._id === payload);
  return newState;
};

const handleRemoveAccount = (state, payload) => {
  let newState = _.cloneDeep(state);
  delete newState.accounts.data[payload];

  newState.transactions.data = _.omitBy(
    newState.transactions.data,
    (value, key) => value.account === payload
  );
  return newState;
};

const handleRemoveGrouping = (state, payload) => {
  let newState = _.cloneDeep(state);
  delete newState.groupings.data[payload];

  newState.transactions.data = _.omitBy(
    newState.transactions.data,
    (value, key) => value.grouping === payload
  );

  if (_.isEmpty(newState.groupings.data)) {
    newState.groupings.data[0] = {
      name: "no grouping",
      _id: 0
    };
  }
  return newState;
};

const handleRemoveTransaction = (state, payload) => {
  let newState = _.cloneDeep(state);
  delete newState.transactions.data[payload];
  return newState;
};

const handleWriteTransaction = (state, payload) => {
  let newState = _.cloneDeep(state);
  newState.transactions.data[payload._id] = payload;
  return newState;
};

const handleWriteTransactions = (state, payload) => {
  let newState = _.cloneDeep(state);
  _.map(payload, transaction => {
    newState.transactions.data[transaction._id] = transaction;
  });
  return newState;
};

const handleWipeTransactions = state => {
  let newState = _.cloneDeep(state);
  newState.transactions.data = {};
  return newState;
};

const handleWriteBudget = (state, payload) => {
  let newState = _.cloneDeep(state);
  if (_.size(payload) !== 0) delete newState.groupings.data[0];
  newState.budgets.data[payload._id] = payload;
  return newState;
};

const handleWriteBudgets = (state, payload) => {
  let newState = _.cloneDeep(state);
  if (_.size(payload) !== 0) delete newState.budgets.data[0];
  _.map(payload, budget => {
    let { _id } = budget;
    newState.budgets.data[_id] = budget;
  });
  return newState;
};

const model = (state = initialModelState, { type, payload }) => {
  switch (type) {
    case REMOVE_TRANSACTION:
      return handleRemoveTransaction(state, payload);
    case WRITE_TRANSACTION:
      return handleWriteTransaction(state, payload);
    case WRITE_TRANSACTIONS:
      return handleWriteTransactions(state, payload);
    case CREATE_SUCCESS_MESSAGE:
      return handleCreateSuccessMessage(state, payload);
    case REMOVE_ACCOUNT:
      return handleRemoveAccount(state, payload);
    case REMOVE_GROUPING:
      return handleRemoveGrouping(state, payload);
    case CREATE_ERROR_MESSAGE:
      return handleCreateErrorMessage(state, payload);
    case DISMISS_MESSAGE:
      return handleDismissMessage(state, payload);
    case INIT_API:
      return handleInitApi(state);
    case CLOSE_API:
      return handleCloseApi(state);
    case WRITE_ACCOUNT:
      return handleWriteAccount(state, payload);
    case WRITE_GROUPING:
      return handleWriteGrouping(state, payload);
    case WRITE_ACCOUNTS:
      return handleWriteAccounts(state, payload);
    case WRITE_GROUPINGS:
      return handleWriteGroupings(state, payload);
    case WIPE_ACCOUNTS:
      return handleWipeAccount(state);
    case WIPE_GROUPING:
      return handleWipeGrouping(state);
    case WIPE_BUDGETS:
      return handleWipeBudget(state);
    case WIPE_TRANSACTIONS:
      return handleWipeTransactions(state);
    case WRITE_BUDGET:
      return handleWriteBudget(state, payload);
    case WRITE_BUDGETS:
      return handleWriteBudgets(state, payload);
    default:
      return state;
  }
};

export default model;
