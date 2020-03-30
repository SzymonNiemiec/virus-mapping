import { combineReducers } from 'redux'
import authentication from './modules/authentication'
import survey from './modules/survey'
import friends from './modules/friends'

export default combineReducers({
  authentication,
  survey,
  friends
});