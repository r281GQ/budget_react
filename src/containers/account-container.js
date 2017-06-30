import React, { Component } from "react";
import {Route} from 'react-router';
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { ListGroup, ListGroupItem, Button, FormControl } from "react-bootstrap";
import { push } from "react-router-redux";
import {
  createAccount,
  getAccounts,
  deleteAccount,
  updateAccount
} from "./../actionCreators/modelActionCreators";
import * as _ from "lodash";
import CreateAccountFormComponent from "./../components/createAccountFormComponent";
import Spinner from "react-spinkit";
import AccountList from "./../components/account_list";

class AccountContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCreateForm: false,
      showEditForm: false,
      showDeleteConsent: false,
      selectedId: undefined
    };
  }

  componentWillMount() {
    if (!this.props.authenticated) this.props.redirectToMain();
  }

  componentWillUpdate(nextprops) {
    if (!nextprops.authenticated) this.props.redirectToMain();
  }

  renderCreateForm = ()=> () => {
    if (this.state.showCreateForm)
      return (
        <CreateAccountFormComponent
          submitHandler={this.onSubmitCreateHandler()}
          cancelHandler={this.onCancelAccountCreate}
        />
      );
    else {
      return <Button onClick={this.onShowCreateForm}>Create Account</Button>;
    }
  };

  // renderCreateForm = () => {
  //   if (this.state.showCreateForm)
  //     return (
  //       <CreateAccountFormComponent
  //         submitHandler={this.onSubmitCreateHandler()}
  //         cancelHandler={this.onCancelAccountCreate}
  //       />
  //     );
  //   else {
  //     return <Button onClick={this.onShowCreateForm}>Create Account</Button>;
  //   }
  // };


  renderAccountList = () => () =>
    <div>
      <AccountList
        accounts={this.props.accounts}
        state={this.state}
        handlers={{
          onSubmitEditHandler: this.onSubmitEditHandler,
          onEditFormDisabledHandler: this.onEditFormDisabledHandler,
          onDeleteAccountHandler: this.onDeleteAccountHandler,
          onHideDeleteConsentHandler: this.onHideDeleteConsentHandler,
          onEditFormSelectedHandler: this.onEditFormSelectedHandler,
          onShowDeleteConsentHandler: this.onShowDeleteConsentHandler
        }}
      />
    </div>;
  // renderAccountList = () =>
  //   <div>
  //     <AccountListComponent
  //       accounts={this.props.accounts}
  //       state={this.state}
  //       handlers={{
  //         onSubmitEditHandler: this.onSubmitEditHandler,
  //         onEditFormDisabledHandler: this.onEditFormDisabledHandler,
  //         onDeleteAccountHandler: this.onDeleteAccountHandler,
  //         onHideDeleteConsentHandler: this.onHideDeleteConsentHandler,
  //         onEditFormSelectedHandler: this.onEditFormSelectedHandler,
  //         onShowDeleteConsentHandler: this.onShowDeleteConsentHandler
  //       }}
  //     />
  //   </div>;

  prepareCreateAccountForDispatch = ({ name, initialBalance, currency }) => {
    this.props.createAccount({ name, initialBalance, currency });
    this.setState({ showCreateForm: false });
    this.props.reset();
  };

  prepareUpdateAccountForDispatch = formProps => {
    let { handleSubmit, reset } = this.props;
    this.props.updateAccount({
      name: formProps.name,
      _id: this.state.selectedId
    });
    this.setState({ showEditForm: false });
    reset();
  };

  onCancelAccountCreate = () => {
    let { reset } = this.props;
    this.onShowCreateForm();
    reset();
  };

  onShowCreateForm = () =>
    this.setState({ showCreateForm: !this.state.showCreateForm });

  onSubmitCreateHandler = () => {
    let { handleSubmit } = this.props;
    return handleSubmit(this.prepareCreateAccountForDispatch);
  };

  onEditFormDisabledHandler = () => this.setState({ showEditForm: false });

  onDeleteAccountHandler = _id => () => this.props.deleteAccount(_id);

  onSubmitEditHandler = () => {
    let { handleSubmit } = this.props;
    return handleSubmit(this.prepareUpdateAccountForDispatch);
  };

  onHideDeleteConsentHandler = () =>
    this.setState({ showDeleteConsent: false });

  onShowDeleteConsentHandler = _id => () =>
    this.setState({ selectedId: _id, showDeleteConsent: true });

  onEditFormSelectedHandler = _id => () =>
    this.setState({
      selectedId: _id,
      showEditForm: true
    });

  render() {
    if (this.props.loading) return <div><Spinner name="circle" /></div>;

    return (

      <div className="transaction-list">
        <Route
          exact
          path="/account"
          component={this.renderAccountList()}
        />
        <Route
          exact
          path="/account/new"
          component={this.renderCreateForm()}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated,
    loading: state.model.isLoading,
    accounts: state.model.accounts.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createAccount: account => dispatch(createAccount(account)),
    getAccounts: () => dispatch(getAccounts()),
    deleteAccount: _id => dispatch(deleteAccount(_id)),
    updateAccount: account => dispatch(updateAccount(account)),
    redirectToMain: () => dispatch(push("/"))
  };
};

export default reduxForm({
  form: "account"
})(connect(mapStateToProps, mapDispatchToProps)(AccountContainer));
