import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import InputField from "./../components/input-field";
import SelectField from "./../components/select-field";
import { push } from "react-router-redux";
import { ListGroupItem, ListGroup, Button } from "react-bootstrap";
import * as _ from "lodash";
import { Route } from 'react-router-dom'

import {
  createBudget,
  updateBudget,
  deleteBudget
} from "./../actionCreators/modelActionCreators";

class BudgetContainer extends Component {
  componentWillMount() {
    if (!this.props.authenticated) this.props.navigate("/");
  }

  componentWillUpdate(nextProps) {
    if (!nextProps.authenticated) this.props.navigate("/");
  }

  constructor(props) {
    super(props);

    this.state = {
      showEditForm: false,
      showDeleteConsent: false,
      selectedId: 0
    };
  }

  createBudget = ({ name, defaultAllowance, currency }) => {
    this.props.createBudget({ name, defaultAllowance, currency });
  };

  navigateToTransactionList = () => this.props.navigate("/transaction");

  updateBudget = _id => ({ name }) => this.props.updateBudget({ _id, name });

  renderEditField = _id => {
    if (_id === this.state.selectedId && this.state.showEditForm)
      return (
        <div>
          <form onSubmit={this.props.handleSubmit(this.updateBudget(_id))}>
            <Field
              name="name"
              type="text"
              component={InputField}
              label="Name"
            />
            <Button type="submit">Edit</Button>
            <Button onClick={this.onCancelEditHandler}>Cancel</Button>
          </form>
        </div>
      );
    else if (
      _id === this.state.selectedId &&
      !this.state.showEditForm &&
      this.state.showDeleteConsent
    )
      return (
        <div>
          <span>Sure you want to delete this budget?</span>
          <Button onClick = {this.onDeleteBudget(_id)}>delete</Button>
          <Button onClick={this.onHideDeleteConsent}>Cancel</Button>
        </div>
      );
    else
      return (
        <div>
          <Button onClick={this.onEditFormSelectedHandler(_id)}> Edit </Button>
          <Button onClick={this.onShowDeleteConsent(_id)}> Delete </Button>
        </div>
      );
  };

  onDeleteBudget = _id => () => this.props.deleteBudget(_id)

  onEditFormSelectedHandler = _id => () =>
    this.setState({
      selectedId: _id,
      showEditForm: true,
      showDeleteConsent: false
    });

  onShowDeleteConsent = _id => () =>
    this.setState({
      selectedId: _id,
      showEditForm: false,
      showDeleteConsent: true
    });

  onHideDeleteConsent = () =>
    this.setState({
      selectedId: 0,
      showEditForm: false,
      showDeleteConsent: false
    });

  onCancelEditHandler = () =>
    this.setState({ selectedId: 0, showEditForm: false });

  // <div>
  //   <form onSubmit={handleSubmit(this.createBudget)}>
  //     <Field name="name" label="Name" type="text" component={InputField} label = 'Name' />
  //     <Field
  //       name="defaultAllowance"
  //       label="Default allowance"
  //       type="number"
  //       component={InputField}
  //     />
  //     <Field name="currency" label="Currency" component={SelectField}>
  //       <option value="GBP" key="GBP">GBP</option>
  //     </Field>
  //     <button type="submit" className="btn btn-default">Create</button>
  //     <button
  //       onClick={this.navigateToTransactionList}
  //       className="btn btn-default"
  //     >
  //       Cancel
  //     </button>
  //   </form>

  // </div>
  render() {
    let { handleSubmit } = this.props;
    return (
      <div>
        <ListGroup>
          {_.map(this.props.budgets, budget => {
            return (
              <ListGroupItem key={budget._id}>
                <span>Name: {" "}</span>{" "} <span>{budget.name}</span>
                <span>Default allowance: {" "}</span>{" "}{" "}
                <span>  {budget.defaultAllowance}</span>
                <span>Currency: {" "}</span>{" "}{" "}
                <span>{budget.currency}</span>
                {this.renderEditField(budget._id)}
              </ListGroupItem>
            );
          })}
        </ListGroup>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated,
    budgets: state.model.budgets.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    navigate: route => dispatch(push(route)),
    createBudget: budget => dispatch(createBudget(budget)),
    updateBudget: budget => dispatch(updateBudget(budget)),
    deleteBudget: _id => dispatch(deleteBudget(_id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({ form: "budget" })(BudgetContainer)
);
