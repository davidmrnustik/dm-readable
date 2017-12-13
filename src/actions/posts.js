import {
  REQUEST_POSTS,
  RECEIVE_POSTS,
  ADD_POST,
  UPDATE_POST,
  INCREASE_POST_COMMENT_COUNT,
  DECREASE_POST_COMMENT_COUNT
} from '../constants';
import * as APIUtil from '../util/api';
import { getIDToken } from '../util/token';

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
      .then(() => {
        dispatch(updatePost(updatedPost))
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
      .then(() => {
        dispatch(addPost(updatedPost));
      })
  }
}

export function updatePostCommentCount(post, length, type) {
  let updatedPost;

  switch(type) {
    case INCREASE_POST_COMMENT_COUNT:
      updatedPost = Object.assign({}, post, {
        commentCount: length + 1
      });
      break;

    case DECREASE_POST_COMMENT_COUNT:
      updatedPost = Object.assign({}, post, {
        commentCount: length - 1
      });
      break;

    default:
      updatedPost = post;
  }

  return function(dispatch) {
    return APIUtil
      .handleData('PUT', `posts/${updatedPost.id}`, JSON.stringify(updatedPost))
      .then(() => {
        dispatch(updatePost(updatedPost))
      })
  }
}

export function removePost(post) {
  const updatedPost = Object.assign({}, post, {
    deleted: true
  });

  return function(dispatch) {
    return APIUtil
      .handleData('DELETE', `posts/${updatedPost.id}`, JSON.stringify(updatedPost))
      .then(() => {
        dispatch(updatePost(updatedPost))
      })
  }
}