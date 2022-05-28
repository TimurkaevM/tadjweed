import { View, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import VideoListItem from '../components/VideoListItem';
import StatusBarPlaceHolder from '../misk/StatusBarPlaceHolder';
import HeaderVideos from '../components/HeaderVideos';
import color from '../misk/color';
import ErrorVideosInfo from '../misk/ErrorVideosInfo';

const VideoListScreen = ({ navigation }) => {
  const { navigate } = navigation;

  const videos = useSelector((state) => state.videos.videos);
  const loading = useSelector((state) => state.videos.loading);
  const errorVideos = useSelector((state) => state.videos.error);

  const renderItem = ({ item }) => {
    return (
      <VideoListItem
        navigate={navigate}
        is_watched={item.is_watched}
        id={item.id}
        preview={item.preview}
        key={item.id}
      />
    );
  };

  if (loading) {
    return (
      <View style={styles.preloader}>
        <ActivityIndicator size={50} color="#16a89e" />
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
          <FlatList
            horizontal={false}
            data={videos}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
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
    backgroundColor: color.FONT,
  },

  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  preloader: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default VideoListScreen;
