import React, { Component } from "react";
import { Field } from "redux-form";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import * as _ from "lodash";
import EditComponentTransaction from "./edit-component";

// const h =(proxy, formProps,submitHandler )=>{
//   proxy.stopPropagation();
//   submitHandler(formProps);
// }

const renderAddtiotonal = (
  editAble,
  selectedId,
  transaction,
  submitHandler,

  name,
  accounts,
  groupings
) => {
  console.log(name);
  if (editAble && selectedId === transaction._id)
    return (
      <EditComponentTransaction
        transaction={transaction}
        submitHandler={submitHandler}
        accounts = {accounts}
        groupings = {groupings}
      />
    );
};

const ListComponent = ({
  items,
  submitHandler,
  editAble,
  selectedId,
  selectHandler,
  name,
  accounts,
  groupings
}) => {
  let buttonMessage = editAble ? "hide" : "edit";
  return (
    <div>
      <ListGroup>

        {_.map(items, item => {
          return (
            <ListGroupItem key={item._id}>

              {item.name}

              {renderAddtiotonal(
                editAble,
                selectedId,
                item,
                submitHandler,
                name,
                accounts,
                groupings
              )}

              <button onClick={() => selectHandler(item)}>
                {buttonMessage}
              </button>
            </ListGroupItem>
          );
        })}

      </ListGroup>

    </div>
  );
};

export default ListComponent;
