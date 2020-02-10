import axios from 'axios'
import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL } from './types'

export const register = ({ email, password }) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	}
	const body = JSON.stringify({ email, password })
	try {
		console.log('test')
		const res = await axios.post('http://localhost:4000/api/user/register', body, config);
		console.log(res)
		dispatch({ type: REGISTER_SUCCESS, payload: res.data })
	} catch (err) {

		dispatch({ type: REGISTER_FAIL })
	}
}

export const login = ({ email, password }) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	}
	const body = JSON.stringify({ email, password })
	try {
		console.log('test')
		const res = await axios.post('http://localhost:4000/api/user/signin', body, config);
		console.log(res)
		dispatch({ type: LOGIN_SUCCESS, payload: res.data })
	} catch (err) {

		dispatch({ type: LOGIN_FAIL })
	}
}