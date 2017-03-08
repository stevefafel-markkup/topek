import { combineReducers } from "redux"
import nav from "./navReducer"
import auth from "./authReducer"
import topics from "./topicReducer"
import profile from "./profileReducer"
import orgs from "./orgReducer"
import members from "./memberReducer"
import prefs from "./prefsReducer"
import messaging from "./messagingReducer"

export default combineReducers({
  nav,
  auth,
  topics,
  profile,
  orgs,
  members,
  prefs,
  messaging
});
