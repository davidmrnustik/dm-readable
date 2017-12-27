import * as actionTypes from '../constants';

/**
 * Idea of ajax calls:
 * Cory House - Building Applications with React and Redux in ES6, Pluralsight online course
 * https://app.pluralsight.com/library/courses/react-redux-react-router-es6
 */
export function beginAjaxCall() {
	return { type: actionTypes.BEGIN_AJAX_CALL };
}

export function ajaxCallError() {
  return { type: actionTypes.AJAX_CALL_ERROR };
}