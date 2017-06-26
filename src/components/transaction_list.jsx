import React from "react";
import * as _ from "lodash";
import { Field } from "redux-form";
import moment from "moment";

import InputField from "./../components/input-field";
import SelectField from "./../components/select-field";

import "./transaction_list.css";

const renderBudget = (type, transaction, budgets) => {
  if (type === "expense" && budgets[transaction.budget]) {
    return (
      <span>
        <span className="fieldName">
          Budget: {' '}
        </span>
        <span className="fieldValue">
          {transaction.budget ? budgets[transaction.budget].name  : "No budget"}
        </span>
      </span>
    );
  }
  return '';
};

const renderElements = (
  transactions,
  {
    onEditFormSelectedHandler,
    onShowDeleteConsent,
    onHideDeleteConsent,
    onDeleteHandler
  },
  accounts,
  groupings,
  budgets,
  showDeleteConsent,
  selectedId
) =>
  _.map(transactions, transaction => {
    let deleteConsent = selectedId === transaction._id && showDeleteConsent;

    return (
      <li className="list-group-item" key={transaction._id}>
        <div>
          <div>
            <span className="fieldName">
              Name:
            </span>{" "}
            <span className="fieldValue"> {transaction.name}</span>{" "}
            <span className="fieldName">
              Amount:{" "}
            </span>{" "}
            <span className="fieldValue"> {transaction.amount} </span>{" "}
            <span className="fieldName">
              Memo:{" "}
            </span>{" "}
            <span className="fieldValue">   {transaction.memo}  </span>{" "}
            <span className="fieldName">
              Date:{" "}
            </span>{" "}
            <span className="fieldValue">
              {" "}{moment(transaction.date).format("dddd, MMMM Do YYYY")}
            </span>{" "}
          </div>
          <div>
            <span className="fieldName">
              Account:{" "}
            </span>{" "}
            <span className="fieldValue">
              {accounts[transaction.account].name}{" "}
            </span>{" "}
            <span className="fieldName">
              Grouping:{" "}
            </span>{" "}
            <span className="fieldValue">
              {" "}{groupings[transaction.grouping].name}{" "}
            </span>{" "}

            {renderBudget(
              groupings[transaction.grouping].type,
              transaction,
              budgets
            )}

          </div>
        </div>
        {deleteConsent
          ? <div>
              Sure you want to delete this transaction?{" "}
              <button
                className="btn btn-default"
                onClick={onDeleteHandler(transaction._id)}
              >
                Delete
              </button>{" "}
              <button className="btn btn-default" onClick={onHideDeleteConsent}>
                Cancel
              </button>
            </div>
          : <div>
              <button
                className="btn btn-default"
                onClick={onEditFormSelectedHandler(transaction._id)}
              >
                Edit
              </button>
              <button
                className="btn btn-default"
                onClick={onShowDeleteConsent(transaction._id)}
              >
                Delete
              </button>
            </div>}

      </li>
    );
  });

const TransactionList = ({
  models: { incomes, expenses, accounts, groupings, budgets },
  handlers,
  selectedId,
  showDeleteConsent
}) => {
  return (
    <div className="row">
      <div className="col-md-6 col-lg-6">
        <div className="page-header header">Incomes</div>
        <ul>
          {renderElements(
            incomes,
            handlers,
            accounts,
            groupings,
            budgets,
            showDeleteConsent,
            selectedId
          )}
        </ul>
      </div>
      <div className="col-md-6 col-lg-6">
        <div className="page-header header">Expenses</div>
        <ul>
          {renderElements(
            expenses,
            handlers,
            accounts,
            groupings,
            budgets,
            showDeleteConsent,
            selectedId
          )}
        </ul>
      </div>
    </div>
  );
};

export default TransactionList;
