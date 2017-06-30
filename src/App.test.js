import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from './App';
import toJson from 'enzyme-to-json';
import Header from './components/header-component';
import Ac from './components/createAccountFormComponent';
const Label = () => <div>Element to test1</div>
it('renders without crashing', () => {
  // const div = document.createElement('div');
  // ReactDOM.render(<Label />, div);

  const wrapper = shallow(<Ac/>);

  expect(toJson(wrapper)).toMatchSnapshot();

});
