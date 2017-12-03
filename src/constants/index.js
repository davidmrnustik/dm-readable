const API_AUTHORIZATION = 'readable-project-davidmrnustik';

export const API_URL = 'http://localhost:3001';
export const API_GET_HEADERS = {
  headers: { 'Authorization': API_AUTHORIZATION }
};
export const API_POST_HEADERS = {
  'Authorization': API_AUTHORIZATION
};

export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES';
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';

export const ADD_POST = 'ADD_POST';
export const UPDATE_POST = 'UPDATE_POST';