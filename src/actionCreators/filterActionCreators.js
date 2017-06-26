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

const applyDate = date => dispatch =>
  dispatch({ type: UPDATE_DATE, payload: date });
const applyTerm = term => dispatch =>
  dispatch({ type: UPDATE_TERM, payload: term });

const applyAccountSelection = _id => (dispatch, getState) => {
  if (_id === getState().filter.account)
    return dispatch({ type: DESELECT_ACCOUNT });
  return dispatch({ type: SELECT_ACCOUNT, payload: _id });
};

const applyGroupingSelection = _id => (dispatch, getState) => {
  if (_id === getState().filter.grouping)
    return dispatch({ type: DESELECT_GROUPING });
  return dispatch({ type: SELECT_GROUPING, payload: _id });
};

const applyBudgetSelection = _id => (dispatch, getState) => {
  if (_id === getState().filter.budget)
    return dispatch({ type: DESELECT_BUDGET });
  return dispatch({ type: SELECT_BUDGET, payload: _id });
};

export {
  applyDate,
  applyTerm,
  applyAccountSelection,
  applyGroupingSelection,
  applyBudgetSelection
};
