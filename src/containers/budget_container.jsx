import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import InputField from './../components/input-field';
import SelectField from './../components/select-field';
import * as _ from 'lodash';

import { createBudget, getBudgets } from './../actionCreators/modelActionCreators';

class BudgetContainer extends Component {
  componentWillMount() {
    this.props.getBudgets();
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}

  componentWillUpdate(nextProps, nextState) {}

  componentDidUpdate(prevProps, prevState) {}

  constructor(props) {
    super(props);

    this.state = {};
  }

  create = ({name, defaultAllowance, currency}) => {
    this.props.createBudget({name, defaultAllowance, currency});
  }

  render() {
    let {handleSubmit} = this.props;
    return (
      <div>
        <form onSubmit = {handleSubmit(this.create)}>
          <Field name = 'name' label = 'Name' type='text' component={InputField}/>
          <Field name = 'defaultAllowance' label = 'Default allowance' type ='number'component={InputField}/>
          <Field name = 'currency' label = 'Currency' component={SelectField}>

            <option value='GBP' key = 'GBP' >GBP</option>
          </Field>
          <button type='submit' className='btn btn-default'>Create</button>
        </form>

        {_.map(this.props.budgets, budget => {
          return <div>{budget.name}</div>
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    budgets: state.model.budgets.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createBudget : budget => dispatch(createBudget(budget)),
    getBudgets: () => dispatch(getBudgets())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({ form: "budget" })(BudgetContainer)
);
