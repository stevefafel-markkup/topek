import { Topic, TopicMap } from "../../models"
import Immutable from "immutable"
import { REHYDRATE } from "redux-persist/constants"
import * as Types from "../types"

const isPersistable = false;
const TopicState = Immutable.Record({
  list: new TopicMap(),
  isRefreshing: false,
  loadError: null
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
            loadError: null
          }
        }
        else state = new TopicState();
      }
      return state;  
    }

    case Types.TOPIC_REQUEST: {
      state = state.setIn(["isRefreshing"], true)
        .setIn(["loadError"], null);
      return state;
    }

    case Types.TOPIC_SUCCESS: {
      const {topics} = action.payload;
      state = state.setIn(["list"], state.list.merge(TopicMap.fromParse(action.payload)))
        .setIn(["isRefreshing"], false)
        .setIn(["loadError"], null);

      return state;
    }

    case Types.TOPIC_FAILURE: {
      const {error} = action.payload;
      state = state.setIn(["isRefreshing"], false)
        .setIn(["loadError"], error);
      return state;
    }

    default:
      return state;
  }
}
