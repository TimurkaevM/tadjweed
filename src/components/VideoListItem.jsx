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

const convertTime = (minutes) => {
  if (minutes) {
    const hrs = minutes / 60;
    const minute = hrs.toString().split('.')[0];
    const percent = parseInt(hrs.toString().split('.')[1].slice(0, 2));
    const sec = Math.ceil((60 * percent) / 100);

    if (parseInt(minute) < 10 && sec < 10) {
      return `0${minute}:0${sec}`;
    }

    if (parseInt(minute) < 10) {
      return `0${minute}:${sec}`;
    }

    if (sec < 10) {
      return `${minute}:0${sec}`;
    }

    return `${minute}:${sec}`;
  }
};

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

console.log(width)

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: width > 500 ? 470 : width - 20,
    marginVertical: 30,
    position: 'relative',
    zIndex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    resizeMode: 'cover',
  },
  btn: {
    alignSelf: 'center',
    width: width > 500 ? 770 : width - 20,
    height: width > 500 ? 440 : 250,
    borderRadius: 20,
  },
  isShow: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'right',
    fontSize: 16,
    fontWeight: '700',
    position: 'absolute',
    top: width > 500 ? 20 : 10,
    right: width > 500 ? -120 : 20,
    zIndex: 3000,
  },
});
