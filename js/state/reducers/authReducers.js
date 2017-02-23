import { Record } from "immutable"
import { REHYDRATE } from "redux-persist/constants"
import * as Types from "../types"

const AuthRecord = Record({
    user: new Record({
        email: "",
        token: null
    })(),
    isAuthenticated: false,
    isAuthenticating: false,
    lastUsername: "",
    error: ""
})

var initialState = new AuthRecord();

export default function(state = initialState, action = {}) {

  switch (action.type) {

    case REHYDRATE: {
      if (action.payload["auth"]) {
        state = new AuthRecord().mergeDeep(action.payload["auth"])
          .setIn(["isAuthenticating"], false)
          .setIn(["error"], null);
      }
      return state;  
    }

    case Types.LOGIN_REQUEST: {
      let nextState = state.setIn(["isAuthenticating"], true)
        .setIn(["error"], null);
      return nextState;
    }

    case Types.LOGIN_SUCCESS: {
      const {username} = action.payload;
      let nextState = state.setIn(["isAuthenticated"], true)
        .setIn(["lastUsername"], username)
        .setIn(["isAuthenticating"], false)
        .setIn(["error"], null);
      return nextState;
    }

    case Types.LOGIN_FAILURE: {
      const {error} = action.payload;
      let nextState = state.setIn(["isAuthenticated"], false)
        .setIn(["isAuthenticating"], false)
        .setIn(["error"], error);
      return nextState;
    }

    case Types.LOGOUT_SUCCESS: {
      let nextState = state.setIn(["isAuthenticated"], false)
        .setIn(["error"], null);
      return nextState;
    }

    default:
      return state;
  }
}
