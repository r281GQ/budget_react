import React, { Component } from "react";

const DumbTest = ({ handler, counter }) => <button onClick={handler}>test {counter}</button>;

export default DumbTest;
