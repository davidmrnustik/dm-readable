import {
  REQUEST_CATEGORIES,
  RECEIVE_CATEGORIES
} from '../constants';
import * as APIUtil from '../util/api';

function requestCategories () {
  return {
    type: REQUEST_CATEGORIES
  }
}
function receiveCategories (categories) {
  return {
    type: RECEIVE_CATEGORIES,
    categories
  }
}
export const fetchCategories = () => dispatch => (
  dispatch(requestCategories()),
  APIUtil
    .fetchData('categories')
    .then(json => dispatch(receiveCategories(json)))
);