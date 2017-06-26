import React, { Component } from "react";
import { Field } from "redux-form";
import { Button } from "react-bootstrap";
import InputField from "./input-field";
import SelectField from "./select-field";
import * as _ from "lodash";

const INCOME = "income";
const EXPENSE = "expense";
const groupingTypes = [INCOME, EXPENSE];

const requiredName = value => (!value ? "Name must be provided!" : undefined);

const GroupingCreateComponent = ({
  showCreateForm,
  onSubmitCreateHandler,
  onShowCreateFormHandler,
  onHideCreateFormHandler,
  invalid,
  touched
}) => {
  if (showCreateForm) {
    return (
      <form onSubmit={onSubmitCreateHandler()}>

        <Field
          type="text"
          name="name"
          component={InputField}
          label="Name"
          validate={[requiredName]}
        />
        <Field name="type" component={SelectField} label="Type">
          {_.map(groupingTypes, groupingType =>
            <option key={groupingType} value={groupingType}>
              {groupingType}
            </option>
          )}
        </Field>
        <button
          className="btn btn-default"
          type="submit"
          disabled={invalid}
        >
          <span>Create</span>
        </button>
        <button className="btn btn-default" onClick={onHideCreateFormHandler}>
          <span>Cancel</span>
        </button>
      </form>
    );
  } else
    return (
      <div>
        <button className="btn btn-default" onClick={onShowCreateFormHandler}>
          <span>Create</span>
        </button>
      </div>
    );
};

export default GroupingCreateComponent;
