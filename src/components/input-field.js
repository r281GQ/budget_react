import React from "react";

const renderError = (error, touched) => error && touched ? <span className="label label-warning"> {error}</span> : <div/>

const InputField = ({
  input,
  type,
  label,
  meta: { error, warning, touched }
}) => {
  return (
    <div>
      <div>
        <label>{label}</label>
      </div>
      <input
        {...input}
        type={type}
        placeholder={label}
        className="form-control"
      />
      {renderError(error, touched)}
    </div>
  );
};

export default InputField;
