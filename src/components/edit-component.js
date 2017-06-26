import React, { Component } from "react";
import { Field } from "redux-form";
import * as _ from 'lodash';

const EditComponentTransaction = ({ transaction, submitHandler, accounts, groupings }) => {
  return (
    <form onSubmit={submitHandler}>

      <Field type="text" name="name" component="input" placeholder="name" />
      <Field type="text" name="amount" component="input" placeholder="amount" />
      <Field type="text" name="memo" component="input" placeholder="memo" />

      <Field type="text" name="account" component="select" placeholder="memo">

          {_.map(accounts, account => {
            return (
              <option value={account._id} key={account._id}>{account.name}</option>
            );
          })}


      </Field>

      <Field type="text" name="grouping" component="select" placeholder="memo">

          {_.map(groupings, grouping => {
            return (
              <option value={grouping._id} key={grouping._id}>{grouping.name}</option>
            );
          })}


      </Field>

      <input type="submit" value="Edit" />
    </form>
  );
};

export default EditComponentTransaction;
