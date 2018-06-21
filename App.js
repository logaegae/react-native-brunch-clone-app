import React from 'react';
import { Text, View } from 'react-native';
import SwitchNavi from './navigation';

// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';

// Styled
const store = createStore(reducer, applyMiddleware(thunk));

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
          <SwitchNavi/>
      </Provider>
    );
  }
}