import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Field } from "redux-form";
import * as _ from "lodash";

const CONSENT_MESSAGE =
  "Sure you want to delete this account? This will delete all of the transactions as well!";
const EDIT_BTN_MSG = "Edit account";
const DELETE_BTN_MSG = "Delete account";
const CANCEL_MSG = "Cancel";

const EditAccountComponent = ({
  state: { showEditForm, showDeleteConsent, showCreateForm, selectedId },
  handlers: {
    onSubmitEditHandler,
    onEditFormDisabledHandler,
    onDeleteAccountHandler,
    onHideDeleteConsentHandler,
    onEditFormSelectedHandler,
    onShowDeleteConsentHandler
  },
  _id
}) => {
  if (showEditForm && selectedId === _id) {
    return (
      <form onSubmit={onSubmitEditHandler()}>

        <Field type="text" component="input" name="name" />
        <Button type="submit">{EDIT_BTN_MSG}</Button>
        <Button onClick={onEditFormDisabledHandler}>
          {CANCEL_MSG}
        </Button>
      </form>
    );
  } else if (showDeleteConsent && selectedId === _id) {
    return (
      <div>
        {CONSENT_MESSAGE}
        <Button onClick={onDeleteAccountHandler(_id)}>{DELETE_BTN_MSG}</Button>
        <Button onClick={onHideDeleteConsentHandler}>
          {CANCEL_MSG}
        </Button>

      </div>
    );
  } else {
    return (
      <div>
        <Button onClick={onEditFormSelectedHandler(_id)}>Edit</Button>
        <Button onClick={onShowDeleteConsentHandler(_id)}>
          Delete
        </Button>
      </div>
    );
  }
};

export default EditAccountComponent;
