// login.test.js
import React from 'react';
import LoginUser from './login_user';
import {shallow, mount} from 'enzyme';

it('Renders successfully', () => {
  shallow(<LoginUser />);
});

it('Renders Title', () => {
  const wrapper = shallow(<LoginUser/>);
  expect(wrapper.find('form h2'));
});

/** TO BE EXPANDED **/
