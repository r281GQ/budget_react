import React from "react";
import { Field } from "redux-form";

import InputField from "./input-field";

const SignUp = ({ handleSignup, toggleLogIn }) =>
  <div>
    <form onSubmit={handleSignup}>
      <Field type="text" name="email" component={InputField} label="Email" />
      <Field
        type="password"
        name="password"
        component={InputField}
        label="Password"
      />
      <Field type="text" name="name" component={InputField} label="Name" />
      <input className="btn btn-default" value="Sign Up" type="submit" />
      <button className="btn btn-default" onClick={toggleLogIn}>Log In</button>
    </form>
  </div>;

export default SignUp;
