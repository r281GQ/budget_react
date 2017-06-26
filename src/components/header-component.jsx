import React, { Component } from "react";
import {
  Nav,
  NavItem,
  NavDropdown,
  FormGroup,
  FormControl,
  MenuItem,
  Row,
  Grid,
  Col,
  Alert,
  Button
} from "react-bootstrap";
import {
  initAuth,
  initLogOut,
  initSignUp,
  getMe
} from "./../actions/authActions";
import InputField from "./input-field";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import LogIn from "./login-component";
import SignUp from "./signUp";
import { disMissMessage } from "./../actionCreators/modelActionCreators";
import totalBalance from "./../selectors/totalBalance";
import * as _ from "lodash";
import dateSelector from "./../selectors/date";
import moment from "moment";
import {
  applyDate,
  applyTerm,
  applyAccountSelection,
  applyGroupingSelection,
  applyBudgetSelection
} from "./../actionCreators/filterActionCreators";
import Spinner from "react-spinkit";
import bps from './../selectors/currentBudgetPeriod';

import "./heading.css";

class HeaderComponent extends Component {
  componentWillReceiveProps(nextprops) {}

  componentWillMount() {
    this.props.getMe();
  }

  constructor(props) {
    super(props);

    this.state = {
      logIn: true
    };
  }
  toggle = () => this.setState({ logIn: !this.state.logIn });
  dimiss = id => this.props.dismiss(id);

  logOut = () => this.props.logOut();
  renderMSG = () =>
    _.map(this.props.msgs, msg =>
      <Alert bsStyle={msg.type} key={Math.random()}>
        <p>
          {msg.message}{" "}
          <Button onClick={() => this.dimiss(msg._id)}>dismiss</Button>
        </p>
      </Alert>
    );

  formatRoute = route => {
    switch (route) {
      case "/grouping":
        return "Create new grouping";
      case "/transaction":
        return "Create new transaction";
      case "/account":
        return "Create account";
      case "/new":
        return "See transactions";
      default:
        return "Create account";
    }
  };

  updateTerm = event => this.props.uppdateTerm(event.target.value);

  assignHandler = () => () => "";

  toggleSearch = () => {
    this.props.uppdateTerm("");
    this.setState({ search: !this.state.search });
  };

  renderSearchBar = () =>
    this.state.search
      ?
          <input
            className="form-control"
            type="text"
            onChange={this.updateTerm}
            placeholder="Search in names and memos"
          />


      : <div />;

      // renderSearchBar = () =>
      //   this.state.search
      //     ? <div className="input-group">
      //         <input
      //           className="form-control"
      //           type="text"
      //           onChange={this.updateTerm}
      //           placeholder="Search in names and memos"
      //         />
      //         <span className="input-group-btn">
      //           <button className="btn btn-default" type="button">Go!</button>
      //         </span>
      //       </div>
      //     : <div />;

  isSelected = _id => {
    if (this.props.selectedAccount === _id)
      return (
        <span className="glyphicon glyphicon glyphicon-ok" aria-hidden="true" />
      );
    return "";
  };

  isSelectedG = _id => {
    if (this.props.selectedGrouping === _id)
      return (
        <span className="glyphicon glyphicon glyphicon-ok" aria-hidden="true" />
      );
    return "";
  };

  isSelectedBud = _id => {
    if (this.props.selectedBudget === _id)
      return (
        <span className="glyphicon glyphicon glyphicon-ok" aria-hidden="true" />
      );
    return "";
  };

  isSelectedD = _id => {
    if (this.props.selectedDate === _id)
      return (
        <span className="glyphicon glyphicon glyphicon-ok" aria-hidden="true" />
      );
    return "";
  };

  logIn = formProps => {
    const { reset } = this.props;
    const { email, password } = formProps;
    this.props.logIn({ email, password });
    // this.props.navigate('/transaction');
    reset();
  };

  signUp = formProps => {
    const { email, password, name } = formProps;
    this.props.signUp({ email, password, name });
  };

