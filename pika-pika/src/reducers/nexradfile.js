import { RADARFILE_DATA_SUCCESS,RADARFILE_DATA_FAIL } from '../actions/types'

const initialState = []

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case RADARFILE_DATA_SUCCESS: 
			return [
				...state,
				...payload
            ]
		case RADARFILE_DATA_FAIL: 
			return [
                ...state			
            ]
		default:
			return state;

	}
}