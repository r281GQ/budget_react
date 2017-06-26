import React from "react";
import { Field } from "redux-form";
import InputField from "./input-field";
import SelectField from "./select-field";
import * as _ from "lodash";

const TransactionForm = ({
  handlers: { onSubmitHandler, onCancelHandler },
  buttonNames: { submit, cancel },
  formProps: { invalid, pristine },
  models: { accounts, groupings, budgets },
  validators: { name, amount }
}) => {
  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <Field
          component={InputField}
          type="text"
          name="name"
          label="Name"
          validate={name}
        />
        <Field component={InputField} type="text" name="memo" label="Memo" />
        <Field
          component={InputField}
          type="number"
          name="amount"
          label="Amount"
          validate={amount}
        />
        <Field component={SelectField} name="currency" label="Currency">
          <option value="GBP"> GBP </option>

        </Field>
        <Field component={SelectField} name="account" label="Account">
          {_.map(accounts, account =>
            <option key={account._id} value={account._id}>
              {account.name}
            </option>
          )}
        </Field>
        <Field component={SelectField} name="grouping" label="Grouping">
          {_.map(groupings, grouping =>
            <option key={grouping._id} value={grouping._id}>
              {grouping.name}
            </option>
          )}
        </Field>

        <Field component={SelectField} name="budget" label="Budget">
          <option key={0} value={0}>
            No budget
          </option>
          {_.map(budgets, budget =>
            <option key={budget._id} value={budget._id}>
              {budget.name}
            </option>
          )}
        </Field>
        <div className="button-holder">
          <button className="btn btn-default" type="submit" disabled={invalid}>
            <span>{submit}</span>
          </button>
          <button className="btn btn-default" onClick={onCancelHandler}><span>{cancel}</span></button>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;
