import * as actionTypes from '../constants';
import initialState from './initialState';

export default function categories(state = initialState.categories, action){
  const { categories } = action;

  switch(action.type) {
    case actionTypes.RECEIVE_CATEGORIES_SUCCESS:
      return categories['categories'];

    default:
      return state;
  }
}