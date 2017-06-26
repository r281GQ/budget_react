import React, { Component } from "react";
import TransactionForm from "./transaction_form";
import { reduxForm, Field, SubmissionError } from "redux-form";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import * as _ from 'lodash';

import {
  requiredName,
  mustBeGreaterThanZero
} from "./../validators/transaction";

class EditTransaction extends Component {

  componentWillMount(){
    if(this.props.transaction){
      this.props.change("name", this.props.transaction.name);
      this.props.change("amount", this.props.transaction.amount);
      this.props.change("memo", this.props.transaction.memo);
      this.props.change("account", this.props.transaction.account);
      this.props.change("grouping", this.props.transaction.grouping);
      this.props.change("budget", this.props.transaction.budget || 0);
      this.props.change("currency", "GBP");
    }
  }

  dispatchEditAction = _id => formProps => {
    let { name, currency, memo, amount, account, grouping, budget } = formProps;
    let tx = { name, currency, memo, amount, account, grouping, _id };
    if(budget !== 0)
      tx.budget = budget;
    if(this.props.models.groupings[grouping].type === 'income' && budget !== 0)throw new SubmissionError({
      budget: "Budget cannot be assigned to an income.",
      _error: ''
    });
    else
    this.props.handlers.updateTransaction(tx);
  };

  onCancelHandler = () => this.props.navigate();

  render() {
    if(this.props.loading) return <div>loading</div>
    return (
      <div>
        <TransactionForm
          handlers={{
            onSubmitHandler: this.props.handleSubmit(
              this.dispatchEditAction(this.props.transaction._id)
            ),
            onCancelHandler: this.onCancelHandler
          }}
          buttonNames={this.props.buttonNames}
          formProps={{
            invalid: this.props.invalid,
            pristine: this.props.pristine
          }}
          validators={{
            name: [requiredName],
            amount: [mustBeGreaterThanZero]
          }}
          models={this.props.models}
        />
      </div>
    );
  }
}

export default reduxForm({ form: "transaction-list" })(EditTransaction);
