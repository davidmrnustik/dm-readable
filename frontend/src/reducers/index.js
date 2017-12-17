import { combineReducers } from 'redux';
import categories from './categoryReducer';
import posts from './postReducer';
import comments from './commentReducer';
import ajaxCallsInProgress from './ajaxReducer';

export default combineReducers({
  categories,
  posts,
  comments,
  ajaxCallsInProgress
});