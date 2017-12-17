import * as actionTypes from '../constants';

export function beginAjaxCall() {
	return { type: actionTypes.BEGIN_AJAX_CALL };
}