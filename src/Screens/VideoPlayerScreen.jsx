import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import VideoPlayer from '../components/VideoPlayer';
import color from '../misk/color';
import ErrorPlayerInfo from '../misk/ErrorPlayerInfo';
import { getVideo } from '../redux/ducks/video';

const VideoPlayerScreen = (props) => {
  const dispatch = useDispatch();

  const { setOptions } = props.navigation;
  const { params } = props.route;
  const id = params.id;

  const video = useSelector((state) => state.video.video);
  const loading = useSelector((state) => state.video.loading);
  const error = useSelector((state) => state.video.error);

  useEffect(() => {
    dispatch(getVideo(id));
  }, [dispatch, id, error]);

  if (loading) {
    return (
      <View style={styles.preloader}>
        <ActivityIndicator size={50} color="#16a89e" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {error ? (
        <ErrorPlayerInfo />
      ) : (
        <VideoPlayer setOptions={setOptions} video={video} />
      )}
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    alignSelf: 'center',
    width: width - 80,
    height: 300,
    opacity: 1,
    backgroundColor: color.APP_BG,
    overflow: 'hidden',
    marginTop: 40,
    marginBottom: 20,
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  preloader: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default VideoPlayerScreen;
