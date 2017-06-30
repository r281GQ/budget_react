import { createSelector } from "reselect";
import * as _ from "lodash";

const accounts = state => state.model.accounts.data;

const totalBalanceCounter = accounts => {


  let total = _.reduce(
    accounts,
    (sum, account) => {
      return sum + account.currentBalance;
    },
    0
  );

  if(_.isNaN(total))
    return 0;
  return total;
};

export default createSelector(accounts, totalBalanceCounter);
