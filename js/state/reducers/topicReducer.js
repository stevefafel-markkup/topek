import { Topic, TopicMap } from "../../models"
import Immutable from "immutable"
import { REHYDRATE } from "redux-persist/constants"
import * as Types from "../types"

const isPersistable = false;
const TopicState = Immutable.Record({
  list: new TopicMap(),
  isRefreshing: false,
  isUpdating: false,
  loadError: null,
  updateError: null
})

let initialState = new TopicState();

export default function(state = initialState, action = {}) {

  switch (action.type) {

    case REHYDRATE: {
      if (action.payload["topics"]) {
        if (isPersistable) {
          state = {...state, 
            list: TopicMap(action.payload["topics"].list), 
            isRefreshing: false, 
            isUpdating: false, 
            loadError: null,
            updateError: null
          }
        }
        else state = new TopicState();
      }
      return state;  
    }

    case "Navigation/BACK":
    case "Navigation/NAVIGATE": {
      state = state.set("loadError", null).set("updateError", null);
      return state;
    }

    case Types.TOPICS_REQUEST: {
      state = state.set("isRefreshing", true)
        .set("loadError", null);
      return state;
    }

    case Types.TOPICS_SUCCESS: {
      const topics = action.payload;
      state = state.set("list", state.list.merge(TopicMap.fromParse(action.payload)))
        .set("isRefreshing", false)
        .set("loadError", null);
      return state;
    }

    case Types.TOPICS_FAILURE: {
      const {error} = action.payload;
      state = state.set("isRefreshing", false)
        .set("loadError", error);
      return state;
    }

    case Types.TOPIC_ADD_REQUEST: {
      state = state.set("isUpdating", true)
        .set("updateError", null);
      return state;
    }

    case Types.TOPIC_ADD_SUCCESS: {
      const topic = action.payload;
      state = state.set("list", state.list.merge(TopicMap.fromParse([action.payload])))
        .set("isUpdating", false)
        .set("updateError", null);
      return state;
    }

    case Types.TOPIC_ADD_FAILURE: {
      const {error} = action.payload;
      state = state.set("isUpdating", false)
        .set("updateError", error);
      return state;
    }

    default:
      return state;
  }
}
