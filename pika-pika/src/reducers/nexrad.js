import { RADAR_DATA_SUCCESS,RADAR_DATA_FAIL } from '../actions/types'

const initialState = []

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case RADAR_DATA_SUCCESS: 
			return [
				...state,
				...payload
            ]
		case RADAR_DATA_FAIL: 
			return [
                ...state			
            ]
		default:
			return state;

	}
}