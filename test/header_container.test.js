import { shallow } from 'enzyme';
import React from 'react'
import HeaderContainer from './../src/components/header-component';

const Label = () => <div>Element to test</div>

it('s', ()=>{
  const wrapper = shallow(<Label/>);

  expect(wrapper).toMatchSnapchot();
})
