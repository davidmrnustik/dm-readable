import * as actionTypes from '../constants';
import * as APIUtil from '../util/api';
import { beginAjaxCall } from './ajaxStatus';

function receiveCategories (categories) {
  return {
    type: actionTypes.RECEIVE_CATEGORIES_SUCCESS,
    categories
  }
}
export const fetchCategories = () => dispatch => (
  dispatch(beginAjaxCall()),
  APIUtil
    .fetchData('categories')
    .then(data => dispatch(receiveCategories(data)))
);