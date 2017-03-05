import Immutable from "immutable"
import Topic from "./Topic"

export default class TopicMap extends Immutable.OrderedMap {
  static fromParse(topics) {
    return Immutable.OrderedMap(topics.map(t => [t.id, Topic.fromParse(t)]));
  }
}