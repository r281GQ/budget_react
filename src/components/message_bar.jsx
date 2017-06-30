import React from "react";
import { Alert, Button } from "react-bootstrap";
import * as _ from "lodash";

const MessageBar = ({ messages, dismissHandler }) => {
  return (
    <span>
      {_.map(messages, msg =>
        <Alert bsStyle={msg.type} key={Math.random()}>
          <p>
            {msg.message}{" "}
            <Button onClick={dismissHandler(msg._id)}>dismiss</Button>
          </p>
        </Alert>
      )}
    </span>
  );
};

export default MessageBar;
