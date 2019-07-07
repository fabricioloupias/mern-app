import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import { Provider } from 'react-redux';
import store from './store';

//Components
import NavTop from './components/NavTop'
import PostsFeed from './components/PostsFeed'

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <NavTop />
      <PostsFeed />
    </div>
    </Provider>
  );
}

export default App;
