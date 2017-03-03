import * as Types from "../types"
import Validate from "../../lib/validate"
import authService from "../../services/authService"
import * as Utils from "../../lib/utils"

export function login(username, password) {
  return async dispatch => {

    // temporarily here until we implement signup screen
    // await authService.signup("joe@here.com", "joe@here.com", "123456", "Joe W", "joe");

    dispatch({type: Types.LOGIN_REQUEST});
    
    try {
      Validate.notEmpty(username, "Email is required");
      Validate.isEmail(username, "Email is not valid");
      Validate.notEmpty(password, "Password is required");

      var results = await authService.login(username, password);
      if (results.error) throw results.error;

      dispatch({type: Types.LOGIN_SUCCESS, payload: results});
    }
    catch (e) {
      dispatch({type: Types.LOGIN_FAILURE, payload: {
        error: Utils.msgFromError(e)
      }});
    }
  }
}

export function logout() {
  return {type: Types.LOGOUT_SUCCESS}
}