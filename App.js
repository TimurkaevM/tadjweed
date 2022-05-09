import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/index'
import RootRoutes from './src/Routes/RootRoutes';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
       <RootRoutes />
     </NavigationContainer>
     </Provider>
  );
}
