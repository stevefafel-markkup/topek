import Parse from "parse/react-native"
import { InteractionManager } from "react-native"
import { MessageRoom, MessageMap, User, Message, Error } from "../models"
import * as Utils from "../lib/utils"

class MessagingService {

  constructor() {
    this.listenFuncs = {}
  }

  async loadRoomByKey(key) {

    await InteractionManager.runAfterInteractions();
    
    try {
      let room = null;
      let query = new Parse.Query("MessageRoom")
        .include("topic")
        .equalTo("key", key);

      const data = await query.find();

      // if a room doesn't exist, create it
      if (data.length == 0) {
        const ParseMessageRoom = Parse.Object.extend("MessageRoom"); 
        room = new ParseMessageRoom();
        room.set("key", key);
        room = await room.save();
      }
      else if (data.length > 1) {
        throw `More than one room exists with key '${key}'`;
      }
      else {
        room = data[0]
      }

      return MessageRoom.fromParse(room);
    }
    catch (e) {
      throw Error.fromException(e)
    }
  }

  async sendMessage(roomId, userId, text) {

    await InteractionManager.runAfterInteractions();
    
    try {

      const ParseUser = Parse.Object.extend("User"); 
      let owner = new ParseUser();
      owner.set("id", userId)

      const ParseMessageRoom = Parse.Object.extend("MessageRoom"); 
      let room = new ParseMessageRoom();
      room.set("id", roomId)

      const ParseMessage = Parse.Object.extend("Message"); 
      let msg = new ParseMessage();
      msg.set("room", room);
      msg.set("owner", owner);
      msg.set("text", text);

      const data = await msg.save();
    }
    catch (e) {
      throw Error.fromException(e)
    }
  }

  async loadMessages(roomId) {

    await InteractionManager.runAfterInteractions();
    
    try {

      const ParseMessageRoom = Parse.Object.extend("MessageRoom"); 
      let room = new ParseMessageRoom();
      room.set("id", roomId);

      let query = new Parse.Query("Message")
        .include("owner")
        .descending("createdAt")
        .equalTo("room", room);

      const data = await query.find();
      return MessageMap.fromParse(data);
    }
    catch (e) {
      throw Error.fromException(e)
    }
  }

  startListeningforMessages(roomId, fn) {

    if (this.listenFuncs[roomId]) {
      this.stopListeningforMessages(roomId)
    }

    let query = new Parse.Query("Message").include("owner"); //.equalTo("room", roomId);
    let sub = query.subscribe();

    this.listenFuncs[roomId] = {
      subscription: sub,
      fn: fn
    }
    
    sub.on("create", (msg) => {
      console.log("LiveQuery(Message) dispatched create: ", msg);
      fn(Message.fromParse(msg))
    });
  }

  stopListeningforMessages(roomId) {
    let sub = this.listenFuncs[roomId].subscription;
      sub.unsubscribe();
  }

}

export default new MessagingService()