  renderCreateButton = () => {

    switch (this.props.currentRoute) {
      case "/grouping":
        return <NavItem eventKey={1}>
          {this.formatRoute(this.props.currentRoute)}
        </NavItem>;
      case "/transaction":
        return <LinkContainer to='/new'><NavItem eventKey={1}>
          {this.formatRoute(this.props.currentRoute)}
        </NavItem></LinkContainer>;
      case "/account":
        return <NavItem eventKey={1}>
          {this.formatRoute(this.props.currentRoute)}
        </NavItem>;
      case "/new":
        return <LinkContainer to='/transaction'><NavItem eventKey={1}>
          {this.formatRoute(this.props.currentRoute)}
        </NavItem></LinkContainer>;
      // case _.includes(this.props.currentRoute, '/transaction/edit/'):
      //   return <LinkContainer to='/new'><NavItem eventKey={1}>
      //     {this.formatRoute(this.props.currentRoute)}
      //   </NavItem></LinkContainer>;
      default:
        return <LinkContainer to='/new'><NavItem eventKey={1}>
            {this.formatRoute(this.props.currentRoute)}
          </NavItem></LinkContainer>;
    }


  }
  // <NavItem eventKey={1}>
  //   {this.formatRoute(this.props.currentRoute)}
  // </NavItem>
  render() {
    console.log(this.props.curbps);
    const { handleSubmit, pristine, reset, submitting } = this.props;

    if (!this.props.authenticated && !this.props.fetching && this.state.logIn) {
      return (
        <div>
          <LogIn
            handleLogin={handleSubmit(this.logIn)}
            failedAttempt={this.props.failedAttempt}
            toggleSignUp={this.toggle}
          />
        </div>
      );
    }

    if (
      !this.props.authenticated &&
      !this.props.fetching &&
      !this.state.logIn
    ) {
      return (
        <div>
          <SignUp
            handleSignup={handleSubmit(this.signUp)}
            toggleLogIn={this.toggle}
          />
        </div>
      );
    }

    if (this.props.fetching)
      return (
        <div className="loading">
          Authenticating<Spinner className="loading" name="circle" />
        </div>
      );

    if (!this.props.fetching && this.props.loading)
      return (
        <div className="loading">
          Loading models<Spinner className="loading" name="circle" />
        </div>
      );

    return (
      <div>


        <Nav bsStyle="pills" activeKey={1}>

          {this.renderCreateButton()}

          <NavItem eventKey={8}>
            Total Balance : {this.props.totalBalance}
          </NavItem>

          {this.props.currentRoute === '/transaction' ? <NavItem eventKey={8} onClick={this.toggleSearch}>
            search
          </NavItem> : ''}

          <NavDropdown eventKey={10} title="accounts">

            {_.map(this.props.accounts, account => {
              return (
                <MenuItem
                  eventKey="4.4"
                  onClick={() => {
                    this.setState({ selectAccount: account._id });
                    this.props.selectAccount(account._id);
                  }}
                >
                  <span>{account.name} {account.currentBalance}</span>
                  {this.isSelected( account._id)}
                </MenuItem>
              );
            })}
          </NavDropdown>

          <NavDropdown eventKey={10} title="groupings">

            {_.map(this.props.groupings, grouping => {
              return (
                <MenuItem
                  eventKey="4.4"
                  onClick={() => {
                    this.props.selectGrouping(grouping._id);
                  }}
                >
                  <span>{grouping.name} {grouping.type}</span>
                  {this.isSelectedG(grouping._id)}
                </MenuItem>
              );
            })}
          </NavDropdown>
            <NavDropdown eventKey={10} title="bps" >
              {_.map(this.props.curbps, bp => {
                return (<MenuItem onClick = {() => this.props.selectBudget(bp.budgetId)}
                  eventKey="4.2">
                {bp.name} {bp.comulativeBalance}
                {this.isSelectedBud(bp.budgetId)}
                </MenuItem>);
              })}
          </NavDropdown>
          <NavDropdown id="7" eventKey="4" title="date">

            {_.map(this.props.dates, date => {
              return (
                <MenuItem
                  eventKey="4.2"
                  onClick={() => this.props.updateDate(date)}
                >
                  {date}
                  {this.isSelectedD(date)}
                </MenuItem>
              );
            })}

          </NavDropdown>
          <NavDropdown id="3" eventKey="4" title={this.props.user.name}>

            <LinkContainer to="/grouping">
              <MenuItem eventKey="4.2">Groupings</MenuItem>
            </LinkContainer>
            <LinkContainer to="/budget">
              <MenuItem eventKey="4.2">budget</MenuItem>
            </LinkContainer>
            <LinkContainer to="/new">
              <MenuItem eventKey="4.4">new</MenuItem>
            </LinkContainer>


<LinkContainer to="/account">
            <MenuItem eventKey="4.2">
              account
            </MenuItem>
            </LinkContainer>

            <LinkContainer to="/transaction">
            <MenuItem eventKey="4.3">
              transaction
            </MenuItem>
            </LinkContainer>

          </NavDropdown>
          <NavItem eventKey={1} onClick={this.logOut}>Loguut</NavItem>
        </Nav>
        {this.renderSearchBar()}
        {this.renderMSG()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated,
    loading: state.model.isLoading,
    fetching: state.auth.isLoading,
    // fetching: true,
    user: state.auth.user,
    msgs: state.model.messages,
    totalBalance: totalBalance(state),
    accounts: state.model.accounts.data,
    groupings: state.model.groupings.data,
    currentRoute: state.router.location.pathname,
    selectedAccount: state.filter.account,
    selectedGrouping: state.filter.grouping,
    selectedBudget: state.filter.budget,
    selectedDate: state.filter.date,
    failedAttempt: state.auth.failedAttempt,
    dates: dateSelector(state),
    curbps: bps(state)
    // msgState: state.model.isNewMessage
  };
};

//TODO: theres is no update in reducers
const mapDispatchToProps = dispatch => {
  return {
    updateSearchTerm: term => {
      return dispatch({ type: "UPDATE", payload: term });
    },
    logIn: userInfo => dispatch(initAuth(userInfo)),
    signUp: userInfo => dispatch(initSignUp(userInfo)),
    logOut: () => dispatch(initLogOut()),
    dismiss: id => dispatch(disMissMessage(id)),
    getMe: () => dispatch(getMe()),
    updateDate: date => dispatch(applyDate(date)),
    uppdateTerm: term => dispatch(applyTerm(term)),
    selectAccount: _id => dispatch(applyAccountSelection(_id)),
    selectGrouping: _id => dispatch(applyGroupingSelection(_id)),
    selectBudget: _id => dispatch(applyBudgetSelection(_id))
  };
};

export default reduxForm({
  form: "login"
})(connect(mapStateToProps, mapDispatchToProps)(HeaderComponent));
