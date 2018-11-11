import React, { Component } from 'react';
import { CameraRoll, Image, ScrollView, StyleSheet, Text } from 'react-native';


export default class App extends Component {
  state = { photos: null };

  render() {
    let { photos } = this.state;
    return (
      <ScrollView style = {{ height: '100%' }}> 
        {photos
          ? this._renderPhotos(photos)
          : <Text>Fetching photos...</Text>}
      </ScrollView>
    );
  }

  _renderPhotos(photos) {
    let images = [];
    let i = 0;
    for (let { node: photo } of photos.edges) {
      i++;
      images.push(
        <Image
          key={i}
          source={photo.image}
          resizeMode="contain"
          style={{ height: 100, width: 100, resizeMode: 'contain' }}
        />
      );
    }
    return images;
  }

  componentDidMount() {
    this._getPhotosAsync().catch(error => {
      console.error(error);
    });
  }

  async _getPhotosAsync() {
    let photos = await CameraRoll.getPhotos({ first: 4 });
    this.setState({ photos });
  }
}