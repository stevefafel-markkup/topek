import { Message, MessageRoom, MessageMap, UserMap } from "../../models"
import Immutable from "immutable"
import { REHYDRATE } from "redux-persist/constants"
import * as Types from "../types"

const isPersistable = false;
const MessagingState = Immutable.Record({
    messageRoom: new MessageRoom(),
    messages: new MessageMap(),
    members: new UserMap(),
    isLoading: false,
    loadError: null
})

var initialState = new MessagingState();

export default function(state = initialState, action = {}) {

  switch (action.type) {

    case REHYDRATE: {
      if (action.payload["prefs"]) {
        if (isPersistable) {
          state = new MessagingState().mergeDeep(action.payload["prefs"]);
        }
        else state = new MessagingState();
      }
      return state;  
    }

    case Types.MESSAGING_STARTED: {
      const org = action.payload;
      state = state.set("messageRoom", new MessageRoom())
        .set("messages", new MessageMap())
        .set("members", new UserMap())
        .set("isLoading", true)
        .set("loadError", null)
      return state;
    }

    case Types.MESSAGING_ROOM_LOAD_SUCCESS: {
      const messageRoom = action.payload;
      state = state.set("messageRoom", messageRoom)
      return state;
    }

    case Types.MESSAGING_MEMBERS_LOAD_SUCCESS: {
      const members = action.payload;
      state = state.set("members", members)
      return state;
    }

    case Types.MESSAGING_MESSAGE_LOAD_SUCCESS: {
      const messages = action.payload;
      state = state.set("messages", messages)
      return state;
    }

    case Types.MESSAGING_MESSAGE_UPDATE_SUCCESS: {
      const message = action.payload;
      state = state.set("messages", new MessageMap({[message.id]: message}).merge(state.messages))
      return state;
    }

    case Types.MESSAGING_FAILURE: {
      const { error } = action.payload;
      state = state.set("isLoading", false)
        .set("loadError", error)
      return state;
    }

    case Types.MESSAGING_STOPPED: {
      const org = action.payload;
      state = state.set("messageRoom", new MessageRoom())
        .set("messages", new MessageMap())
        .set("members", new UserMap())
        .set("isLoading", false)
        .set("loadError", null)
      return state;
    }

    default:
      return state;
  }
}
