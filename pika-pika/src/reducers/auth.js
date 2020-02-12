import { REGISTER_FAIL, REGISTER_SUCCESS, LOGIN_SUCCESS, LOGIN_FAIL } from '../actions/types'

const initialState = {
	token: '',
	isAuthenticated: false,
	loading: true,
	user: null
}

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case REGISTER_SUCCESS: 
			return {
				...state,
				token:payload,
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
				token:payload,
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
		default:
			return state;

	}
}