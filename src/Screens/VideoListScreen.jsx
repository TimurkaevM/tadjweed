import { View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import VideoListItem from '../components/VideoListItem';
import StatusBarPlaceHolder from '../misk/StatusBarPlaceHolder';
import HeaderVideos from '../components/HeaderVideos';
import color from '../misk/color';
import {
  LayoutProvider,
  RecyclerListView,
  DataProvider,
} from 'recyclerlistview';
import ErrorVideosInfo from '../misk/ErrorVideosInfo';

const VideoListScreen = ({navigation}) => {
  const { navigate } = navigation;

  const videos = useSelector((state) => state.videos.videos);
  const loading = useSelector((state) => state.videos.loading);
  const errorVideos = useSelector((state) => state.videos.error);

  console.log(videos)

  const [dataProvider, setDataProvider] = useState(
    new DataProvider((r1, r2) => r1 !== r2),
  );

  const getVideoFiles = async () => {
    setDataProvider(dataProvider.cloneWithRows([...videos]));
  };

  const layoutProvider = new LayoutProvider(
    (i) => 'video',
    (type, dim) => {
      switch (type) {
        case 'video':
          dim.width = Dimensions.get('window').width;
          dim.height = Dimensions.get('window').width > 500 ? 470 : 270;
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

  useEffect(() => {
    getVideoFiles();
  }, [videos]);

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
        {errorVideos ? (
          <ErrorVideosInfo />
        ) : (
          dataProvider && dataProvider.getSize() > 0 && (
            <RecyclerListView
              dataProvider={dataProvider}
              layoutProvider={layoutProvider}
              rowRenderer={rowRender}
            />
          )
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

  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  preloader: {
    flex: 1,
    justifyContent: "center"
  },
});

export default VideoListScreen;
