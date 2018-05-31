import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';

import reducers from './reducers';
import LoginUser from './components/login_user';
import RegisterUser from './components/register_user';
import ChangePassword from './components/change_password'
import ListCharities from './components/list_charities';
import DonateToCharity from './components/donate_charity';

import './style.css';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/user/register" component={RegisterUser}/>
          <Route path="/user/changePassword" component={ChangePassword}/>
          <Route path="/charities" component={ListCharities}/>
          <Route path="/donation/:id" component={DonateToCharity}/>
          <Route path="/" component={LoginUser} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
