import { api } from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GET_VIDEOS_START = 'get/videos/start';
const GET_VIDEOS_SUCCESS = 'get/videos/success';
const GET_VIDEOS_ERROR = 'get/videos/error';

const VIDEOS_RELOAD = 'videos/reload';

const GET_VIDEOS_MEDIA = 'get/videos/media';

const SET_IS_WATCHED = 'set/is/watched';

const initialState = {
  videos: [],
  error: null,
  videosMedia: [],
  loading: false,
};

export default function videos(state = initialState, action) {
  switch (action.type) {
    case GET_VIDEOS_START:
      return {
        ...state,
        loading: true,
      };

    case GET_VIDEOS_SUCCESS:
      return {
        ...state,
        videos: action.payload,
        loading: false,
      };
      
    case GET_VIDEOS_ERROR:
      return {
        ...state,
        error: 'Произошла ошибка при загрузке...',
        loading: false,
      };

    case GET_VIDEOS_MEDIA:
      return {
        ...state,
        videosMedia: action.payload,
        loading: false,
      };

    case VIDEOS_RELOAD: 
      return {
        ...state,
        error: null,
      }

    case SET_IS_WATCHED:
      return {
        ...state,
        videos: state.videos.map((video) => {
          if (action.payload === video.id) {
            return {
              ...video,
              is_watched: true,
            };
          }

          return video;
        }),
      };

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

export const getVideos = () => {
  return async (dispatch) => {
    try {
      const value = await AsyncStorage.getItem('token');

      dispatch({
        type: GET_VIDEOS_START,
      });

      if (value !== null) {
        const response = await api.get('/v1/videos/', {
          headers: { Authorization: `Bearer ${value}` },
        });
        dispatch({
          type: GET_VIDEOS_SUCCESS,
          payload: response.data.message,
        });
      }
    } catch (e) {
      dispatch({
        type: GET_VIDEOS_ERROR,
      })
      console.log(e.response);
    }
  };
};

export const setIsWatched = (id) => {
  return {
    type: SET_IS_WATCHED,
    payload: id,
  };
};

export const changeErrorVideos = () => {
  return {
    type: VIDEOS_RELOAD,
  };
};