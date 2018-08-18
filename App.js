import React from 'react';
import styled from 'styled-components';
import { Text } from 'react-native';
import { AppNavigator } from './navigation';
import { Font } from 'expo';

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

  state = {
    fontLoaded : false
  }
  async componentDidMount() {
    await Font.loadAsync({
      'NanumGothic-bold': require('./assets/fonts/NanumGothic-Bold.ttf'),
      'NanumGothic-Bold': require('./assets/fonts/NanumGothic-ExtraBold.ttf'),
      'NanumGothic': require('./assets/fonts/NanumGothic-Regular.ttf'),
    });

    this.setState({ fontLoaded: true });

  }

  render() {
    return (
      <Provider store={store}>
        {this.state.fontLoaded ? <AppWithNavigationState/> : <Load><Text>Loading</Text></Load>}
      </Provider>
    );
  }
}
const Load = styled.View`
  flex: 1;
  justify-content : center;
  align-items : center;
`;