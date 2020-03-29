import { combineReducers } from 'redux'
import authentication from './modules/authentication'
import survey from './modules/survey'

export default combineReducers({
  authentication,
  survey,
});