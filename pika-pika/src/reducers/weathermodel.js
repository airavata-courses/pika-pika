import { WEATHER_DATA_FAIL,WEATHER_DATA_SUCCESS } from '../actions/types'

const initialState = {
        "temp": 0,
        "feels_like": 0,
        "temp_min": 0,
        "temp_max": 0,
        "pressure": 0,
        "humidity": 0
}

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case WEATHER_DATA_SUCCESS: 
			return {
				...state,
				...payload
			}
		case WEATHER_DATA_FAIL: 
			return {
                ...state			
            }
		default:
			return state;

	}
}