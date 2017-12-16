import {
  REQUEST_POSTS,
  REQUEST_POST_UPDATE,
  RECEIVE_POSTS,
  ADD_POST,
  UPDATE_POST,
  INCREASE_POST_COMMENT_COUNT,
  DECREASE_POST_COMMENT_COUNT,
  UPVOTE_POST,
  DOWNVOTE_POST
} from '../constants';
import * as APIUtil from '../util/api';
import { getIDToken } from '../util/token';

function requestPosts () {
  return {
    type: REQUEST_POSTS
  }
}
function requestPostUpdate () {
  return {
    type: REQUEST_POST_UPDATE
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
    .then(data => dispatch(receivePosts(data)))
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

export const modifyPost = post => {
  const updatedPost = Object.assign({}, post, {
    timestamp: +new Date()
  });

  return function(dispatch) {
    return APIUtil
      .handleData('PUT', `posts/${updatedPost.id}`, JSON.stringify(updatedPost))
      .then(data => dispatch(updatePost(data)))
  }
}

export const savePost = post => {
  const updatedPost = Object.assign({}, post, {
    id: getIDToken(),
    timestamp: +new Date()
  });

  return function(dispatch) {
    return APIUtil
      .handleData('POST', 'posts', JSON.stringify(updatedPost))
      .then(data => dispatch(addPost(data)))
  }
}

export const updatePostCommentCount = (post, length, type) => {
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
      .then(data => dispatch(updatePost(data)))
  }
}

export const updatePostVote = (post, type) => {
  let vote = {};

  switch(type) {
    case UPVOTE_POST:
      vote.option = 'upVote';
      break;

    case DOWNVOTE_POST:
      vote.option = 'downVote';
      break;

    default:
      vote = 'upVote';
  }

  return function(dispatch) {
    dispatch(requestPostUpdate())
    return APIUtil
      .handleData('POST', `posts/${post.id}`, JSON.stringify(vote))
      .then(data => dispatch(updatePost(data))) 
  }
}

export const removePost = post => {
  const updatedPost = Object.assign({}, post, {
    deleted: true
  });

  return function(dispatch) {
    return APIUtil
      .handleData('DELETE', `posts/${updatedPost.id}`, JSON.stringify(updatedPost))
      .then(data => dispatch(updatePost(data)))
  }
}