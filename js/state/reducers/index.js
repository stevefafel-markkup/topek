import { combineReducers } from "redux"
import nav from "./navReducers"
import auth from "./authReducers"
import topics from "./topicReducers"

export default combineReducers({
  nav,
  auth,
  topics
});
