import axios from 'axios'
import { WEATHER_DATA_SUCCESS,WEATHER_DATA_FAIL } from './types'

export const getweather = ({ lat, lon }) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	}
	const body = JSON.stringify({ lat, lon })
	try {
		const res = await axios.post('http://localhost:4000/api/weather/getWeather', body, config);
		console.log(res)
		dispatch({ type: WEATHER_DATA_SUCCESS, payload: res.data })
	} catch (err) {

		dispatch({ type: WEATHER_DATA_FAIL })
	}
}