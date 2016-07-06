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

  it('Renders null based on the initial state (empty `usersList` array)', () => {
    expect(wrapper.state().usersList).to.be.instanceof(Array);
    expect(wrapper.state().usersList.length).to.equal(0);
    expect(wrapper.html()).to.equal(null);
  });

  it('Calls `componentDidMount` lifecycle method', () => {
    sinon.spy(UsersListComponent.prototype, 'componentDidMount');
    // Overwrite, so we can correctly reason about the count number
    // Don't want shared state
    wrapper = mount(<UsersListComponent />);
    expect(UsersListComponent.prototype.componentDidMount.calledOnce).to.equal(true);
  });

  it('Renders the root `div` with the right class and calls `_constructUsersList` to create the users list', () => {
    sinon.spy(UsersListComponent.prototype, '_constructUsersList');
    wrapper.setState({
      usersList: [
        {
          name: 'Reign',
          age: 26
        }
      ]
    });
    expect(wrapper.find('.users-list')).to.have.length(1);
    expect(UsersListComponent.prototype._constructUsersList.calledOnce).to.equal(true);
  });

  it('The `_constructUsersList` behaves correctly', () => {
    wrapper.setState({
      usersList: [
        {
          name: 'Reign',
          age: 26
        },
        {
          name: 'Vlad',
          age: 30
        }
      ]
    });
    const res = wrapper.instance()._constructUsersList();
    expect(res).to.be.instanceof(Array);
    expect(res.length).to.equal(2);
    expect(mount(res[0]).type()).to.equal(UserComponent);
    expect(res[0].props.name).to.equal('Reign');
    expect(res[0].props.age).to.equal(26);
    expect(mount(res[1]).type()).to.equal(UserComponent);
    expect(res[1].props.name).to.equal('Vlad');
    expect(res[1].props.age).to.equal(30);
  });
});
