import { API_URL, API_HEADERS } from '../constants';

export const fetchData = url => fetch(
  `${API_URL}/${url}`,
  API_HEADERS
);