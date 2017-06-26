import React, { Component } from "react";
import { Field } from "redux-form";
import { ListGroup, ListGroupItem, Button } from "react-bootstrap";
import * as _ from "lodash";
import EditGroupingComponent from "./edit-grouping-component";

const GropingComponentList = ({ groupings, state, handlers, invalid }) => {
  if(groupings[0])
  return (<div>aint</div>);
  return (
    <ListGroup>
      {_.map(groupings, grouping =>
        <ListGroupItem key={grouping._id}>
          Name: {grouping.name} Type: {grouping.type}

          <EditGroupingComponent
            _id={grouping._id}
            state={state}
            handlers={handlers}
            invalid={invalid}
          />

        </ListGroupItem>
      )}
    </ListGroup>
  );
};

export default GropingComponentList;
