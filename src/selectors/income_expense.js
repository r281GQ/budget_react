import { createSelector } from "reselect";
import moment from "moment";
import * as _ from "lodash";

const transactions = state => state.model.transactions.data;

const groupings = state => state.model.groupings.data;

const date = state => state.filter.date;

const term = state => state.filter.term;

const account = state => state.filter.account;

const grouping = state => state.filter.grouping;

const equity = state => state.filter.equity;

const budget = state => state.filter.budget;

//TODO: replace === to isSame with momemnt.js
const selectorFactory = type => (
  transactions,
  groupings,
  term,
  date,
  account,
  grouping,
  budget
) => {
  return _.filter(transactions, transaction => {
    if (!transaction.grouping) return false;
    if (!groupings[transaction.grouping]) return false;
    return (
      groupings[transaction.grouping].type === type &&
      (date === "All"
        ? true
        : moment(transaction.date).format("MM-YYYY") === date) &&
      (_.includes(transaction.name, term) ||
        _.includes(transaction.memo, term)) &&
      (grouping === 0 ? true : transaction.grouping === grouping) &&
      (budget === 0 ? true : transaction.budget === budget) &&
      (account === 0 ? true : transaction.account === account)
    );
  });
};

const selectExpenses = createSelector(
  transactions,
  groupings,
  term,
  date,
  account,
  grouping,
  budget,
  selectorFactory("expense")
);
const selectIncomes = createSelector(
  transactions,
  groupings,
  term,
  date,
  account,
  grouping,
  budget,
  selectorFactory("income")
);

export { selectExpenses, selectIncomes };
