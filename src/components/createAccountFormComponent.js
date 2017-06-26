import React, { Component } from 'react';
import { Field } from 'redux-form';
import { Button } from 'react-bootstrap';

const CreateAccountFormComponent = ({ submitHandler, cancelHandler }) => {
  return (
    <form onSubmit={submitHandler}>

      <Field type="text" name="name" component="input" placeholder="name" />
      <Field
        type="text"
        name="initialBalance"
        component="input"
        placeholder="initialBalance"
      />
      <Field
        type="text"
        name="currency"
        component="input"
        placeholder="currency"
      />

      <Button type="submit" >Create</Button>
      <Button onClick={cancelHandler} >Cancel</Button>
    </form>
  );
}


export default CreateAccountFormComponent;
