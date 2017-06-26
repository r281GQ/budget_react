import React from "react";
import { Button } from "react-bootstrap";
import { Field } from "redux-form";
import InputField from "./input-field";

import './logIn.css';

const renderError = failedAttempt =>
  failedAttempt ? <div className="alert alert-danger">Either there is no user with that email or wrong password was provided!</div> : <div />;

const LogIn = ({ handleLogin, toggleSignUp, failedAttempt }) =>
  <div>
    <form onSubmit={handleLogin}>
      <Field type="text" name="email" component={InputField} label="Email" />
      <Field
        type="password"
        name="password"
        component={InputField}
        label="Password"
      />
      <div className="button-container">
        {renderError(failedAttempt)}
        <Button type="submit">Log In </Button>
        <Button onClick = {toggleSignUp}> Sign Up </Button>
      </div>
    </form>
  </div>;

export default LogIn;
