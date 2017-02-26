import { combineReducers } from "redux"
import nav from "./navReducer"
import auth from "./authReducer"
import topics from "./topicReducer"
import profile from "./profileReducer"

export default combineReducers({
  nav,
  auth,
  topics,
  profile
});
