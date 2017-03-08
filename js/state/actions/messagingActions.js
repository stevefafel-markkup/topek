import * as Types from "../types"
import messagingService from "../../services/messagingService"
import { Error } from "../../models"

// create a hash of the 2 user ids. concat them in alpha order
function createOneToOneKey(userId1, userId2) {
  if (userId1[0] < userId2[0])
    return userId1 + "+" + userId2;
  return userId2 + "+" + userId1;
}

// this is a private chat between the current use and one
// other user
export function startOneToOneMessaging(recipientUserId) {
  return async (dispatch, getState) => {
    dispatch({type: Types.MESSAGING_STARTED});

    const state = getState();
    const currentUser = state.profile.user;
    const messagingKey = createOneToOneKey(currentUser.id, recipientUserId);
    const recipientUser = state.members.list.get(recipientUserId);

    try {

      // load room first
      let room = await messagingService.loadRoomByKey(messagingKey);
      dispatch({type: Types.MESSAGING_ROOM_LOAD_SUCCESS, payload: room});

      // load members
      const members = [currentUser, recipientUser]
      dispatch({type: Types.MESSAGING_MEMBERS_LOAD_SUCCESS, payload: members});

      // load messages
      const messages = await messagingService.loadMessages(room.id);
      dispatch({type: Types.MESSAGING_MESSAGE_LOAD_SUCCESS, payload: messages});

      // listen for messages
      messagingService.startListeningforMessages(room.id, msg => {
        console.log("msg.owner.id", msg.owner.id)
        console.log("currentUser.id", currentUser.id)
        console.log("msg.room.id", msg.room.id)
        console.log("room.id", room.id)
        if (/*msg.owner.id != currentUser.id && */msg.room.id == room.id)
          dispatch({type: Types.MESSAGING_MESSAGE_UPDATE_SUCCESS, payload: msg});
      })

    }
    catch (e) {
      dispatch({type: Types.MESSAGING_FAILURE, payload: Error.fromException(e)});
    }
  }
}

export function startSelectedTopicMessaging() {
  return async (dispatch, getState) => {
  }
}

export function sendMessage(text) {
  return async (dispatch, getState) => {

    const state = getState();
    const currentUser = state.profile.user;
    const currentMessageRoom = state.messaging.messageRoom;

    try {

      // send message
      const data = await messagingService.sendMessage(currentMessageRoom.id, currentUser.id, text);

    }
    catch (e) {
      dispatch({type: Types.MESSAGING_FAILURE, payload: Error.fromException(e)});
    }
  }
}

export function stopMessaging() {
  return async (dispatch, getState) => {
    dispatch({type: Types.MESSAGING_STOPPED});
  }
}