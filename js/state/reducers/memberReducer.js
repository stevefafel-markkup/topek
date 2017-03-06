import { User, UserMap, Org } from "../../models"
import Immutable from "immutable"
import { REHYDRATE } from "redux-persist/constants"
import * as Types from "../types"

const isPersistable = true;
const MemberState = Immutable.Record({
    list: new UserMap()
})

var initialState = new MemberState();

export default function(state = initialState, action = {}) {

  switch (action.type) {

    case REHYDRATE: {
      if (action.payload["members"]) {
        if (isPersistable) {
          state = new MemberState().mergeDeep(action.payload["members"]);
        }
        else state = new MemberState();
      }
      return state;  
    }

    case Types.MEMBERS_LOAD_REQUEST: {
      state = state.set("list", new UserMap())
      return state;
    }

    case Types.MEMBERS_LOAD_SUCCESS: {
      const members = action.payload;
      state = state.set("list", members)
      return state;
    }

    default:
      return state;
  }
}
