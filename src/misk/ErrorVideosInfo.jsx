import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { changeErrorVideos } from '../redux/ducks/videos';
import { useDispatch, useSelector } from 'react-redux';

export default function ErrorVideosInfo() {
  const dispatch = useDispatch();

  const errorVideos = useSelector((state) => state.videos.error);

  const handlePress = () => {
    dispatch(changeErrorVideos());
  };

  return (
    <View style={styles.errorContainer}>
      <Text>{errorVideos}</Text>
      <TouchableOpacity
        title="resume error"
        style={styles.errorResume}
        onPress={handlePress}
      >
        <Text style={styles.errorResumeText}>Повторить загрузку</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorResume: {
    marginTop: 30,
    backgroundColor: '#16a89e',
    padding: 20,
    borderRadius: 10,
  },
  errorResumeText: {
    color: '#fff',
  },
});
