import * as Types from "../types"
import Api from "../../api"
import Validate from "../../lib/validate"

export function login(username, password) {
  return async dispatch => {

    dispatch({type: Types.LOGIN_REQUEST});
    
    try {
      Validate.notEmpty(username, "Email is required");
      Validate.isEmail(username, "Email is not valid");
      Validate.notEmpty(password, "Password is required");

      var results = await Api.login(username, password);
      dispatch({type: Types.LOGIN_SUCCESS, payload: {
        ...results
      }});
    }
    catch (e) {
      dispatch({type: Types.LOGIN_FAILURE, payload: {
        error: e
      }});
    }
  }
}

export function logout() {
  return {type: Types.LOGOUT_SUCCESS}
}