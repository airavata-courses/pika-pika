import { LAUNCH_SUCCESS, LAUNCH_FAIL } from '../actions/types'

const initialState = { jobID: null }

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case LAUNCH_SUCCESS:
			return {
				...payload,
				jobID: payload.jobID
			}

		case LAUNCH_FAIL:
			return {
				...state
			}
		default:
			return state;

	}
}