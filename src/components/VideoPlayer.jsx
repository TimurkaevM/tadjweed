import React, { useEffect, useRef, useState } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import { View, StyleSheet, Dimensions, Pressable } from 'react-native';
import { Video } from 'expo-av';

import VideoControls from './VideoControls';

const { width, height } = Dimensions.get('window');

const VideoPlayer = ({ video, setOptions }) => {
  const [quality, setQuality] = React.useState('1080');
  const [playbackInstanceInfo, setPlaybackInstanceInfo] = useState({
    position: 0,
    duration: 0,
    state: 'Buffering',
  });

  const [videoWidth, setVideoWidth] = React.useState(null);
  const [videoHeight, setVideoHeight] = React.useState(null);
  const [orientation, setOrientation] = useState(null);
  const [visibleControls, setVisibleControls] = useState(false);

  const currentQuality = video.sources?.find(
    (item) => item.quality === quality,
  );

  const playbackInstance = useRef(null);

  useEffect(() => {
    return () => {
      if (playbackInstance.current) {
        playbackInstance.current.setStatusAsync({
          shouldPlay: false,
        });
      }
    };
  }, []);

  useEffect(() => {
    // set initial orientation
    ScreenOrientation.getOrientationAsync().then((info) => {
      setOrientation(info);
      if (info === 1 || info === 2) {
        setVideoHeight(height / 2);
        setVideoWidth(width);
      } else {
        setVideoHeight(width);
        setVideoWidth(height);
      }
    });

    // subscribe to future changes
    const subscription = ScreenOrientation.addOrientationChangeListener(
      (evt) => {
        const info = evt.orientationInfo.orientation;
        setOrientation(info);
        if (info === 1 || info === 2) {
          setVideoHeight(height / 2);
          setVideoWidth(width);
        } else {
          setVideoHeight(width);
          setVideoWidth(height);
        }
      },
    );

    // return a clean up function to unsubscribe from notifications
    return () => {
      ScreenOrientation.removeOrientationChangeListener(subscription);
    };
  }, [orientation]);

  useEffect(() => {
    const updateLayout = () => {
      if (orientation === 1 || orientation === 2) {
        setVideoHeight(height / 2);
        setVideoWidth(width);
      } else {
        setVideoHeight(height - 10);
        setVideoWidth(width - 10);
      }
    };

    Dimensions.addEventListener('change', updateLayout);

    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  }, []);

  useEffect(() => {
    setOptions({
      title: video.info?.title,
      headerShown: !visibleControls,
      headerStyle: {
        backgroundColor: '#000',
        opacity: 0.5,
      },
    });
  }, [visibleControls]);

  const togglePlay = async () => {
    const shouldPlay = playbackInstanceInfo.state !== 'Playing';

    if (playbackInstance.current !== null) {
      await playbackInstance.current.setStatusAsync({
        shouldPlay,
        ...(playbackInstanceInfo.state === 'Ended' && { positionMillis: 0 }),
      });
      setPlaybackInstanceInfo({
        ...playbackInstanceInfo,
        state: playbackInstanceInfo.state === 'Playing' ? 'Paused' : 'Playing',
      });
    }
  };

  const changeVisibleControls = () => {
    setVisibleControls(!visibleControls);
  };

  const updatePlaybackCallback = (status) => {
    // console.log(status, 'status');
    if (status.isLoaded) {
      setPlaybackInstanceInfo({
        ...playbackInstanceInfo,
        position: status.positionMillis,
        duration: status.durationMillis || 0,
        state: status.didJustFinish
          ? 'Ended'
          : status.isBuffering
          ? 'Buffering'
          : status.shouldPlay
          ? 'Playing'
          : 'Paused',
      });
    } else {
      if (status.isLoaded === false && status.error) {
        const errorMsg = `Encountered a fatal error during playback: ${status.error}`;
        // console.log(errorMsg, 'error');
        // setErrorMessage(errorMsg)
      }
    }
  };

  return (
    <Pressable
      onPress={changeVisibleControls}
      style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center' }}
    >
      <Video
        ref={playbackInstance}
        style={[
          styles.video,
          {
            width: videoWidth,
            height: videoHeight,
          },
        ]}
        source={{
          uri: `https://tadjweed.ru/storage/${currentQuality?.filename}`,
        }}
        resizeMode="contain"
        isLooping
        shouldPlay
        onPlaybackStatusUpdate={updatePlaybackCallback}
      />
      <View style={styles.controlsContainer}>
        {visibleControls ? null : (
          <VideoControls
            state={playbackInstanceInfo.state}
            playbackInstance={playbackInstance.current}
            playbackInstanceInfo={playbackInstanceInfo}
            setPlaybackInstanceInfo={setPlaybackInstanceInfo}
            togglePlay={togglePlay}
            quality={quality}
            setQuality={setQuality}
          />
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  video: {
    alignSelf: 'center',
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 10,
  },
});

export default VideoPlayer;
