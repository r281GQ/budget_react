import React from "react";
import { NavDropdown, MenuItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Navigation = ({ name }) => {
  return (
    <NavDropdown id='navigation' eventKey='navigation' title={name}>
      <LinkContainer to="/grouping">
        <MenuItem eventKey="4.2">Groupings</MenuItem>
      </LinkContainer>
      <LinkContainer to="/budget">
        <MenuItem eventKey="4.2">budget</MenuItem>
      </LinkContainer>
      <LinkContainer to="/new">
        <MenuItem eventKey="4.4">new</MenuItem>
      </LinkContainer>
      <LinkContainer to="/account">
        <MenuItem eventKey="4.2">account</MenuItem>
      </LinkContainer>
      <LinkContainer to="/transaction">
        <MenuItem eventKey="4.3">transaction</MenuItem>
      </LinkContainer>
    </NavDropdown>
  );
};

export default Navigation;
