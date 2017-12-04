import { API_URL, API_HEADERS } from '../constants';
import fetch from 'isomorphic-fetch';

export const fetchData = url => fetch(
  `${API_URL}/${url}`,
  {
    headers: API_HEADERS
  }
);

export const handleData = (method, url, body) => fetch(
  `${API_URL}/${url}`,
  {
    method,
    headers: API_HEADERS,
    body
  }
);