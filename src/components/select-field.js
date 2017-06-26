import React, { Component } from "react";

const renderError = error => error ? <span className="label label-danger">{error}</span> : <div></div>

const SelectField = ({ label, input, children, meta: {error} }) => {
  return (
    <div>
      <div><label>{label}</label></div>
      <select {...input} className="form-control">

        {children}
      </select>
      {renderError(error)}
    </div>
  );
};

export default SelectField;
