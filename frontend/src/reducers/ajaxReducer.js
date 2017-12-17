import * as actionTypes from '../constants';
import initialState from './initialState';

function actionTypeEndsInSuccess(type) {
	return type.substring(type.length - 8) === '_SUCCESS';
}

export default function (state = initialState.ajaxCallsInProgress, action) {
	if (action.type === actionTypes.BEGIN_AJAX_CALL) {
		return state + 1;
	} else if (actionTypeEndsInSuccess(action.type)) {
		return state - 1;
	}
	return state;
}