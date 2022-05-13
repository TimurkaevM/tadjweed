import { Text, View, StyleSheet, Dimensions, Alert, ActivityIndicator } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import VideoListItem from '../components/VideoListItem';
import StatusBarPlaceHolder from '../misk/StatusBarPlaceHolder';
import HeaderVideos from '../components/HeaderVideos';
import color from '../misk/color';
import {
  LayoutProvider,
  RecyclerListView,
  DataProvider,
} from 'recyclerlistview';

const VideoListScreen = ({navigation}) => {
  const { navigate } = navigation;

  const videos = useSelector((state) => state.videos.videos);
  const loading = useSelector((state) => state.videos.loading);

  const [audioFiles, setAudioFiles] = useState([]);
  const [permissionError, setPermissionError] = useState(false);

  const [dataProvider, setDataProvider] = useState(
    new DataProvider((r1, r2) => r1 !== r2),
  );

  const getPermission = useCallback(async () => {
    const permission = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (permission.granted) {
      getAudioFiles();
    }

    if (!permission.canAskAgain && !permission.granted) {
      setPermissionError(true);
    }

    if (!permission.granted && permission.canAskAgain) {
      const { status, canAskAgain } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status === 'denied' && canAskAgain) {
        permissionAlert();
      }

      if (status === 'granted') {
        getAudioFiles();
      }

      if (status === 'denied' && !canAskAgain) {
        setPermissionError(true);
      }
    }
  }, []);

  const permissionAlert = () => {
    Alert.alert('Permission Required', 'This app needs to read audio files', [
      {
        text: 'I am ready',
        onPress: () => getPermission(),
      },
      {
        text: 'cancel',
        onPress: () => permissionAlert(),
      },
    ]);
  };

  const getAudioFiles = async () => {
    let media = await MediaLibrary.getAssetsAsync({
      mediaType: 'video',
    });
    media = await MediaLibrary.getAssetsAsync({
      mediaType: 'video',
      first: media.totalCount,
    });
    setAudioFiles([...audioFiles, ...media.assets]);
    setDataProvider(
      dataProvider.cloneWithRows([...audioFiles, ...media.assets]),
    );
  };

  const getVideoFiles = async () => {
    setDataProvider(dataProvider.cloneWithRows([...videos, ...videos]));
  };

  const layoutProvider = new LayoutProvider(
    (i) => 'video',
    (type, dim) => {
      switch (type) {
        case 'video':
          dim.width = Dimensions.get('window').width;
          dim.height = 270;
          break;
        default:
          dim.width = 0;
          dim.height = 0;
      }
    },
  );

  const rowRender = (type, item) => {
    return (
        <VideoListItem
          navigate={navigate}
          is_watched={item.is_watched}
          id={item.id}
          preview={item.preview}
        />
    );
  };

  // useEffect(() => {
  //   getPermission();
  // }, []);

  useEffect(() => {
    getVideoFiles();
  }, [videos]);


  if (permissionError) {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 25, textAlign: 'center', color: 'red' }}>
          It looks like you haven't accept the permission.
        </Text>
      </View>
    );
  }

  if(loading) {
    return (
      <View style={styles.preloader}>
        <ActivityIndicator size={50} color='#16a89e' />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, backgroundColor: color.FONT }}>
        <StatusBarPlaceHolder />
        <HeaderVideos />
        {dataProvider && dataProvider.getSize() > 0 && (
          <RecyclerListView
            dataProvider={dataProvider}
            layoutProvider={layoutProvider}
            rowRenderer={rowRender}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  preloader: {
    flex: 1,
    justifyContent: "center"
  },
});

export default VideoListScreen;
