import * as _ from "lodash";

import {
  UPDATE_DATE,
  UPDATE_TERM,
  SELECT_ACCOUNT,
  DESELECT_ACCOUNT,
  SELECT_GROUPING,
  DESELECT_GROUPING,
  SELECT_BUDGET,
  DESELECT_BUDGET
} from "./../actions/filterActions";

const INITIAL_STATE = {
  account: 0,
  budget: 0,
  equity: 0,
  grouping: 0,
  date: "All",
  term: ""
};

const handleUpdateDate = (state, payload) => {
  let news = _.cloneDeep(state);
  news.date = payload;
  return news;
};

const handleUpdateTerm = (state, payload) => {
  let news = _.cloneDeep(state);
  news.term = payload;
  return news;
};

const handleSelectAccount = (state, payload) => {
  let news = _.cloneDeep(state);
  news.account = payload;
  return news;
};

const handleDeSelectAccount = state => {
  let news = _.cloneDeep(state);
  news.account = 0;
  return news;
};

const handleSelectGrouping = (state, payload) => {
  let news = _.cloneDeep(state);
  news.grouping = payload;
  return news;
};

const handleDeSelectGrouping = state => {
  let news = _.cloneDeep(state);
  news.grouping = 0;
  return news;
};

const handleSelectBudget = (state, payload) => {
  let news = _.cloneDeep(state);
  news.budget = payload;
  return news;
};

const handleDeSelectBudget = state => {
  let news = _.cloneDeep(state);
  news.budget = 0;
  return news;
};

const filter = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case UPDATE_DATE:
      return handleUpdateDate(state, payload);
    case UPDATE_TERM:
      return handleUpdateTerm(state, payload);
    case SELECT_ACCOUNT:
      return handleSelectAccount(state, payload);
    case DESELECT_ACCOUNT:
      return handleDeSelectAccount(state);
    case SELECT_GROUPING:
      return handleSelectGrouping(state, payload);
    case DESELECT_GROUPING:
      return handleDeSelectGrouping(state);
    case SELECT_BUDGET:
      return handleSelectBudget(state, payload);
    case DESELECT_BUDGET:
      return handleDeSelectBudget(state);
    default:
      return state;
  }
};

export default filter;
