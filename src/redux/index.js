import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import user from './ducks/user';
import auth from './ducks/auth';
import video from './ducks/video';
import videos from './ducks/videos';

const rootReducer = combineReducers({
  user,
  auth,
  video,
  videos,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
