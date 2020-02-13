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
		jobID: "29f69330-4be9-11ea-bc00-6b5c8d8055dd"
	}
	const body = JSON.stringify({ data })
	try {
		console.log('test')
		const res = await axios.post('http://localhost:4000/api/results/getResult', body, config);
		console.log(res)
		dispatch({ type: RESULT_SUCCESS, payload: res.data })
	} catch (err) {

		dispatch({ type: RESULT_FAIL })
	}
}
