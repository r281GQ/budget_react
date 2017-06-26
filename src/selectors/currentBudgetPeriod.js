import { createSelector } from "reselect";
import * as _ from "lodash";
import moment from "moment";

const budgets = state => state.model.budgets.data;

const selector = budgets => {
  const currentMonth = moment().format("MM-YYYY");

  let currentBudgetPeriods = _.reduce(
    budgets,
    (sum, budget) => {
      let currentPeriod = _.find(
        budget.budgetPeriods,
        bp => moment(bp.month).format("MM-YYYY") === currentMonth
      );

      if (currentPeriod) {
        currentPeriod.name = budget.name;
        currentPeriod.budgetId = budget._id;
        sum.push(currentPeriod);
      }
      return sum;
    },
    []
  );

  return currentBudgetPeriods;
};

const currentBudgetPeriods = createSelector(budgets, selector);

export default currentBudgetPeriods;
