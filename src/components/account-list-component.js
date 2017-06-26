import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import * as _ from "lodash";
import EditAccountComponent from './edit-account-component';

const AccountListComponent = ({ accounts, state, handlers }) => {
  return (
    <ListGroup>
      {_.map(accounts, account =>
        <ListGroupItem key={account._id}>
          Name: {account.name} Balance: {account.currentBalance}
          <EditAccountComponent state={state} handlers={handlers} _id={account._id} />
        </ListGroupItem>
      )}
    </ListGroup>
  );
};

export default AccountListComponent;
