import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SwitchNavi from './navigation';

// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';

//styled
import theme from './style/theme';
import { ThemeProvider } from 'styled-components';

const store = createStore(reducer, applyMiddleware(thunk));

export default class App extends React.Component {
  render() {
    return (
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <SwitchNavi/>
          </ThemeProvider>
        </Provider>
    );
  }
}