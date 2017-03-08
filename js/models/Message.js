import Immutable from "immutable"
import User from "./User"
import MessageRoom from "./MessageRoom"

const MessageRecord = Immutable.Record({
  id: null,
  createdAt: null,
  updatedAt: null,
  text: "",
  owner: new User(),
  room: new MessageRoom()
})

export default class Message extends MessageRecord {
  static fromParse(msg) {
    let res = new Message()
      .set("id", msg.id)
      .set("createdAt", msg.createdAt)
      .set("updatedAt", msg.updatedAt)
      .set("text", msg.get("text"))
    if (msg.get("owner")) {
      res = res.set("owner", User.fromParse(msg.get("owner")))
    }
    if (msg.get("room")) {
      res = res.set("room", MessageRoom.fromParse(msg.get("room")))
    }
    return res;
  }
}