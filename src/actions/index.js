import { REQUEST_CATEGORIES, RECEIVE_CATEGORIES } from '../constants';
import * as APIUtil from '../util/api';
import fetch from 'isomorphic-fetch';

function requestCategories (categories) {
  return {
    type: REQUEST_CATEGORIES,
    categories
  }
}

function receiveCategories (categories) {
  return {
    type: RECEIVE_CATEGORIES,
    categories
  }
}

export const fetchCategories = categories => dispatch => (
  dispatch(requestCategories(categories)),
  APIUtil
    .fetchCategories('categories')
    .then(
      response => response.json(),
      error => console.log('An error occured', error)
    )
    .then(json => dispatch(receiveCategories(json)))
);