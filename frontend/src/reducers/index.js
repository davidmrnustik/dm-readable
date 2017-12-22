import { combineReducers } from 'redux';
import categories from './categoryReducer';
import { posts, post } from './postReducer';
import { comments, comment } from './commentReducer';
import ajaxCallsInProgress from './ajaxReducer';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  categories,
  post,
  posts,
  comments,
  comment,
  ajaxCallsInProgress,
  form: formReducer
});