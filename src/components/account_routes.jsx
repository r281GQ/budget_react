import React from 'react';
import {Route} from 'react-router-dom'

const cre= () => () => <div>ge</div>
const cre1= () => () => <div>ge1</div>

const AccountRoutes = () => {
  return (
    <div >
      <Route
        exact
        path="/account"
        component={cre()}
      />
      <Route
        exact
        path="/account/new"
        component={cre1()}
      />
    </div>
  );
}


export default AccountRoutes;
