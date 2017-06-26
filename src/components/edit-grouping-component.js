import React, { Component } from "react";
import { Field } from "redux-form";
import { Button } from "react-bootstrap";
import InputField from "./input-field";

const requiredName = value => (!value ? "Name must be provided!" : undefined);

const EditGroupingComponent = ({
  state: { showEditForm, showDeleteConsent, selectedId },
  _id,
  handlers: {
    onShowDeleteConsentHandler,
    onHideDeleteConsentHandler,
    onDeleteGroupingHandler,
    onSubmitEditHandler,
    onEditFormSelectedHandler,
    onEditFormDisabledHandler
  },
  invalid
}) => {
  if (showEditForm && selectedId === _id)
    return (
      <div>
        <form onSubmit={onSubmitEditHandler()}>

          <Field
            name="name"
            type="input"
            component={InputField}
            label="Name"
            validate={[requiredName]}
          />

          <Button type="submit" disabled={invalid}>Edit</Button>
          <Button onClick={onEditFormDisabledHandler}>Cancel</Button>
        </form>
      </div>
    );
  else if (showDeleteConsent && selectedId === _id) {
    return (
      <div>
        <span className="label label-danger">
          Sure you want to delete this?
        </span>

        <Button onClick={onDeleteGroupingHandler(_id)}>Delete</Button>
        <Button onClick={onHideDeleteConsentHandler(_id)}>Cancel</Button>
      </div>
    );
  } else {
    return (
      <div>

        <Button onClick={onEditFormSelectedHandler(_id)}>Edit</Button>
        <Button onClick={onShowDeleteConsentHandler(_id)}>Delete</Button>
      </div>
    );
  }
};

export default EditGroupingComponent;
