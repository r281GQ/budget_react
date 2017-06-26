import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from 'react-router-redux'
import { Button, ListGroup, ListGroupItem } from "react-bootstrap";
import * as _ from 'lodash';

import {initAuth} from "./../actions/authActions";
import { createAccount, getAccounts} from "./../actionCreators/modelActionCreators";

class MainComponent extends Component {

  logger(logging) {
    console.log(logging);
  }

  loginAttempt() {
    let { attempToLogin } = this.props;
    attempToLogin({ email: "endre@mail.com", password: "123456" });
  }

  renderTransactionList() {
    return <div>from renderTransactionList function</div>;
  }

  wheve = () => this.props.navigate()

  tryThis (){
    this.props.navigate();
  }

  helper=() => _.map(this.props.transactions, item => (<ListGroupItem key={item.name}>{item.name} + {item.amount}</ListGroupItem>))

  fetchS = () => this.props.tx();

  render() {
    let { attempToLogin } = this.props;
    if (this.props.loading) return ( <div> stuff is being fetched </div> );
    if(!this.props.authenticated)
      return (<div>Welcome</div>);

    return (
      <div>
      <button></button>
      <ListGroup>

      {this.helper()}
      </ListGroup>

      <Button onClick={this.fetchS}>fetch</Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated,
    compName: state.auth.user.name,
    loading: state.auth.isFetching || state.model.transactions.isLoading,
    transactions: state.model.transactions.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    attempToLogin: creds => {
      return dispatch(initAuth(creds));
    },
    navigate: () =>{
      dispatch(push('/about'));
    },
    tx: () =>{
      dispatch(getAccounts());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);
