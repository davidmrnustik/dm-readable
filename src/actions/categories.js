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
    .then(
      response => response.json(),
      error => console.log('An error occured', error)
    )
    .then(json => dispatch(receiveCategories(json)))
);