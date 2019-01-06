import React, { Component } from 'react';
import { WebView, TouchableOpacity, View, Text } from 'react-native';

export default class MyWeb extends Component {

  constructor( props ) {
    super( props );
    this.onMessage = this.onMessage.bind(this);
  }
  /*
  params
  size , one in [small, normal, large, huge]
  bold
  italic
  underline
  strike
  blockquote
  bullet
  ordered
  color, one in [#ffffff, ]
  align, one in [left, center, right, justify]
  link
  image
  */
  sendPostMessage(type, value) {
    var req = JSON.stringify({type, value});
    this.webView.postMessage(req);
  }
  onMessage( event ) {
    let data = event.nativeEvent.data;
    data = JSON.parse(data)
  }

  render() {
    return (
      <View 
        style={{width : '100%', height: '100%'}}
        >
        <TouchableOpacity
          onPress={() => this.sendPostMessage('link','left')}
          title="Learn More"
          color="#841584"><Text>1</Text></TouchableOpacity>
        <TouchableOpacity
          
          onPress={() => this.sendPostMessage('image','center')}
          title="Learn More"
          color="#841584"><Text>2</Text></TouchableOpacity>
        <TouchableOpacity
          
          onPress={() => this.sendPostMessage('align','right')}
          title="Learn More"
          color="#841584"><Text>3</Text></TouchableOpacity>
        <TouchableOpacity
          
          onPress={() => this.sendPostMessage('align','justify')}
          title="Learn More"
          color="#841584"><Text>4</Text></TouchableOpacity>
        <TouchableOpacity
          
          onPress={() => this.sendPostMessage('color','#66b966')}
          title="Learn More"
          color="#841584"><Text>5</Text></TouchableOpacity>
        <WebView
          source={require("./WebView.html")}
          style={{width : '100%'}}
          onMessage={this.onMessage}
          ref={( webView ) => this.webView = webView}
        />
      </View>
    );
  }
}