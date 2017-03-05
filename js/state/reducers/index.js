import { combineReducers } from "redux"
import nav from "./navReducer"
import auth from "./authReducer"
import topics from "./topicReducer"
import profile from "./profileReducer"
import orgs from "./orgReducer"
import members from "./memberReducer"

export default combineReducers({
  nav,
  auth,
  topics,
  profile,
  orgs,
  members
});
