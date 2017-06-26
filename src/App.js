import React, { Component } from "react";
import { Route } from "react-router";
import AboutComponent from "./components/about-component";
import MainComponent from "./components/main-component";
import HeaderComponent from "./components/header-component";
import GroupingComponent from "./components/grouping-component";
import CreateTransactionContainer from "./containers/create_transaction_container";
import AccountContainer from "./containers/account-container";
import TransactionListContainer from "./containers/transactin_list_container";
import BudgetContainer from "./containers/budget_container";

class App extends Component {
  render() {
    return (
      <div>
        <HeaderComponent />
        <Route path="/main" component={MainComponent} />
        <Route path="/about" component={AboutComponent} />
        <Route path="/grouping" component={GroupingComponent} />
        <Route path="/new" component={CreateTransactionContainer} />
        <Route path="/transaction" component={TransactionListContainer} />
        <Route path="/account" component={AccountContainer} />
        <Route path="/budget" component={BudgetContainer} />
      </div>
    );
  }
}

export default App;
