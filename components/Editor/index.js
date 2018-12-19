import React, { Component } from 'react';
import { WebView } from 'react-native';

export default class MyWeb extends Component {
  render() {
    return (
      <WebView
        source={require("./WebView.html")}
        style={{width : '100%', flex : 1}}
        onMessage={(event)=>{
          const x= event.nativeEvent.data;
          console.log("x: ",x);
          console.log("Type is: ",typeof(x));
      }}
      />
    );
  }
}