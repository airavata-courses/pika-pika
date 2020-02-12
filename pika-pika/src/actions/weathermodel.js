import axios from 'axios'
import { WEATHER_DATA_SUCCESS,WEATHER_DATA_FAIL
        ,RADAR_DATA_SUCCESS,RADAR_DATA_FAIL,
        RADARFILE_DATA_SUCCESS,RADARFILE_DATA_FAIL
        ,LAUNCH_SUCCESS,LAUNCH_FAIL 
        } from './types'

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

export const getRadar = ({date}) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	}
	const body = JSON.stringify({ date })
	try {
		const res = await axios.post('http://localhost:4000/api/weather/getRadar', body, config);
		console.log(res)
		dispatch({ type: RADAR_DATA_SUCCESS, payload: res.data })
	} catch (err) {

		dispatch({ type: RADAR_DATA_FAIL })
	}
}

export const getFiles = ({date,radar}) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	}
	const body = JSON.stringify({ date,radar })
	try {
		const res = await axios.post('http://localhost:4000/api/weather/getFiles', body, config);
		console.log(res)
		dispatch({ type: RADARFILE_DATA_SUCCESS, payload: res.data })
	} catch (err) {

		dispatch({ type: RADARFILE_DATA_FAIL })
	}
}

export const launchJob = ({key,bucket}) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	}
	const body = JSON.stringify({ key,bucket })
	try {
		const res = await axios.post('http://localhost:4000/api/model/executeModal', body, config);
		console.log(res)
		dispatch({ type: LAUNCH_SUCCESS, payload: res.data })
	} catch (err) {

		dispatch({ type: LAUNCH_FAIL })
	}
}