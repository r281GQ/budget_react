import { createSelector } from "reselect";
import * as _ from "lodash";
import moment from "moment";

const transactions = state => state.model.transactions.data;

const months = transactions =>
  _.uniq(
    _.reduce(
      transactions,
      (sum, transaction) => {
        sum.push(moment(transaction.date).format("MM-YYYY"));
        return sum;
      },
      ["All"]
    )
  );

export default createSelector(transactions, months);
