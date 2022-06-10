import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { setIsWatched } from '../redux/ducks/videos';

export default function VideoListItem({ navigate, id, is_watched, preview }) {
  const dispatch = useDispatch();

  const changeIsWatched = () => {
    dispatch(setIsWatched(id));
    navigate('VideoPlayerScreen', { id });
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.btn}
          title="Pick an video"
          onPress={changeIsWatched}
        >
          <Image
            style={[
              styles.image,
              {
                opacity: is_watched ? 0.55 : 1,
              },
            ]}
            source={{
              uri: `https://tadjweed.ru/storage/${preview}`,
            }}
          />
        </TouchableOpacity>
        {is_watched ? (
          <View style={styles.isShow}>
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 20,
                backgroundColor: '#34dc3b',
                marginRight: 5,
              }}
            ></View>
            <Text>Просмотрено</Text>
          </View>
        ) : null}
      </View>
    </>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: width > 600 ? 470 : width - 20,
    marginVertical: 20,
    position: 'relative',
    zIndex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    resizeMode: 'center',
  },
  btn: {
    alignSelf: 'center',
    width: width > 600 ? 770 : width - 20,
    height: width > 600 ? 440 : 250,
    borderRadius: 20,
  },
  isShow: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'right',
    fontSize: 16,
    fontWeight: '700',
    position: 'absolute',
    top: width > 600 ? 20 : 10,
    right: width > 600 ? -120 : 20,
    zIndex: 3000,
  },
});
