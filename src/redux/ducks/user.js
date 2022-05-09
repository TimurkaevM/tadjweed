import { api } from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GET_USER_START = 'get/user/start';
const GET_USER_SUCCESS = 'get/user/success';

const initialState = {
  user: {},
  loading: false,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case GET_USER_START:
      return {
        ...state,
        loading: true,
      };

    case GET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}

export const getCurrentUser = () => {
  return async (dispatch) => {
    try {
      const value = await AsyncStorage.getItem('token');

      dispatch({
        type: GET_USER_START,
      });

      if (value !== null) {
        const response = await api.get('/v1/user', {
          headers: { Authorization: `Bearer ${value}` },
        });

        dispatch({
          type: GET_USER_SUCCESS,
          payload: response.data.message,
        });
      }
    } catch (e) {
      console.log(e.response);
    }
  };
};
