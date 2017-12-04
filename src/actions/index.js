import {
  API_URL,
  API_HEADERS,
  REQUEST_CATEGORIES,
  RECEIVE_CATEGORIES,
  REQUEST_POSTS,
  RECEIVE_POSTS,
  ADD_POST,
  UPDATE_POST
} from '../constants';
import * as APIUtil from '../util/api';
import { getIDToken } from '../util/token';
import fetch from 'isomorphic-fetch';

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

export function modifyPost(post) {
  const updatedPost = Object.assign({}, post, {
    timestamp: +new Date()
  });
  
  return function(dispatch) {
    return APIUtil
      .handleData('PUT', `posts/${updatedPost.id}`, JSON.stringify(updatedPost))
      .then(
        response => response.json(),
        error => console.log('An error occured', error)
      )
      .then(() => {
        dispatch(updatePost(updatedPost));
      })
  }
}

export function savePost(post) {
  const updatedPost = Object.assign({}, post, {
    id: getIDToken(),
    timestamp: +new Date()
  });

  return function(dispatch) {
    return APIUtil
      .handleData('POST', 'posts', JSON.stringify(updatedPost))
      .then(
        response => response.json(),
        error => console.log('An error occured', error)
      )
      .then(() => {
        dispatch(addPost(updatedPost));
      })
  }
}