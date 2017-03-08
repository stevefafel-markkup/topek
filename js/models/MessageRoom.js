import Immutable from "immutable"

const MessageRoomRecord = Immutable.Record({
  id: null,
  createdAt: null,
  updatedAt: null,
  key: "",
  topicId: null
})

export default class MessageRoom extends MessageRoomRecord {
  static fromParse(room) {
    let res = new MessageRoom()
      .set("id", room.id)
      .set("createdAt", room.createdAt)
      .set("updatedAt", room.updatedAt)
      .set("key", room.get("key"))
    if (room.get("topic")) {
      res = res.set("topicId", room.get("topic").get("id"))
    }
    return res;
  }
}