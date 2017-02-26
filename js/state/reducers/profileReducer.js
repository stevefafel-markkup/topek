import { User } from "../../models"
import Immutable from "immutable"
import { REHYDRATE } from "redux-persist/constants"
import * as Types from "../types"

const isPersistable = true;
const ProfileState = Immutable.Record({
    user: new User(),
})

var initialState = new ProfileState();

export default function(state = initialState, action = {}) {

  switch (action.type) {

    case REHYDRATE: {
      if (action.payload["auth"]) {
        if (isPersistable) {
          state = new ProfileState().mergeDeep(action.payload["profile"]);
        }
        else state = new ProfileState();
      }
      return state;  
    }

    case Types.LOGIN_SUCCESS: {
      const user = action.payload;
      state = state.set("user", User.fromParse(user));
      return state;
    }

    case Types.LOGOUT_SUCCESS: {
      state = state.set("user", null);
      return state;
    }

    default:
      return state;
  }
}
