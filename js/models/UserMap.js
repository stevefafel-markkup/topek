import Immutable from "immutable"
import User from "./User"

export default class UserMap extends Immutable.OrderedMap {
  static fromParse(users) {
    return Immutable.OrderedMap(users.map(t => [t.id, User.fromParse(t)]));
  }
}