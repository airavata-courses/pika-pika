import axios from 'axios'
import { RESULT_FAIL, RESULT_SUCCESS } from './types'

export const getResults = (jobID) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	}
	const data = {
		key: 'fetch',
		jobID: jobID
	}
	const body = JSON.stringify(data)
	try {
		const res = await axios.post('http://localhost:4000/api/results/getResult', body, config);
		console.log(res)
		dispatch({ type: RESULT_SUCCESS, payload: res.data })
	} catch (err) {

		dispatch({ type: RESULT_FAIL })
	}
}
