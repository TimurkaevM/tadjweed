import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from './AuthScreen';
import RegistrationScreen from './RegistrationScreen';

const Stack = createNativeStackNavigator();

const config = {
  animation: 'timing',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

function EntranceScreen() {
  return (
    <Stack.Navigator initialRouteName="Auth">
      <Stack.Screen
        name="Auth"
        component={AuthScreen}
        options={{
          title: 'Авторизация',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#16a89e',
          transitionSpec: {
            open: config,
            close: config,
          },
        }}
      />
      <Stack.Screen
        name="RegistrationScreen"
        component={RegistrationScreen}
        options={{
          title: 'Регистрация',
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#16a89e',
          transitionSpec: {
            open: config,
            close: config,
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default EntranceScreen;
