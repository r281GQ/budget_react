import React from "react";
import { NavItem } from "react-bootstrap";

const Balance = ({ balance }) => {
  return (
    <NavItem eventKey="balance">
      Total Balance : {balance}
    </NavItem>
  );
};

export default Balance;
