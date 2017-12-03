import { API_URL, API_GET_HEADERS } from '../constants';
import fetch from 'isomorphic-fetch';

export const fetchData = url => fetch(
  `${API_URL}/${url}`,
  API_GET_HEADERS
);