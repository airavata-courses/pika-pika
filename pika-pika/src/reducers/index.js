import { combineReducers } from 'redux'
import alert from './alerts'
import auth from './auth'
import weather from './weathermodel'
export default combineReducers({ auth: auth, weather:weather })