import {
  API_URL,
  API_POST_HEADERS,
  REQUEST_CATEGORIES,
  RECEIVE_CATEGORIES,
  REQUEST_POSTS,
  RECEIVE_POSTS,
  ADD_POST,
  UPDATE_POST
} from '../constants';
import * as APIUtil from '../util/api';
import rp from 'request-promise';

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

function requestPosts () {
  return {
    type: REQUEST_POSTS
  }
}
function receivePosts (posts) {
  return {
    type: RECEIVE_POSTS,
    posts
  }
}
export const fetchPosts = () => dispatch => (
  dispatch(requestPosts()),
  APIUtil
    .fetchData('posts')
    .then(
      response => response.json(),
      error => console.log('An error occured', error)
    )
    .then(json => dispatch(receivePosts(json)))
);

const addPost = post => {
  return {
    type: ADD_POST,
    post
  }
};

const updatePost = post => {
  return {
    type: UPDATE_POST,
    post
  }
};

export function savePost(post) {
  const options = {
    method: 'POST',
    uri: `${API_URL}/posts`,
    body: post,
    json: true,
    headers: API_POST_HEADERS
  }
  return function(dispatch, getState) {
    return rp(options)
      .then(body => {
        dispatch(addPost(body))
      })
      .catch(error => {
        throw new Error(error);
      });
  }
}