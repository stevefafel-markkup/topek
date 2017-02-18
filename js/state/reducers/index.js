import { combineReducers } from "redux"
import nav from "./navReducers"
import auth from "./authReducers"

export default combineReducers({
  nav,
  auth
});
