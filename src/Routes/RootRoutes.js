import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authAuto } from '../redux/ducks/auth';
import EntranceScreen from '../Screens/EntranceScreen';
import TadjveedScreen from '../Screens/TadjveedScreen';

function RootRoutes() {
  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authAuto());
  }, [dispatch]);

  let routes = null;

  if (!token) {
    routes = <EntranceScreen />;
  } else {
    routes = <TadjveedScreen />;
  }

  return routes;
}

export default RootRoutes;
