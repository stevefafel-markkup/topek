import { User, UserMap, Org, OrgMap } from "../../models"
import Immutable from "immutable"
import { REHYDRATE } from "redux-persist/constants"
import * as Types from "../types"

const isPersistable = true;
const OrgState = Immutable.Record({
    list: new OrgMap(),
    isLoading: false,
    loadError: null
})

var initialState = new OrgState();

export default function(state = initialState, action = {}) {

  switch (action.type) {

    case REHYDRATE: {
      if (action.payload["orgs"]) {
        if (isPersistable) {
          state = new OrgState().mergeDeep(action.payload["orgs"]);
        }
        else state = new OrgState();
      }
      return state;  
    }

    case Types.ORGS_LOAD_REQUEST: {
      state = state.set("isLoading", true)
        .set("loadError", null);
      return state;
    }

    case Types.ORGS_LOAD_SUCCESS: {
      const orgs = action.payload;
      state = state.set("list", orgs)
        .set("isLoading", false)
        .set("loadError", null)
      return state;
    }

    case Types.ORGS_LOAD_FAILURE: {
      const {error} = action.payload;
      state = state.set("isLoading", false)
        .set("loadError", error)
      return state;
    }

    default:
      return state;
  }
}
