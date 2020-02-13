import { RESULT_SUCCESS, RESULT_FAIL } from '../actions/types'

const initialState = []

export default function (state = initialState, action) {

	const { type, payload } = action;
	switch (type) {
		case RESULT_SUCCESS:
			return [
				...state,
				...payload
			]
		case RESULT_FAIL:
			return [
				...state
			]
		default:
			return state;

	}
}