import Immutable from "immutable"
import Topic from "./Topic"

const TopicMap = Immutable.OrderedMap

TopicMap.fromParse = (topics) => {
  return Immutable.OrderedMap(topics.map(t => [t.id, Topic.fromParse(t)]));
}

export default TopicMap;