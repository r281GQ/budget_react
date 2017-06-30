import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field, SubmissionError } from "redux-form";
import { push } from "react-router-redux";
import * as _ from "lodash";

import {
  createTransaction,
  getAccounts,
  getGroupings
} from "../actionCreators/modelActionCreators";
import ListComponent from "./../components/transaction-list";
import SelectField from "./../components/select-field";
import InputField from "./../components/input-field";
import TransactionForm from "./../components/transaction_form";
import {
  requiredName,
  mustBeGreaterThanZero
} from "./../validators/transaction";

import "./create_transaction_container.styles.css";

class CreateTransactionContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (!this.props.authenticated) this.props.navigate("/");
  }

  componentWillUpdate(nextprops) {
    if (!nextprops.authenticated) this.props.navigate("/");
  }

  onCreateTransactionHandler = ({
    name,
    amount,
    currency,
    account,
    grouping,
    memo,
    budget
  }) => {
    if (
      amount > this.props.accounts[account].currentBalance &&
      this.props.groupings[grouping].type === "expense"
    ) {
      throw new SubmissionError({
        amount: "There is not enough balance on that account.",
        _error: "balance"
      });
    }
    let parsedBudget = Number.parseInt(budget);
    if (
      parsedBudget !== 0 &&
      this.props.groupings[grouping].type === "income"
    )
      throw new SubmissionError({
        budget: "Budget cannot be assigned to incomes",
        _error: "budget"
      });
      let transaction = {
        name,
        amount,
        currency,
        account,
        grouping,
        memo
      };
      console.log(budget);
      if(parsedBudget !== 0)
        transaction.budget = budget;
        console.log(transaction);
    this.props.createTransaction(transaction);
  };

  navigateToTransactionList = () => this.props.navigate("/transaction");

  render() {
    if (this.props.loading) return <div>Loading</div>;
    let { handleSubmit, invalid, pristine } = this.props;
    return (
      <div>
        <TransactionForm
          handlers={{
            onSubmitHandler: handleSubmit(this.onCreateTransactionHandler),
            onCancelHandler: this.navigateToTransactionList
          }}
          buttonNames={{
            submit: "Create",
            cancel: "cancel"
          }}
          formProps={{
            invalid,
            pristine
          }}
          models={{
            accounts: this.props.accounts,
            groupings: this.props.groupings,
            budgets: this.props.budgets
          }}
          validators={{
            name: [requiredName],
            amount: [mustBeGreaterThanZero]
          }}
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
    initialValues: {
      name: "",
      amount: 0,
      account:
        state.model.accounts.data[
          _.findKey(state.model.accounts.data, () => true)
        ]._id,
      grouping:
        state.model.groupings.data[
          _.findKey(state.model.groupings.data, () => true)
        ]._id,
      budget:
        state.model.budgets.data[
          _.findKey(state.model.budgets.data, () => true)
        ]._id
    }
  };
};

const mapDispatchToProps = dispatch => {
  return {
    navigate: route => dispatch(push(route)),
    createTransaction: transaction => dispatch(createTransaction(transaction))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({ form: "create-transaction", shouldValidate: () => true })(
    CreateTransactionContainer
  )
);
