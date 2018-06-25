import React from 'react';
import { Text, View } from 'react-native';
import { AppNavigator } from './navigation';

// Redux
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';

// Combine Navigation with Redux
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
} from 'react-navigation-redux-helpers';


// Middleware & store
const navReducer = createNavigationReducer(AppNavigator);
const appReducer = combineReducers({
  nav: navReducer,
  redux: reducer
});
const navigationMiddleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav,
);
const App = reduxifyNavigator(AppNavigator, "root");
const mapStateToProps = (state) => ({
  state: state.nav
});
const AppWithNavigationState = connect(mapStateToProps)(App);

const store = createStore(appReducer, applyMiddleware(thunk, navigationMiddleware));

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
          <AppWithNavigationState/>
      </Provider>
    );
  }
}