import { API_URL, API_HEADERS } from '../constants';
import fetch from 'isomorphic-fetch';

export const fetchData = url => fetch(
  `${API_URL}/${url}`,
  API_HEADERS
);