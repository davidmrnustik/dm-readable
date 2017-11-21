import { API_URL, API_HEADERS } from '../constants';

export const fetchCategories = url => fetch(
  `${API_URL}/${url}`,
  API_HEADERS
);