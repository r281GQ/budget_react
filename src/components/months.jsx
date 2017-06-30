import React from "react";
import { NavDropdown, MenuItem } from "react-bootstrap";
import * as _ from "lodash";

const renderIcon = (item, selected) => {
  if (item === selected)
    return (
      <span className="glyphicon glyphicon glyphicon-ok" aria-hidden="true" />
    );
};
const renderMenuItemMessage = item => {
  return (
    <span>
      {item}
    </span>
  );
};

const DropDown = ({ title, collection, onClickHandler, selected }) => {
  return (
    <NavDropdown id={title} eventKey="title" title={title}>
      {_.map(collection, item => {
        return (
          <MenuItem key={item} eventKey={item} onClick={onClickHandler(item)}>
            {renderMenuItemMessage(item)}
            {renderIcon(item, selected)}
          </MenuItem>
        );
      })}
    </NavDropdown>
  );
};

export default DropDown;
