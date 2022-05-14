import { api } from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GET_VIDEO_START = 'get/video/start';
const GET_VIDEO_SUCCESS = 'get/video/success';
const GET_VIDEO_ERROR = 'get/video/error';
const VIDEO_RELOAD = 'video/reload';

const initialState = {
  video: {},
  error: null,
  loading: false,
};

export default function video(state = initialState, action) {
  switch (action.type) {
    case GET_VIDEO_START:
      return {
        ...state,
        loading: true,
      };

    case GET_VIDEO_SUCCESS:
      return {
        ...state,
        video: action.payload,
        loading: false,
      };
    
    case GET_VIDEO_ERROR:
      return {
        ...state,
        error: 'Произошла ошибка при загрузке...',
        loading: false,
      };

    case VIDEO_RELOAD: 
      return {
        ...state,
        error: null,
      }

    default:
      return state;
  }
}

export const getMediaVideos = (videos) => {
  return {
    type: GET_VIDEOS_MEDIA,
    payload: videos,
  };
};

export const getVideo = (id) => {
  return async (dispatch) => {
    try {
      const value = await AsyncStorage.getItem('token');

      dispatch({
        type: GET_VIDEO_START,
      });

      if (value !== null) {
        const response = await api.get(`/v1/videos/${id}`, {
          headers: { Authorization: `Bearer ${value}` },
        });
        dispatch({
          type: GET_VIDEO_SUCCESS,
          payload: response.data.message,
        });
      }
    } catch (e) {
      dispatch({
        type: GET_VIDEO_ERROR,
      })
      console.log(e.response);
    }
  };
};

export const changeErrorVideo = () => {
  return {
    type: VIDEO_RELOAD,
  };
};
