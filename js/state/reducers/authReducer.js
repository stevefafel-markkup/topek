import Immutable from "immutable"
import { REHYDRATE } from "redux-persist/constants"
import * as Types from "../types"

const isPersistable = true;
const AuthState = Immutable.Record({
    isAuthenticated: false,
    isAuthenticating: false,
    lastUsername: "",
    error: ""
})

var initialState = new AuthState();

export default function(state = initialState, action = {}) {

  switch (action.type) {

    case REHYDRATE: {
      if (action.payload["auth"]) {
        if (isPersistable) {
          state = new AuthState().mergeDeep(action.payload["auth"])
            .set("isAuthenticating", false)
            .set("error", null);
        }
        else state = new AuthState();
      }
      return state;  
    }

    case Types.LOGIN_REQUEST: {
      state = state.set("isAuthenticating", true)
        .set("error", null);
      return state;
    }

    case Types.LOGIN_SUCCESS: {
      const user = action.payload;
      state = state.set("isAuthenticated", true)
        .set("lastUsername", user.username)
        .set("isAuthenticating", false)
        .set("error", null);
      return state;
    }

    case Types.LOGIN_FAILURE: {
      const {error} = action.payload;
      state = state.set("isAuthenticated", false)
        .set("isAuthenticating", false)
        .set("error", error);
      return state;
    }

    case Types.LOGOUT_SUCCESS: {
      state = state.setIn(["isAuthenticated"], false)
        .set("error", null);
      return state;
    }

    default:
      return state;
  }
}
