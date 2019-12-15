import React from 'react'
import { configure, shallow, render, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { createSerializer } from 'enzyme-to-json'
import configMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom'
import sinon from 'sinon'
import Faker from 'faker'
import moxios from 'moxios'

//set the default serializer for jest to be the from enzyme-to-json
//this produces an easier to read for humans
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }))

//React 16 enzyme adapter
configure({ adapter: new Adapter() })

//make enzyme functions available in all test files without importing
global.React = React;
global.shallow = shallow;
global.render = render;
global.mount = mount;
global.sinon = sinon;
global.moxios = moxios;
global.fakerStatic = Faker
global.mockStore = configMockStore([thunk])
global.renderConnectComponent = (component, store) => (
    <Provider store={store}>
        <Router>
            {component}
        </Router>
    </Provider>
)
global.simulateChange = (item, value, name) => {
    item.simulate('change', {
        target: {
            value,
            name
        }
    })
}

global.mockInstance = (component, instance) => {
    var mocked = jest.spyOn(component.instance(), instance)
    component.instance().forceUpdate()
    return mocked
}