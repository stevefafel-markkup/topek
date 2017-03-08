import Immutable from "immutable"
import Message from "./Message"

export default class MessageMap extends Immutable.OrderedMap {
  static fromParse(messages) {
    return Immutable.OrderedMap(messages.map(t => [t.id, Message.fromParse(t)]));
  }
}