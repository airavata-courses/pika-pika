import { LAUNCH_SUCCESS,LAUNCH_FAIL } from '../actions/types'

const initialState = {}

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case LAUNCH_SUCCESS: 
			return {
				...payload
            }
		case LAUNCH_FAIL: 
			return {
                ...state			
            }
		default:
			return state;

	}
}