import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import color from '../misk/color';
import { userLogOut } from '../redux/ducks/auth';

export default function HeaderVideos() {
  const dispatch = useDispatch();

  const name = useSelector((state) => state.user.user.name);

  const handlePress = () => {
    dispatch(userLogOut());
  };

  return (
    <View style={{ alignItems: 'center', backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Text style={{ fontSize: 15, textTransform: 'uppercase' }}>
            Уроки таджвида
          </Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.rightContainerText}>{name}</Text>
          <TouchableOpacity
            style={styles.btn}
            title="LogOut"
            onPress={handlePress}
          >
            <Entypo name="back" size={24} color={color.APP_BG} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width - 25,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  leftContainer: {},
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightContainerText: {
    marginRight: 20,
    color: '#cccccc',
  },
  btn: {
    padding: 5,
  },
});
