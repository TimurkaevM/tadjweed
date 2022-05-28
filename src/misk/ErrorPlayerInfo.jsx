import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { changeErrorVideo } from '../redux/ducks/video';
import { useDispatch, useSelector } from 'react-redux';

export default function ErrorPlayerInfo() {
  const dispatch = useDispatch();

  const errorVideo = useSelector((state) => state.video.error);

  const handlePress = () => {
    dispatch(changeErrorVideo());
  };

  return (
    <View style={styles.errorContainer}>
      <Text>{errorVideo}</Text>
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
