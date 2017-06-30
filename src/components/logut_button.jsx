import React from 'react';
import {NavItem} from 'react-bootstrap';
const LogoutButton = ({onClickHandler}) => {
  return (
    <NavItem eventKey={1} onClick={onClickHandler}>
      Log out
    </NavItem>
  );
}

export default LogoutButton;
