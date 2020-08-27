import { REGISTER_FAIL, REGISTER_SUCCESS, LOGIN_SUCCESS, 
	LOGIN_FAIL, UPDATE_RECORD_SUCCESS, UPDATE_RECORD_FAIL 
	,JOBLIST_FETCH_SUCCESS,JOBLIST_FETCH_FAIL
	} from '../actions/types'

const initialState = {
	token: '',
	isAuthenticated: false,
	loading: true,
	user: null,
	jobId:[]
}

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case REGISTER_SUCCESS:
			return {
				...state,
				...payload,
				isAuthenticated: true,
				loading: false
			}
		case REGISTER_FAIL:
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false
			}
		case LOGIN_SUCCESS:
			return {
				...state,
				...payload,
				isAuthenticated: true,
				loading: false
			}
		case LOGIN_FAIL:
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false
			}
		case UPDATE_RECORD_SUCCESS:
			return {
				...state
			}
		case UPDATE_RECORD_FAIL:
			return {
				...state
			}
		case JOBLIST_FETCH_SUCCESS:
			return {
				...state,
				jobId:payload
			}
		case JOBLIST_FETCH_FAIL:
			return {
				...state
			}
		default:
			return state;

	}
}