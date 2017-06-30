import React from "react";
import { NavDropdown, MenuItem } from "react-bootstrap";
import * as _ from "lodash";

const renderIcon = (item, selected) => {
  if (item._id === selected)
    return (
      <span className="glyphicon glyphicon glyphicon-ok" aria-hidden="true" />
    );
};
const renderMenuItemMessage = (title, item) => {
  if (title === "Account")
    return (
      <span>
        {item.name} {item.currentBalance}
      </span>
    );
};

const DropDown = ({ title, collection, onClickHandler, selected }) => {
  return (
    <NavDropdown id={title} eventKey="title" title={title}>
      {_.map(collection, item => {
        return (
          <MenuItem
            key={item._id}
            eventKey={item._id}
            onClick={onClickHandler(item._id)}
          >
            {renderMenuItemMessage(title, item)}
            {renderIcon(item, selected)}
          </MenuItem>
        );
      })}
    </NavDropdown>
  );
};

export default DropDown;
