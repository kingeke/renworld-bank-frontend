import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { routeLinks } from './NavLinks';
import Login from '../components/pages/Login';
import SignUp from '../components/pages/SignUp';
import Page404 from '../components/pages/Page404';
import UserPrivateRouter from '../services/UserPrivateRouter';
import Dashboard from '../components/pages/dashboard/Dashboard';
import EditProfile from '../components/pages/profile/EditProfile';
import ChangePassword from '../components/pages/profile/ChangePassword';
import Accounts from '../components/pages/accounts/Accounts';
import Account from '../components/pages/accounts/Account';
import Transactions from '../components/pages/transactions/Transactions';
import Transaction from '../components/pages/transactions/Transaction';
import Transfer from '../components/pages/transactions/Transfer';
import FundAccount from '../components/pages/accounts/FundAccount';
import CreateAccount from '../components/pages/accounts/CreateAccount';

export default function Routes() {
    return (
        <Switch>
            <Route exact path={routeLinks.login} component={Login} />
            <Route exact path={routeLinks.signUp} component={SignUp} />

            {/* private routes */}
            <UserPrivateRouter exact path={routeLinks.index} component={Dashboard} />
            <UserPrivateRouter exact path={routeLinks.editProfile} component={EditProfile} />
            <UserPrivateRouter exact path={routeLinks.changePassword} component={ChangePassword} />
            <UserPrivateRouter exact path={routeLinks.transfer} component={Transfer} />
            <UserPrivateRouter exact path={routeLinks.accounts} component={Accounts} />
            <UserPrivateRouter exact path={`${routeLinks.accounts}/create`} component={CreateAccount} />
            <UserPrivateRouter exact path={routeLinks.account} component={FundAccount} />
            <UserPrivateRouter exact path={`${routeLinks.account}/:account_number`} component={Account} />
            <UserPrivateRouter exact path={routeLinks.transactions} component={Transactions} />
            <UserPrivateRouter exact path={`${routeLinks.transaction}/:transaction_ref`} component={Transaction} />

            {/* 404 page */}
            <Route component={Page404} />
        </Switch>
    )
}