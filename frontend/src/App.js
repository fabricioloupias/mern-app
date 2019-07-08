import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

//Components

import AppUi from './components/app/AppUi'

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppUi />
        </div>
      </Provider>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default App;

