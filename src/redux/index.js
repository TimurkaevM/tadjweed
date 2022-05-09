import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import files from './ducks/files';
import user from './ducks/user';
import auth from './ducks/auth';
import video from './ducks/video';
import videos from './ducks/videos';

const logger = createLogger({
  diff: true,
  collapsed: true,
});

const rootReducer = combineReducers({
  user,
  auth,
  video,
  videos,
});

export const store = createStore(rootReducer, applyMiddleware(thunk, logger));
