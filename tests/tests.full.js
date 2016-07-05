import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import UserComponent from '../src/userComponent';
import UsersListComponent from '../src/usersListComponent';


let wrapper;


describe('Test suite for UserComponent', () => {
  beforeEach(() => {
    wrapper = shallow(<UserComponent
                            name={ 'Reign' }
                            age={ 26 } />);
  });

  it('Contains the top level root element rendered with the right class', () => {
    expect(wrapper.type()).to.equal('div');
    expect(wrapper.hasClass('user')).to.equal(true);
  });

  it('Contains the paragraph for `name` rendered with the right class and the right name value', () => {
    let namePar = wrapper.childAt(0);
    expect(namePar.type()).to.equal('p');
    expect(namePar.hasClass('user__name')).to.equal(true);
    expect(namePar.text()).to.equal('Name: Reign');
  });

  it('Contains the paragraph for `age` rendered with the right class and the right age value', () => {
    let agePar = wrapper.childAt(1);
    expect(agePar.type()).to.equal('p');
    expect(agePar.hasClass('user__age')).to.equal(true);
    expect(agePar.text()).to.equal('Age: 26');
  });
});


describe('Test suite for UsersListComponent', () => {
  beforeEach(() => {
    wrapper = mount(<UsersListComponent />);
  });

  it('Contains the top level root element rendered with the right class', () => {
    expect(wrapper.type()).to.equal('div');
    expect(wrapper.hasClass('users-list')).to.equal(true);
  });
});
