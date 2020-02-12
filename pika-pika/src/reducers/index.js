import { combineReducers } from 'redux'
import alert from './alerts'
import auth from './auth'
import weather from './weathermodel'
import nexrad from "./nexrad";
import nexradfile from "./nexradfile"
import jobmodel from "./jobmodel"
import result from "./results"
export default combineReducers({
	auth: auth,
	weather: weather,
	nexrad: nexrad,
	nexradfile: nexradfile,
	jobmodel: jobmodel,
	result: result
})