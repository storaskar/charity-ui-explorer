import React from 'react';
import {shallow, mount} from 'enzyme';
import RegisterUser from './register_user';
import {CREATE_USER} from '../actions/index';
import { reducer as formReducer } from 'redux-form'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import {UserReducer} from '../reducers/reducer_users';

it('Renders successfully', () => {
  shallow(<RegisterUser />);
});


it('Renders Title', () => {
  const wrapper = shallow(<RegisterUser/>);
  expect(wrapper.find('form h2'));
});


/** TO BE EXPANDED **/
