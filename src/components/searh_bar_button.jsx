import React from "react";
import { NavItem } from "react-bootstrap";

const SearchBarButton = ({ onClickHandler, currentRoute }) => {
  if (currentRoute !== "/transaction") return null;
  return (
    <NavItem eventKey="search" onClick={onClickHandler}>
      Search
    </NavItem>
  );
};

export default SearchBarButton;
