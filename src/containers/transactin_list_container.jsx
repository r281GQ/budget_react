import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field, SubmissionError } from "redux-form";
import { push } from "react-router-redux";
import { Link, Route } from "react-router-dom";
import Spinner from "react-spinkit";
import * as _ from "lodash";

import {
  getTransactions,
  updateTransaction,
  deleteTransaction
} from "./../actionCreators/modelActionCreators";
import EditTransaction from "./../components/edit_transaction";
import TransactionList from "./../components/transaction_list";
import { selectExpenses, selectIncomes } from "./../selectors/income_expense";
import {
  requiredName,
  mustBeGreaterThanZero
} from "./../validators/transaction";

import "./transaction_list_container.css";

class TransactionListContainer extends Component {
  componentWillMount() {
    if (!this.props.authenticated) this.props.navigate("/");
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}

  componentWillUpdate(nextProps, nextState) {
    if (!nextProps.authenticated) this.props.navigate("/");
  }

  componentDidUpdate(prevProps, prevState) {}

  constructor(props) {
    super(props);

    this.state = {
      selectedId: 0,
      showDeleteConsent: false
    };
  }

  onDeleteHandler = _id => () => {
    this.props.deleteTransaction(_id);
    this.onHideDeleteConsent();
  };

  onEditFormSelectedHandler = _id => () =>
    this.props.navigate(`/transaction/edit/${_id}`);

  onShowDeleteConsent = _id => () =>
    this.setState({ selectedId: _id, showDeleteConsent: true });

  onHideDeleteConsent = () =>
    this.setState({ selectedId: 0, showDeleteConsent: false });

  onCancelHandler = () => this.props.navigate("/transaction");

  renderTransactionList = () => () =>
    <TransactionList
      handlers={{
        onShowDeleteConsent: this.onShowDeleteConsent,
        onHideDeleteConsent: this.onHideDeleteConsent,
        onEditFormSelectedHandler: this.onEditFormSelectedHandler,
        onDeleteHandler: this.onDeleteHandler
      }}
      showDeleteConsent={this.state.showDeleteConsent}
      selectedId={this.state.selectedId}
      models={{
        incomes: this.props.incomes,
        expenses: this.props.expenses,
        accounts: this.props.accounts,
        groupings: this.props.groupings,
        budgets: this.props.budgets
      }}
    />;

  navigateToTransactionList = () => this.props.navigate("/transaction");

  renderEditTransaction = () => ({ match }) =>
    <div>
      <EditTransaction
        handlers={{
          updateTransaction: this.props.updateTransaction
        }}
        loading={this.props.loading}
        buttonNames={{
          submit: "Edit",
          cancel: "Cancel"
        }}
        transaction={this.props.transactions[match.params.id]}
        navigate={this.navigateToTransactionList}
        models={{
          accounts: this.props.accounts,
          groupings: this.props.groupings,
          budgets: this.props.budgets
        }}
      />
    </div>;

  render() {
    if (this.props.loading || !this.props.authenticated)
      return (
        <div className="loading">
          Loading models<Spinner className="loading" name="circle" />
        </div>
      );
    return (
      <div className="transaction-list">
        <Route
          exact
          path="/transaction"
          component={this.renderTransactionList()}
        />
        <Route
          exact
          path="/transaction/edit/:id"
          component={this.renderEditTransaction()}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated,
    loading: state.model.isLoading,
    transactions: state.model.transactions.data,
    accounts: state.model.accounts.data,
    groupings: state.model.groupings.data,
    budgets: state.model.budgets.data,
    incomes: selectIncomes(state),
    expenses: selectExpenses(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    navigate: route => dispatch(push(route)),
    updateTransaction: transaction => dispatch(updateTransaction(transaction)),
    deleteTransaction: _id => dispatch(deleteTransaction(_id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  TransactionListContainer
);
