import React, { Component } from "react";
import Spinner from "react-spinkit";
import { Nav } from "react-bootstrap";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";

import {
  initAuth,
  initLogOut,
  initSignUp,
  getMe
} from "./../actions/authActions";
import {
  applyDate,
  applyTerm,
  applyAccountSelection,
  applyGroupingSelection,
  applyBudgetSelection
} from "./../actionCreators/filterActionCreators";
import dateSelector from "./../selectors/date";
import totalBalance from "./../selectors/totalBalance";
import currentBudgetPeriodsSelector from "./../selectors/currentBudgetPeriod";
import { disMissMessage } from "./../actionCreators/modelActionCreators";
import LogIn from "./log_in";
import SignUp from "./sign_up";
import DropDown from "./dropdown";
import Months from "./months";
import SearchBarButton from "./searh_bar_button";
import SearchBar from "./search_bar";
import Navigation from "./navigation";
import LogoutButton from "./logut_button";
import Balance from "./balance";
import MessageBar from "./message_bar";
import CreateButton from "./create_button";

import "./heading.css";

class HeaderComponent extends Component {
  componentWillMount() {
    this.props.getMe();
  }

  constructor(props) {
    super(props);

    this.state = {
      logIn: true,
      isSearchBarVisible: false
    };
  }

  toggleBetweenLoginAndSignUp = () =>
    this.setState({ logIn: !this.state.logIn });

  toggleSearch = () => {
    this.props.updateTerm("");
    this.setState({ isSearchBarVisible: !this.state.isSearchBarVisible });
  };

  logIn = formProps => {
    const { reset } = this.props;
    const { email, password } = formProps;
    this.props.logIn({ email, password });
    reset();
  };

  signUp = formProps => {
    const { reset } = this.props;
    const { email, password, name } = formProps;
    this.props.signUp({ email, password, name });
    reset();
  };

  render() {
    const { handleSubmit } = this.props;

    let unAnuthenticatedAndLogInSelected =
      !this.props.authenticated &&
      !this.props.isAuthenticating &&
      this.state.logIn;

    let unAnuthenticatedAndSignUpSelected =
      !this.props.authenticated &&
      !this.props.isAuthenticating &&
      !this.state.logIn;

    let beingAuthenticated = this.props.isAuthenticating;

    let modelsBeingLoadedAndAuthenticated =
      !this.props.isAuthenticating && this.props.loading;

    if (unAnuthenticatedAndLogInSelected) {
      return (
        <div>
          <LogIn
            handleLogin={handleSubmit(this.logIn)}
            failedAttempt={this.props.failedAttempt}
            toggleSignUp={this.toggleBetweenLoginAndSignUp}
          />
        </div>
      );
    }

    if (unAnuthenticatedAndSignUpSelected) {
      return (
        <div>
          <SignUp
            handleSignup={handleSubmit(this.signUp)}
            toggleLogIn={this.toggleBetweenLoginAndSignUp}
          />
        </div>
      );
    }

    if (beingAuthenticated)
      return (
        <div className="loading">
          Authenticating<Spinner className="loading" name="circle" />
        </div>
      );

    if (modelsBeingLoadedAndAuthenticated)
      return (
        <div className="loading">
          Loading models<Spinner className="loading" name="circle" />
        </div>
      );

    return (
      <div>
        <Nav bsStyle="pills" activeKey={1}>
          <CreateButton route={this.props.currentRoute} />

          <Balance balance={this.props.totalBalance} />

          <SearchBarButton
            currentRoute={this.props.currentRoute}
            onClickHandler={this.toggleSearch}
          />

          <DropDown
            collection={this.props.accounts}
            title="Accounts"
            onClickHandler={this.props.selectAccount}
            selected={this.props.selectedAccount}
          />

          <DropDown
            collection={this.props.groupings}
            title="Groupings"
            onClickHandler={this.props.selectGrouping}
            selected={this.props.selectedGrouping}
          />

          <DropDown
            collection={this.props.currentBudgetPeriods}
            title="BudgetPeriods"
            onClickHandler={this.props.selectBudget}
            selected={this.props.selectedBudget}
          />

          <Months
            collection={this.props.months}
            title="Months"
            onClickHandler={this.props.updateDate}
            selected={this.props.selectedDate}
          />

          <Navigation name={this.props.user.name} />

          <LogoutButton onClickHandler={this.props.logOut} />
        </Nav>
        <SearchBar
          isVisible={
            this.state.isSearchBarVisible &&
            this.props.currentRoute === "/transaction"
          }
          onChangeHandler={this.props.updateTerm}
        />
        <MessageBar
          dismissHandler={this.props.dismissMessage}
          messages={this.props.messages}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated,
    loading: state.model.isLoading,
    isAuthenticating: state.auth.isLoading,
    failedAttempt: state.auth.failedAttempt,
    user: state.auth.user,
    messages: state.model.messages,
    accounts: state.model.accounts.data,
    groupings: state.model.groupings.data,
    selectedAccount: state.filter.account,
    selectedGrouping: state.filter.grouping,
    selectedBudget: state.filter.budget,
    selectedDate: state.filter.date,
    currentRoute: state.router.location.pathname,
    totalBalance: totalBalance(state),
    months: dateSelector(state),
    currentBudgetPeriods: currentBudgetPeriodsSelector(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logIn: userInfo => dispatch(initAuth(userInfo)),
    signUp: userInfo => dispatch(initSignUp(userInfo)),
    logOut: () => dispatch(initLogOut()),
    dismissMessage: id => () => dispatch(disMissMessage(id)),
    getMe: () => dispatch(getMe()),
    updateDate: date => () => dispatch(applyDate(date)),
    updateTerm: term => dispatch(applyTerm(term)),
    selectAccount: _id => () => dispatch(applyAccountSelection(_id)),
    selectGrouping: _id => () => dispatch(applyGroupingSelection(_id)),
    selectBudget: _id => () => dispatch(applyBudgetSelection(_id))
  };
};

export default reduxForm({
  form: "login"
})(connect(mapStateToProps, mapDispatchToProps)(HeaderComponent));
