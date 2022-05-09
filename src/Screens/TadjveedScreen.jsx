import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VideoListScreen from './VideoListScreen';
import VideoPlayerScreen from './VideoPlayerScreen';
import { getCurrentUser } from '../redux/ducks/user';
import { getVideos } from '../redux/ducks/videos';
import color from '../misk/color';
// import * as ScreenOrientation from 'expo-screen-orientation';

const Stack = createNativeStackNavigator();

function TadjveedScreen() {
  // ScreenOrientation.unlockAsync();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
    dispatch(getVideos());
  }, [dispatch]);

  return (
    <Stack.Navigator initialRouteName="VideoListScreen">
      <Stack.Screen
        name="VideoListScreen"
        component={VideoListScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="VideoPlayerScreen"
        component={VideoPlayerScreen}
        options={{
          title: 'Урок таджвида',
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: color.FONT,
        }}
      />
    </Stack.Navigator>
  );
}

export default TadjveedScreen;
