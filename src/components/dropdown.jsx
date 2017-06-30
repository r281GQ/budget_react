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
  switch (title) {
    case "Accounts":
      return (
        <span>
          {item.name} {item.currentBalance}
        </span>
      );
    case "Groupings":
      return (
        <span>
          {item.name}
        </span>
      );
    case "BudgetPeriods":
      return (
        <span>
          {item.name} {item.comulativeBalance}
        </span>
      );
    default:
      return "";
  }
};

const DropDown = ({ title, collection, onClickHandler, selected }) => {
  return (
    <NavDropdown id={title} eventKey="title" title={title}>
      {_.isEmpty(collection)
        ? <MenuItem key="0" eventKey="0">
            No items yet!
          </MenuItem>
        : _.map(collection, item => {
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
