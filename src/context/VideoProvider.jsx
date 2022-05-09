import { Text, View, Alert } from 'react-native';
import React, { Component, createContext } from 'react';
import * as MediaLibrary from 'expo-media-library';
import { DataProvider } from 'recyclerlistview';

export const VideoContext = createContext();

export class VideoProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audioFiles: [],
      dataProvider: new DataProvider((r1, r2) => r1 !== r2),
      permissionError: false,
    };
  }

  permissionAlert = () => {
    Alert.alert('Permission Required', 'This app needs to read audio files', [
      {
        text: 'I am ready',
        onPress: () => this.getPermission(),
      },
      {
        text: 'cancel',
        onPress: () => this.permissionAlert(),
      },
    ]);
  };

  getAudioFiles = async () => {
    const { dataProvider, audioFiles } = this.state;
    let media = await MediaLibrary.getAssetsAsync({
      mediaType: 'audio',
    });
    media = await MediaLibrary.getAssetsAsync({
      mediaType: 'audio',
      first: media.totalCount,
    });
    this.totalAudioCount = media.totalCount;

    this.setState({
      ...this.state,
      dataProvider: dataProvider.cloneWithRows([
        ...audioFiles,
        ...media.assets,
      ]),
      audioFiles: [...audioFiles, ...media.assets],
    });
  };

  getPermission = async () => {
    const permission = await MediaLibrary.getPermissionsAsync();
    if (permission.granted) {
      this.getAudioFiles();
    }

    if (!permission.granted && permission.canAskAgain) {
      const { status, canAskAgain } =
        await MediaLibrary.requestPermissionsAsync();

      if (status === 'denied' && canAskAgain) {
        this.permissionAlert();
      }

      if (status === 'granted') {
        this.getAudioFiles();
      }

      if (status === 'denied' && !canAskAgain) {
        this.setState({
          ...this.state,
          permissionError: true,
        });
      }
    }
  };

  componentDidMount() {
    this.getPermission();
  }
  render() {
    return (
      <VideoContext.Provider
        value={{
          audioFiles: this.state.audioFiles,
          dataProvider: this.state.dataProvider,
          permissionError: this.state.permissionError,
        }}
      >
        {this.props.children}
      </VideoContext.Provider>
    );
  }
}

export default VideoProvider;
