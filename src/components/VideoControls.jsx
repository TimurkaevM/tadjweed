import React, { useState } from 'react';
import { View, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Slider from 'react-native-slider';
import DropDownPicker from 'react-native-dropdown-picker';
import { Ionicons } from '@expo/vector-icons';

const VideoControls = (props) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: '1080', value: '1080' },
    { label: '480', value: '480' },
  ]);

  const {
    state,
    togglePlay,
    playbackInstanceInfo,
    setPlaybackInstanceInfo,
    playbackInstance,
  } = props;

  function renderIcon() {
    if (state === 'Buffering') {
      return <ActivityIndicator size={20} color="white" />;
    } else if (state === 'Playing') {
      return <FontAwesome name="pause" size={18} color="#fff" />;
    } else if (state === 'Paused') {
      return <FontAwesome name="play" size={20} color="#fff" />;
    } else if (state === 'Ended') {
      return <MaterialIcons name="replay" size={20} color="#fff" />;
    }
  }

  return (
    <View style={styles.container}>
      <View tint="dark" intensity={42} style={styles.innerContainer}>
        <Pressable
          style={styles.iconWrapper}
          onPress={state === 'Buffering' ? null : togglePlay}
        >
          {renderIcon()}
        </Pressable>
        <Slider
          style={styles.slider}
          thumbTintColor={'#fff'}
          thumbStyle={{
            height: 17,
            width: 17,
            borderRadius: 100,
          }}
          minimumTrackTintColor={'red'}
          maximumTrackTintColor="#8E9092"
          value={
            playbackInstanceInfo.duration
              ? playbackInstanceInfo.position / playbackInstanceInfo.duration
              : 0
          }
          onSlidingStart={() => {
            if (playbackInstanceInfo.state === 'Playing') {
              togglePlay();
              setPlaybackInstanceInfo({
                ...playbackInstanceInfo,
                state: 'Paused',
              });
            }
          }}
          onSlidingComplete={async (e) => {
            const position = e * playbackInstanceInfo.duration;
            if (playbackInstance) {
              await playbackInstance.setStatusAsync({
                positionMillis: position,
                shouldPlay: true,
              });
            }
            setPlaybackInstanceInfo({
              ...playbackInstanceInfo,
              position,
            });
          }}
        />
        <View style={{ width: 60 }}>
          <DropDownPicker
            open={open}
            value={props.quality}
            items={items}
            setOpen={setOpen}
            setValue={props.setQuality}
            setItems={setItems}
            showArrowIcon={true}
            theme="LIGHT"
            mode="DEFAULT"
            ArrowUpIconComponent={({ style }) => (
              <Ionicons name="settings-sharp" size={19} color="#fff" />
            )}
            ArrowDownIconComponent={({ style }) => (
              <Ionicons name="settings-sharp" size={19} color="#fff" />
            )}
            dropDownDirection="TOP"
            style={{ color: '#fff', backgroundColor: '#000' }}
            disableBorderRadius={true}
            dropDownContainerStyle={{ width: 77 }}
            textStyle={{
              fontSize: 9.5,
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,
    paddingHorizontal: 12,
    width: '100%',
    height: 66,
  },
  iconWrapper: {
    backgroundColor: 'rgba(255, 48, 48, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  slider: {
    flex: 1,
    marginHorizontal: 20,
  },
});

export default VideoControls;
