import React from "react";
import { NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CreateButton = ({ route }) => {
  switch (route) {
    case "/grouping":
      return (
        <LinkContainer to="/grouping">
          <NavItem eventKey={route}>
            <span>Create new grouping</span>
          </NavItem>
        </LinkContainer>
      );
    case "/transaction":
      return (
        <LinkContainer to="/new">
          <NavItem eventKey={route}>
            <span>Create new transaction</span>
          </NavItem>
        </LinkContainer>
      );
    case "/account":
      return (
        <LinkContainer to="/account/new">
          <NavItem eventKey={route}>
            <span>Create new account</span>
          </NavItem>
        </LinkContainer>
      );
    case "/new":
      return (
        <LinkContainer to="/transaction">
          <NavItem eventKey={route}>
            <span>See transactions</span>
          </NavItem>
        </LinkContainer>
      );
    default:
      return (
        <LinkContainer to="/transaction">
          <NavItem eventKey={route}>
            <span>See transactions</span>
          </NavItem>
        </LinkContainer>
      );
  }
};

export default CreateButton;
