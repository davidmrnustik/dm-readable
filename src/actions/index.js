import {
  REQUEST_CATEGORIES,
  RECEIVE_CATEGORIES,
  REQUEST_POSTS,
  RECEIVE_POSTS,
  REQUEST_POSTS_BY_CATEGORY,
  RECEIVE_POSTS_BY_CATEGORY
} from '../constants';
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
    .fetchData('categories')
    .then(
      response => response.json(),
      error => console.log('An error occured', error)
    )
    .then(json => dispatch(receiveCategories(json)))
);

function requestPosts (posts) {
  return {
    type: REQUEST_POSTS,
    posts
  }
}
function receivePosts (posts) {
  return {
    type: RECEIVE_POSTS,
    posts
  }
}
export const fetchPosts = posts => dispatch => (
  dispatch(requestPosts(posts)),
  APIUtil
    .fetchData('posts')
    .then(
      response => response.json(),
      error => console.log('An error occured', error)
    )
    .then(json => dispatch(receivePosts(json)))
);

function requestPostsByCategory (category) {
  return {
    type: REQUEST_POSTS_BY_CATEGORY,
    category
  }
}
function receivePostsByCategory (posts) {
  return {
    type: RECEIVE_POSTS_BY_CATEGORY,
    posts
  }
}
export const fetchPostsByCategory = category => dispatch => (
  dispatch(requestPostsByCategory(category)),
  APIUtil
    .fetchData(`${category}/posts`)
    .then(
      response => response.json(),
      error => console.log('An error occured', error)
    )
    .then(json => dispatch(receivePostsByCategory(json)))
);