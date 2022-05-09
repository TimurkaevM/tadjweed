import { api } from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LOGIN_START = 'user/login/start';
export const LOGIN_SUCCESS = 'user/login/success';
export const LOGIN_ERROR = 'user/login/error';
export const POST_LOGIN = 'user/login/post';
export const AUTH_START = 'user/auth/start';
export const AUTH_SUCCESS = 'user/auth/success';
export const AUTH_FINALLY = 'user/auth/finally';
export const CREATE_START = 'user/create/start';
export const CREATE_SUCCESS = 'user/create/success';
export const CREATE_ERROR = 'user/create/error';
export const LOGOUT = 'user/logout';
export const CHANGE_ERROR = 'error/change';

const initialState = {
  token: null,
  loading: false,
  loadingAuth: false,
  message: '',
  error: '',
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        loading: true,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload,
      };

    case LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case AUTH_START:
      return {
        ...state,
        loadingAuth: true,
      };

    case AUTH_SUCCESS:
      return {
        ...state,
        loadingAuth: false,
        token: action.payload,
      };

    case AUTH_FINALLY:
      return {
        ...state,
        loadingAuth: false,
      };

    case CREATE_START:
      return {
        ...state,
        loading: true,
      };

    case CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload,
      };

    case CREATE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case LOGOUT:
      AsyncStorage.removeItem('token');
      return {
        ...state,
        token: null,
      };

    case CHANGE_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
}

export const authAuto = () => {
  return async (dispatch) => {
    try {
      const value = await AsyncStorage.getItem('token');

      dispatch({
        type: AUTH_START,
      });

      if (value !== null) {
        dispatch({
          type: AUTH_SUCCESS,
          payload: value,
        });
      } else {
        dispatch({
          type: AUTH_FINALLY,
        });
      }
    } catch (e) {
      dispatch({
        type: AUTH_FINALLY,
      });
    }
  };
};

export const registration = (email, name, password, password_confirmation) => {
  return (dispatch) => {
    dispatch({
      type: CREATE_START,
    });

    api
      .post('/register/', {
        email,
        name,
        password,
        password_confirmation,
      })
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: CREATE_SUCCESS,
          payload: data.message.access_token,
        });
        AsyncStorage.setItem('token', data.message.access_token);
      })
      .catch((e) => {
        dispatch({
          type: CREATE_ERROR,
          payload: e,
        });
        console.error(e);
      });
  };
};

export const login = (email, password) => {
  return (dispatch) => {
    dispatch({
      type: LOGIN_START,
      email,
      password,
    });

    api
      .post('/login', {
        email,
        password,
      })
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: data.message.access_token,
        });
        AsyncStorage.setItem('token', data.message.access_token);
      })
      .catch((e) => {
        dispatch({
          type: LOGIN_ERROR,
          payload: e,
        });
        console.error(e);
      });
  };
};

export const userLogOut = () => {
  return {
    type: LOGOUT,
  };
};

export const ChangeError = () => {
  return {
    type: CHANGE_ERROR,
  };
};
